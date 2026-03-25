"use client";

import { PhoneVerificationRequest, PhoneVerificationResponse } from "../model/schema";

export const sendVerificationCode = async (
  data: PhoneVerificationRequest,
): Promise<PhoneVerificationResponse> => {
  const response = await fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "인증번호 전송에 실패했습니다.");
  }

  if (!result || Object.keys(result).length === 0) {
    return { success: true, message: "인증번호가 전송되었습니다." };
  }

  return result;
};
