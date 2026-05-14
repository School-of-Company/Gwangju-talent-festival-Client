import { Logo } from "@/shared/asset/svg/Logo";
import { colors } from "@/shared/utils/color";
import SignupFormContainer from "@/widgets/signup/ui/SignupFormContainer";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className={cn("flex flex-col justify-center items-center h-screen w-full px-12")}>
      <div className={cn("w-full max-w-md flex flex-col items-center")}>
        <Link href="/home" className={cn("mb-20 mobile:mb-0")}>
          <Logo
            color={colors.orange[500]}
            width={200}
            height={200}
            className="mobile:w-[150px] mobile:h-[100px]"
          />
        </Link>
        <SignupFormContainer />
        <p className="text-body2r mt-28 text-gray-500 mobile:text-caption1r mobile:mt-10 ">
          이미 회원가입을 하셨나요?{" "}
          <Link href="/signin" className="text-orange-500 hover:underline">
            로그인 하러가기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
