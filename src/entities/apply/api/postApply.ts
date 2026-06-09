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

export const postApply = async (data: ApplyFormData): Promise<void> => {
  const formData = new FormData();
  formData.append("field", data.field);
  formData.append("teamName", data.teamName);
  formData.append("school", data.school);
  formData.append("representative", data.representative);
  formData.append("contact", data.contact);
  formData.append("applicationFile", data.applicationFile);
  formData.append("privacyFile", data.privacyFile);
  formData.append("videoFile", data.videoFile);

  const response = await fetch("/api/apply", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "전송 중 오류가 발생했습니다.");
  }
};
