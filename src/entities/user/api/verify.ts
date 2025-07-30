"use client";

import { PhoneVerificationRequest, PhoneVerificationResponse } from "../model/schema";
import axios from "axios";
import axiosInstance from "@/shared/lib/axios";

export const sendVerificationCode = async (data: PhoneVerificationRequest): Promise<PhoneVerificationResponse> => {
  try {
    const response = await axiosInstance.post<PhoneVerificationResponse>("/auth/verify", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.message || "인증번호 전송에 실패했습니다.";
      throw new Error(errorMessage);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("네트워크 오류가 발생했습니다.");
  }
}; 