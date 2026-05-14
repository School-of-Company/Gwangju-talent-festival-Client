import { AuthFormState } from "@/entities/user/lib/AuthFormState";
import { SignUpFormValues, signUpSchema } from "@/entities/user/model/schema";
import { signUp } from "@/entities/user/api/signup";

export const handleSignupFormSubmit = async (
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> => {
  const values: SignUpFormValues = {
    phoneNumber: formData.get("phoneNumber")?.toString() || "",
    verificationCode: formData.get("verificationCode")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    passwordConfirm: formData.get("passwordConfirm")?.toString() || "",
  };

  const result = signUpSchema.safeParse(values);

  if (!result.success) {
    return {
      values,
      isValid: false,
      submitted: true,
      error: result.error.errors.map(e => e.message),
    };
  }

  if (values.password !== values.passwordConfirm) {
    return {
      values,
      isValid: false,
      submitted: true,
      error: "비밀번호가 일치하지 않습니다.",
    };
  }

  try {
    const requestData = {
      phone_number: values.phoneNumber,
      code: values.verificationCode,
      password: values.password,
    };

    await signUp(requestData);

    return {
      values,
      isValid: true,
      submitted: true,
      shouldRedirect: true,
      redirectTo: "/signin",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "회원가입에 실패했습니다.";
    return {
      values,
      isValid: false,
      submitted: true,
      error: errorMessage,
    };
  }
};
