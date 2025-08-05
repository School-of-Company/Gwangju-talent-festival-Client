"use client";

import { SignInRequest, SignInResponse } from "../model/schema";

export const signin = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await fetch("/api/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "로그인에 실패했습니다.");
  }

  return result;
}; 