import { signinSchema, SignInFormValues } from "@/entities/user/model/schema";
import { authFormState } from "@/entities/user/lib/authFormState";
import { signin } from "@/entities/user/api/signin";
import { setTokens } from "@/shared/utils/auth";
import { toast } from "sonner";
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
    result.error.errors.forEach(err => toast.error(err.message));
    return {
      values,
      isValid: false,
      submitted: true,
      error: "입력값이 올바르지 않습니다.",
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
    
    toast.success("로그인 성공");
    
    redirect("/home");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "로그인에 실패했습니다.";
    toast.error(errorMessage);
    
    return {
      values,
      isValid: false,
      submitted: true,
      isLoading: false,
      error: errorMessage,
    };
  }
};
