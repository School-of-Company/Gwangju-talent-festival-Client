import { phoneNumberSchema } from "@/shared/model/phoneNumberSchema";
import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "비밀번호는 영문과 숫자를 포함해야 합니다.");

export const verificationCodeSchema = z
  .string()
  .min(1, "인증번호를 입력해주세요.")
  .length(6, "인증번호는 6자리여야 합니다.");

export const signinSchema = z.object({
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  phoneNumber: phoneNumberSchema,
  verificationCode: verificationCodeSchema,
  password: passwordSchema,
});

export const phoneVerificationRequestSchema = z.object({
  phoneNumber: phoneNumberSchema,
});

export interface SignInRequest {
  phone_number: string;
  password: string;
}

export type Role = "ROLE_USER" | "ROLE_ADMIN";

export interface SignInResponse {
  access_token: string;
  access_token_expired_at: string;
  refresh_token: string;
  refresh_token_expired_at: string;
  role: Role;
}

export interface PhoneVerificationRequest {
  phone_number: string;
}

export interface PhoneVerificationResponse {
  success?: boolean;
  message?: string;
}

export interface SignUpRequest {
  phone_number: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    phone_number: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type SignInFormValues = z.infer<typeof signinSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type PhoneVerificationRequestValues = z.infer<typeof phoneVerificationRequestSchema>;
