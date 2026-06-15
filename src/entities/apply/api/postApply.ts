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

const uploadVideoWithProgress = (
  uploadUrl: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<void> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
    }

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error("영상 업로드에 실패했습니다. 잠시 후 다시 시도해주세요."));
      }
    });

    xhr.addEventListener("error", () =>
      reject(new Error("영상 업로드 중 오류가 발생했습니다."))
    );

    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type || "video/mp4");
    xhr.send(file);
  });

export const postApply = async (
  data: ApplyFormData,
  onProgress?: (percent: number) => void
): Promise<void> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 1단계: presigned upload URL 발급
  const uploadUrlRes = await fetch(`${apiUrl}/apply/upload-url`, { method: "POST" });
  if (!uploadUrlRes.ok) {
    throw new Error("업로드 URL 발급에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
  const { key, uploadUrl } = (await uploadUrlRes.json()) as { key: string; uploadUrl: string };

  // 2단계: R2 직접 업로드 (presigned PUT)
  await uploadVideoWithProgress(uploadUrl, data.videoFile, onProgress);

  // 3단계: 백엔드에 업로드 확정
  const videoFileName = `${data.field}_${data.teamName}_${data.school}_${data.representative}_${data.contact}.mp4`;
  const applyRes = await fetch(`${apiUrl}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, filename: videoFileName }),
  });
  if (!applyRes.ok) {
    const err = (await applyRes.json().catch(() => ({}))) as { message?: string };
    throw new Error(err.message ?? "영상 등록에 실패했습니다.");
  }
  const { applyId } = (await applyRes.json()) as { applyId: number };

  // 4단계: 나머지 폼 데이터 + applyId로 이메일 전송 (SMTP는 서버에서만 가능하므로 Next.js API Route 경유)
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
