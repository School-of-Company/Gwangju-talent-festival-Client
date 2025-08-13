"use client";

import Input from "@/shared/ui/Input";
import { cn } from "@/shared/utils/cn";
import { useActionState } from "react";
import SubmitButton from "@/entities/user/ui/SubmitButton";
import { authFormState } from "@/entities/user/lib/authFormState";
import { handleSigninFormSubmit } from "@/widgets/signin/lib/handleSigninFormSubmit";

const SigninFormContainer = () => {
  const initialState: authFormState = {
    values: { phoneNumber: "", password: "" },
    isValid: false,
    submitted: false,
    isLoading: false,
  };

  const [state, formAction] = useActionState(handleSigninFormSubmit, initialState);

  return (
    <div className={cn("w-full mb-4")}>
      <form action={formAction}>
        <input type="hidden" name="formType" value="signin" />
        <div className={cn("space-y-16")}>
          <div>
            <Input
              type="text"
              placeholder="전화번호를 입력해주세요."
              label="전화번호"
              name="phoneNumber"
              className={cn("mt-2")}
              disabled={state.isLoading}
              defaultValue={state.values.phoneNumber}
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              label="비밀번호"
              name="password"
              className={cn("mt-2")}
              disabled={state.isLoading}
              defaultValue={state.values.password}
            />
          </div>
        </div>

        <div className={cn("flex flex-col gap-2 mt-16")}>
          <SubmitButton 
            buttonText={state.isLoading ? "로그인 중..." : "로그인"}
            disabled={state.isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default SigninFormContainer;
