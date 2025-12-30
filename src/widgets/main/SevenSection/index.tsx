// import { MemberCard } from "@/entities/home/ui/MemberCard";
import OrganizationWrapper from "@/entities/home/ui/OrganizationWrapper";
import ShakeHand from "@/shared/asset/svg/shakeHand";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { cn } from "@/shared/utils/cn";
// import GITHUB_ID from "../const/GithubID";

export default function SeventhSection() {
  // const totalWidth = 18.4375 * GITHUB_ID.length;
  return (
    <section id="FinalsSixthSection" className={cn("flex flex-col items-center my-20")}>
      <div className={cn("w-[70%] mobile:w-full mobile:px-10")}>
        <SectionTitle
          title="광탈페 운영진 소개"
          description="로고 클릭 시 인스타로 이동합니다"
          className={cn("mt-[66px] mobile:mt-[1.7rem]")}
        />
        <div className="flex text-title2b mobile:text-body3b text-center gap-[100px] justify-center items-center mobile:gap-[12px]">
          <OrganizationWrapper
            label="광주광역시고등의회"
            description="행사 기획 및 운영"
            imageSrc="/images/gwhclogo.png"
            href="https://www.instagram.com/_gwhc"
          />
          <ShakeHand />
          <OrganizationWrapper
            label="광주소프트웨어마이스터고"
            description="플랫폼 설계 및 개발"
            imageSrc="/images/gsmlogo-.png"
            href="https://www.instagram.com/gsm.school"
          />
        </div>
        {/* <SectionTitle
          title="광탈페 웹 플랫폼 개발자"
          description="광탈페 웹 플랫폼을 제작한 학생 개발자들을 소개합니다."
          className={cn("mt-[66px] mobile:mt-[1.7rem]")}
        />
        <div
          className={cn(
            "flex flex-col overflow-hidden w-full bg-white pb-[4rem] items-center mobile:py-0",
          )}
        >
          <div className={cn("flex flex-col relative w-full overflow-hidden gap-6 mt-8")}>
            <div
              className={cn("flex space-x-4 whitespace-nowrap gap-10")}
              style={{
                animation: `scrollRight ${(totalWidth * 2) / 25}s linear infinite`,
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
                transform: translateX(-${totalWidth}rem);
              }
            }
          `}</style>
        </div> */}
      </div>
    </section>
  );
}
