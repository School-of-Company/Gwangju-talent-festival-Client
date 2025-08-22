import { toast } from "sonner";
import { authFormState } from "@/entities/user/lib/authFormState";
import { SignUpFormValues, signUpSchema } from "@/entities/user/model/schema";
import { signUp } from "@/entities/user/api/signup";
import { ZodError } from "zod";

export const handleSignupFormSubmit = async (
  _previousState: authFormState,
  formData: FormData,
): Promise<authFormState> => {
  const values: SignUpFormValues = {
    phoneNumber: formData.get("phoneNumber")?.toString() || "",
    verificationCode: formData.get("verificationCode")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const result = signUpSchema.safeParse(values);

  if (!result.success) {
    result.error.errors.forEach((err: ZodError["errors"][0]) => toast.error(err.message));
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
      code: values.verificationCode,
      password: values.password,
    };

    await signUp(requestData);

    return {
      values,
      isValid: true,
      submitted: true,
      isLoading: false,
      shouldRedirect: true,
      redirectTo: "/signin",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "회원가입에 실패했습니다.";
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
