import { MemberCard } from "@/entities/home/ui/MemberCard";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { cn } from "@/shared/utils/cn";
import GITHUB_ID from "../const/GithubID";

export default function TeamIntroduceSection() {
  const CARD_WIDTH_REM = 18.4375;
  const distanceRem = CARD_WIDTH_REM * GITHUB_ID.length;
  return (
    <section
      id="TeamIntroduceSection"
      className={cn("flex bg-gray-50 flex-col items-center py-[72px]")}
    >
      <SectionTitle
        title="광탈페 웹 플랫폼 개발자"
        description="광탈페 웹 플랫폼을 제작한 학생 개발자들을 소개합니다."
        className={cn("mt-[1.7rem] sm:mt-[66px]")}
      />
      <div
        className={cn(
          "flex flex-col mt-[60px] overflow-hidden bg-gray-50 w-full pb-[4rem] items-center mobile:py-0",
        )}
      >
        <div className={cn("flex flex-col relative w-full bg-gray-50 overflow-hidden gap-6 mt-8")}>
          <div
            className={cn("flex whitespace-nowrap bg-gray-50 gap-24")}
            style={{
              animation: `scrollRight ${(distanceRem * 2) / 25}s linear infinite`,
            }}
          >
            {GITHUB_ID.concat(GITHUB_ID).map((member, index) => (
              <MemberCard githubID={member.id} role={member.role} key={index} />
            ))}
          </div>
        </div>
        <style jsx global>{`
          @keyframes scrollRight {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${distanceRem}rem);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
