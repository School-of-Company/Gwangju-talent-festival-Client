"use server";

import { signinSchema, SignInFormValues } from "@/entities/user/model/schema";
import { authFormState } from "@/entities/user/lib/authFormState";
import { signin } from "@/entities/user/api/signin";
import { setTokens } from "@/shared/utils/auth";
import { redirect } from "next/navigation";

export const handleSigninFormSubmit = async (
  _previousState: authFormState,
  formData: FormData,
): Promise<authFormState> => {
  const values: SignInFormValues = {
    phoneNumber: formData.get("phoneNumber")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const result = signinSchema.safeParse(values);

  if (!result.success) {
    return {
      values,
      isValid: false,
      submitted: true,
      error: result.error.errors.map((err) => err.message), 
    };
  }

  try {
    const requestData = {
      phone_number: values.phoneNumber,
      password: values.password,
    };

    const response = await signin(requestData);
    
    setTokens(
      response.access_token,
      response.access_token_expired_at,
      response.refresh_token,
      response.refresh_token_expired_at
    );
    
    redirect("/home");
    
    return {
      values,
      isValid: true,
      submitted: true,
      isLoading: false,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "로그인에 실패했습니다.";
    
    return {
      values,
      isValid: false,
      submitted: true,
      isLoading: false,
      error: errorMessage,
    };
  } finally {
    redirect("/home");
  }
};
