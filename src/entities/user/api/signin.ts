"use client";

import { SignInRequest, SignInResponse } from "../model/schema";
import axios from "axios";
import axiosInstance from "@/shared/lib/axios";

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  try {
    const response = await axiosInstance.post<SignInResponse>("/auth/signin", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.message || "로그인에 실패했습니다.";
      throw new Error(errorMessage);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("네트워크 오류가 발생했습니다.");
  }
}; 