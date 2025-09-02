import { MemberCard } from "@/entities/home/ui/MemberCard";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { cn } from "@/shared/utils/cn";
import GITHUB_ID from "../const/GithubID";

export default function SeventhSection() {
  const totalWidth = 18.4375 * GITHUB_ID.length;
  return (
    <section id="FinalsSixthSection" className={cn("flex flex-col items-center my-20")}>
      <div className={cn("w-[70%] mobile:w-full mobile:px-16")}>
        <SectionTitle
          title="광탈페 웹 플랫폼 개발자"
          description="광탈페 웹 플랫폼을 제작한 학생 개발자들을 소개합니다.
"
          className={cn("mt-[66px] mobile:mt-[1.7rem]")}
        />
        <div
          className={cn(
            "flex",
            "flex-col",
            "overflow-hidden",
            "w-full",
            "bg-white",
            "py-[15rem]",
            "items-center",
            "gap-[6.25rem]",
          )}
        >
          <h3
            className={cn(
              "xs:text-[2.75rem]/[3.85rem]",
              "text-[1.75rem]/[2.75rem]",
              "font-bold",
              "text-center",
            )}
          ></h3>
          <div className={cn("flex", "flex-col", "relative", "w-full", "overflow-hidden", "gap-6")}>
            <div
              className={cn("flex", "space-x-4", "whitespace-nowrap")}
              style={{
                animation: "scrollRight 25s linear infinite",
              }}
            >
              {GITHUB_ID.map(member => (
                <MemberCard githubID={member} key={member} />
              ))}
            </div>
            <div
              className={cn("flex", "space-x-4", "whitespace-nowrap")}
              style={{
                animation: "scrollLeft 25s linear infinite",
              }}
            ></div>
          </div>
          <style jsx global>{`
            @keyframes scrollRight {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${totalWidth + 1}rem);
              }
            }
            @keyframes scrollLeft {
              0% {
                transform: translateX(-${totalWidth + 1}rem);
              }
              100% {
                transform: translateX(0);
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
