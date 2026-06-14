import { PhoneVerificationRequest, ApiError } from "../model/schema";

export const sendVerificationCode = async (data: PhoneVerificationRequest): Promise<void> => {
  const response = await fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as Partial<ApiError>;
    throw new Error(result.message || "인증번호 전송에 실패했습니다.");
  }
};
