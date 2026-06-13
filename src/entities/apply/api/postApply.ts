export interface ApplyFormData {
  field: string;
  teamName: string;
  school: string;
  representative: string;
  contact: string;
  applicationFile: File;
  privacyFile: File;
  videoFile: File;
}

interface ApplyUploadInitiateResponse {
  key: string;
  uploadId: string;
}

interface ApplyPartUrl {
  partNumber: number;
  url: string;
}

interface ApplyPartUrlsResponse {
  urls: ApplyPartUrl[];
}

interface ApplyPartInput {
  partNumber: number;
  etag: string;
}

// AWS S3 멀티파트 업로드 최소 단위 5MB — 10MB로 여유 확보
const PART_SIZE = 10 * 1024 * 1024;

const splitIntoParts = (file: File): Blob[] => {
  const parts: Blob[] = [];
  let offset = 0;
  while (offset < file.size) {
    parts.push(file.slice(offset, offset + PART_SIZE));
    offset += PART_SIZE;
  }
  return parts;
};

const abortUpload = (apiUrl: string, key: string, uploadId: string): void => {
  // fire-and-forget: 실패해도 사용자 경험에 영향 없음 (S3 수명주기 정책이 정리)
  fetch(`${apiUrl}/apply/upload/abort`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, uploadId }),
  }).catch(() => {});
};

export const postApply = async (
  data: ApplyFormData,
  onProgress?: (percent: number) => void
): Promise<void> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 1단계: multipart upload 세션 시작
  const initiateRes = await fetch(`${apiUrl}/apply/upload/initiate`, { method: "POST" });
  if (!initiateRes.ok) {
    throw new Error("업로드 URL 발급에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
  const { key, uploadId } = (await initiateRes.json()) as ApplyUploadInitiateResponse;

  const parts = splitIntoParts(data.videoFile);
  const partCount = parts.length;
  const completedParts: ApplyPartInput[] = [];

  try {
    // 2단계: 파트별 presigned URL 발급
    const partUrlsRes = await fetch(`${apiUrl}/apply/upload/part-urls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, uploadId, partCount }),
    });
    if (!partUrlsRes.ok) {
      throw new Error("업로드 URL 발급에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
    const { urls } = (await partUrlsRes.json()) as ApplyPartUrlsResponse;

    // 3단계: 파트 순차 업로드 + ETag 수집
    // S3 CORS 설정에서 ETag 헤더 노출 필요 (백엔드 인프라 확인 사항)
    for (const { partNumber, url } of urls) {
      const partBlob = parts[partNumber - 1];
      const res = await fetch(url, { method: "PUT", body: partBlob });

      if (!res.ok) {
        throw new Error("영상 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }

      const etag = res.headers.get("ETag");
      if (!etag) {
        throw new Error("영상 업로드 응답이 올바르지 않습니다.");
      }

      completedParts.push({ partNumber, etag });
      onProgress?.(Math.round((completedParts.length / partCount) * 90));
    }

    // 4단계: 업로드 완료 + 신청 저장
    const videoFileName = `${data.field}_${data.teamName}_${data.school}_${data.representative}_${data.contact}.mp4`;
    const applyRes = await fetch(`${apiUrl}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, uploadId, filename: videoFileName, parts: completedParts }),
    });
    if (!applyRes.ok) {
      const err = (await applyRes.json().catch(() => ({}))) as { message?: string };
      throw new Error(err.message ?? "영상 등록에 실패했습니다.");
    }
    const { applyId } = (await applyRes.json()) as { applyId: number };

    onProgress?.(100);

    // 5단계: 이메일 전송 (SMTP는 서버에서만 가능하므로 Next.js API Route 경유)
    const formData = new FormData();
    formData.append("applyId", String(applyId));
    formData.append("field", data.field);
    formData.append("teamName", data.teamName);
    formData.append("school", data.school);
    formData.append("representative", data.representative);
    formData.append("contact", data.contact);
    formData.append("applicationFile", data.applicationFile);
    formData.append("privacyFile", data.privacyFile);

    const emailRes = await fetch("/api/apply", { method: "POST", body: formData });
    if (!emailRes.ok) {
      const err = (await emailRes.json().catch(() => ({}))) as { message?: string };
      throw new Error(err.message ?? "전송 중 오류가 발생했습니다.");
    }
  } catch (error) {
    abortUpload(apiUrl!, key, uploadId);
    throw error;
  }
};
