import { Logo } from "@/shared/asset/svg/Logo";
import { colors } from "@/shared/utils/color";
import SignupFormContainer from "@/widgets/signup/ui/SignupFormContainer";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className={cn("flex flex-col items-center mt-52 h-screen w-full px-12")}>
      <div className={cn("w-full max-w-md flex flex-col items-center")}>
        <div className={cn("mb-20")}>
          <Logo color={colors.main[600]} width={200} height={200} />
        </div>
        <SignupFormContainer />
        <p className="text-body2r mt-28 text-gray-500">
          이미 회원가입을 하셨나요?{" "}
          <Link href="/signin" className="text-main-600 hover:underline">
            로그인 하러가기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
