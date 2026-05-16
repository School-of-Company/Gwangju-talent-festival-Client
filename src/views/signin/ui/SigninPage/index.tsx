import { Logo } from "@/shared/asset/svg/Logo";
import { colors } from "@/shared/utils/color";
import SigninFormContainer from "@/widgets/signin/ui/SigninFormContainer";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";

const SigninPage = () => {
  return (
    <div className={cn("flex flex-col items-center justify-center h-screen w-full px-12")}>
      <div className={cn("w-full max-w-md flex flex-col items-center")}>
        <Link href="/home" className={cn("mb-20 mobile:mb-0")}>
          <Logo
            color={colors.orange[500]}
            width={200}
            height={200}
            className="mobile:w-[150px] mobile:h-[100px]"
          />
        </Link>
        <SigninFormContainer />
        <p className="text-body2r mt-28 text-gray-500 mobile:text-caption1r mobile:mt-10 ">
          저희 사이트에 처음 방문하셨나요?{" "}
          <Link href="/signup" className="text-orange-500 hover:underline">
            회원가입 하러가기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
