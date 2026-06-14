import { SignUpRequest, ApiError } from "../model/schema";

export const signUp = async (data: SignUpRequest): Promise<void> => {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as Partial<ApiError>;
    throw new Error(result.message || "회원가입에 실패했습니다.");
  }
};
