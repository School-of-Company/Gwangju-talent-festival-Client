"use client";

import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authFormState } from "@/entities/user/lib/authFormState";
import SubmitButton from "@/entities/user/ui/SubmitButton";
import { handleSignupFormSubmit } from "@/widgets/signup/lib/handleSignupFormSubmit";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { phoneNumberSchema } from "@/shared/model/phoneNumberSchema";
import { sendVerificationCode } from "@/entities/user/api/verify";

const SignupFormContainer = () => {
  const router = useRouter();
  const [codeSent, setCodeSent] = useState(false);
  const [isCodeSending, setIsCodeSending] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const initialState: authFormState = {
    values: { phoneNumber: "", verificationCode: "", password: "" },
    isValid: false,
    submitted: false,
  };

  const [state, formAction, isPending] = useActionState(handleSignupFormSubmit, initialState);

  useEffect(() => {
    if (state.error) {
      const errors = Array.isArray(state.error) ? state.error : [state.error];
      errors.forEach(error => toast.error(error));
    } else if (state.isValid) {
      toast.success("회원가입 성공");
    }
  }, [state.submitted, state.error, state.isValid]);

  useEffect(() => {
    if (state.shouldRedirect && state.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state.shouldRedirect, state.redirectTo, router]);

  const handleSendVerificationCode = async () => {
    const phoneNumber = phoneInputRef.current?.value || "";

    const result = phoneNumberSchema.safeParse(phoneNumber);

    if (!result.success) {
      toast.error("올바른 전화번호 형식이 아닙니다.");
      return;
    }

    setIsCodeSending(true);

    try {
      const response = await sendVerificationCode({
        phone_number: phoneNumber,
      });

      if (response.success) {
        toast.success("인증번호가 전송되었습니다.");
        setCodeSent(true);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "인증번호 전송에 실패했습니다.");
    } finally {
      setIsCodeSending(false);
    }
  };

  return (
    <div className={cn("w-full mb-4")}>
      <form action={formAction} className="flex flex-col h-[min(calc(100vh-220px),30rem)]">
        <input type="hidden" name="formType" value="signup" />
        <div className={cn("space-y-16")}>
          <div className={cn("flex flex-col gap-2")}>
            <label className={cn("text-sm font-medium")}>전화번호</label>
            <div className={cn("flex items-end gap-8")}>
              <div className={cn("w-full")}>
                <Input
                  type="text"
                  placeholder="전화번호를 입력해주세요."
                  name="phoneNumber"
                  ref={phoneInputRef}
                  disabled={isPending || isCodeSending}
                  defaultValue={state.values.phoneNumber}
                />
              </div>
              <Button
                className={cn("w-32 shrink-0 h-[50px]")}
                type="button"
                onClick={handleSendVerificationCode}
                disabled={isPending || isCodeSending}
              >
                {isCodeSending ? "전송중..." : codeSent ? "재전송" : "인증번호"}
              </Button>
            </div>
          </div>

          {codeSent && (
            <div>
              <Input
                type="text"
                placeholder="인증번호를 입력해주세요."
                label="인증번호 입력"
                className={cn("mt-2")}
                name="verificationCode"
                disabled={isPending}
                defaultValue={state.values.verificationCode}
              />
            </div>
          )}

          <div>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              label="비밀번호 입력"
              className={cn("mt-2")}
              name="password"
              disabled={isPending}
              defaultValue={state.values.password}
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              label="비밀번호 확인"
              className={cn("mt-2")}
              name="passwordConfirm"
              disabled={isPending}
              defaultValue={state.values.passwordConfirm}
            />
          </div>
        </div>

        <div className={cn("flex flex-col gap-2 mt-auto")}>
          <SubmitButton
            buttonText={isPending ? "가입 중..." : "회원가입"}
            disabled={isPending || !codeSent}
          />
        </div>
      </form>
    </div>
  );
};

export default SignupFormContainer;
