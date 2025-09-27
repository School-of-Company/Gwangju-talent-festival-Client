import { signinSchema, SignInFormValues, Role } from "@/entities/user/model/schema";
import { authFormState } from "@/entities/user/lib/authFormState";
import { signin } from "@/entities/user/api/signin";
import { setTokens } from "@/shared/utils/auth";

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
      isLoading: false,
      error: result.error.errors.map(e => e.message),
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
      response.refresh_token_expired_at,
    );

    document.cookie = `role=${response.role as Role}; path=/;`;

    const urlParams = new URLSearchParams(window.location.search);
    const nextParam = urlParams.get("next");
    
    const redirectTo = nextParam && nextParam.startsWith("/") && nextParam !== "/signin" 
      ? nextParam 
      : "/home";

    return {
      values,
      isValid: true,
      submitted: true,
      isLoading: false,
      shouldRedirect: true,
      redirectTo,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "로그인에 실패했습니다.";
    return {
      values,
      isValid: false,
      submitted: true,
      isLoading: false,
      error: [message],
    };
  }
};
