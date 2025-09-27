// import { MemberCard } from "@/entities/home/ui/MemberCard";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { cn } from "@/shared/utils/cn";
// import GITHUB_ID from "../const/GithubID";
import Image from "next/image";

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
        <div className="flex text-title2b mobile:text-body3b text-center gap-8 justify-center items-center mobile:gap-4">
          <div className="w-[400px] h-[450px] mobile:h-[20%] mobile:w-[48%] flex flex-col items-center border-[4px] border-orange-300 mobile:border-[3px] border-solid rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 hover:translate-y-2 p-4">
            <a href="https://www.instagram.com/_gwhc" target="_blank">
              <Image src="/images/gwhclogo.png" alt="고등의회 로고" width={300} height={300} />
            </a>
            <span className="mt-2 text-body1b mobile:text-caption1b font-semibold">
              광주광역시고등의회
            </span>
            <p className="text-gray-500 text-body2r mobile:text-caption2r pb-6">
              행사 기획 및 운영
            </p>
          </div>
          <div className="w-[400px] h-[450px] mobile:h-[20%] mobile:w-[48%] flex flex-col items-center border-[4px] border-blue-400 mobile:border-[3px] border-solid rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 hover:translate-y-2 p-4">
            <a href="https://www.instagram.com/gsm.school" target="_blank">
              <Image src="/images/gsmlogo-.png" alt="광소마고 로고" width={300} height={300} />
            </a>
            <span className="mt-2 text-body1b mobile:text-caption1b font-semibold">
              광주소프트웨어마이스터고
            </span>
            <p className="text-gray-500 text-body2r mobile:text-caption2r pb-6">
              플랫폼 설계 및 개발
            </p>
          </div>
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
