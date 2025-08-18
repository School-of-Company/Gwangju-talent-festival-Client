"use client";

import Input from "@/shared/ui/Input";
import { cn } from "@/shared/utils/cn";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "@/entities/user/ui/SubmitButton";
import { authFormState } from "@/entities/user/lib/authFormState";
import { handleSigninFormSubmit } from "@/widgets/signin/lib/handleSigninFormSubmit";
import { toast } from "sonner";

const SigninFormContainer = () => {
  const router = useRouter();
  const initialState: authFormState = {
    values: { phoneNumber: "", password: "" },
    isValid: false,
    submitted: false,
    isLoading: false,
  };

  const [state, formAction] = useActionState(handleSigninFormSubmit, initialState);

  useEffect(() => {    
    if (state.error) {
      const errors = Array.isArray(state.error) ? state.error : [state.error];
      errors.forEach((error) => toast.error(error));
    } else if (state.isValid) {
      toast.success("로그인 성공");
    }
  }, [state.submitted, state.error, state.isValid]);

  useEffect(() => {
    if (state.shouldRedirect && state.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state.shouldRedirect, state.redirectTo, router]);

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
