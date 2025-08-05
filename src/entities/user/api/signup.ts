"use client";

import { SignUpRequest, SignUpResponse } from "../model/schema";

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "회원가입에 실패했습니다.");
  }

  return result;
}; 