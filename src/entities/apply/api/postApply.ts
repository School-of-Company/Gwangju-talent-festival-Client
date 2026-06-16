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

const PART_SIZE = 5 * 1024 * 1024; // 5MB

const uploadPart = (
  chunk: Blob,
  uploadUrl: string,
  onProgress?: (loaded: number) => void
): Promise<string> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) onProgress(e.loaded);
      });
    }

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const etag = xhr.getResponseHeader("ETag") ?? xhr.getResponseHeader("etag") ?? "";
        resolve(etag);
      } else {
        reject(new Error("영상 업로드에 실패했습니다. 잠시 후 다시 시도해주세요."));
      }
    });

    xhr.addEventListener("error", () =>
      reject(new Error("영상 업로드 중 오류가 발생했습니다."))
    );

    xhr.open("PUT", uploadUrl);
    xhr.send(chunk);
  });

export const postApply = async (
  data: ApplyFormData,
  onProgress?: (percent: number) => void
): Promise<void> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 1단계: 멀티파트 업로드 시작
  const initiateRes = await fetch(`${apiUrl}/apply/upload/initiate`, { method: "POST" });
  if (!initiateRes.ok) {
    throw new Error("업로드 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
  const { key, uploadId } = (await initiateRes.json()) as { key: string; uploadId: string };

  const partCount = Math.max(1, Math.ceil(data.videoFile.size / PART_SIZE));

  // 2단계: 파트별 presigned URL 발급
  const partUrlsRes = await fetch(`${apiUrl}/apply/upload/part-urls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, uploadId, partCount }),
  });
  if (!partUrlsRes.ok) {
    throw new Error("업로드 URL 발급에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
  const { parts: presignedParts } = (await partUrlsRes.json()) as {
    parts: { partNumber: number; url: string }[];
  };

  // 3단계: 파트별 순차 업로드 (진행률 추적)
  const parts: { partNumber: number; etag: string }[] = [];
  let uploadedBytes = 0;

  try {
    for (const { partNumber, url } of presignedParts) {
      const start = (partNumber - 1) * PART_SIZE;
      const end = Math.min(start + PART_SIZE, data.videoFile.size);
      const chunk = data.videoFile.slice(start, end);

      const etag = await uploadPart(chunk, url, (loaded) => {
        if (onProgress) {
          onProgress(Math.round(((uploadedBytes + loaded) / data.videoFile.size) * 100));
        }
      });

      uploadedBytes += end - start;
      parts.push({ partNumber, etag });
    }
  } catch (err) {
    await fetch(`${apiUrl}/apply/upload/abort`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, uploadId }),
    }).catch(() => {});
    throw err;
  }

  // 4단계: 업로드 완료 및 신청 확정
  const videoFileName = `${data.field}_${data.teamName}_${data.school}_${data.representative}_${data.contact}.mp4`;
  const applyRes = await fetch(`${apiUrl}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, uploadId, filename: videoFileName, parts }),
  });
  if (!applyRes.ok) {
    const err = (await applyRes.json().catch(() => ({}))) as { message?: string };
    throw new Error(err.message ?? "영상 등록에 실패했습니다.");
  }
  const { applyId } = (await applyRes.json()) as { applyId: number };

  // 5단계: 이메일 전송 (Next.js API Route 경유)
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
};
