import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/shared/asset/svg/Logo";
import { colors } from "@/shared/utils/color";
import Button from "@/shared/ui/Button";

const ApplyFormSuccess = () => {
  const router = useRouter();

  const handleGoHome = useCallback(() => {
    router.push("/home");
  }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center w-full text-center"
      style={{ height: "calc(100vh - 81px)" }}
    >
      <Logo height={131} color={colors.orange[500]} width={211} />
      <div className="mt-[52px]">
        <h1 className="sm:text-title2b text-title4b text-center">
          2026 光탈페 접수가 완료되었습니다
        </h1>
        <div className="mx-auto">
          <Button onClick={handleGoHome} className="my-[24px] mobile:mb-[12px] px-28">
            <span className="text-body2b mobile:text-body3b flex items-center gap-10">
              홈으로 가기 <span>➔</span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplyFormSuccess;
