"use client";

import { SignUpRequest, SignUpResponse } from "../model/schema";
import axios from "axios";
import axiosInstance from "@/shared/lib/axios";

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const response = await axiosInstance.post<SignUpResponse>("/auth/join", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.message || "회원가입에 실패했습니다.";
      throw new Error(errorMessage);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("네트워크 오류가 발생했습니다.");
  }
}; 