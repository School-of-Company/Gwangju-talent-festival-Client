"use client";

import { cn } from "@/shared/utils/cn";
import { SectionTitle } from "@/shared/ui/SectionTitle";
// import dynamic from "next/dynamic";
import YouTubeLazyEmbed from "@/shared/ui/YouTubeLazyEmbed";
// import MapButtonComponent from "@/widgets/mapbutton";

// const Map = dynamic(
//   () => import("@/entities/home/ui/Map").then(module => ({ default: module.Map })),
//   {
//     ssr: false,
//   },
// );

const FinalsSixthSection = () => {
  return (
    <section id="FinalsSixthSection" className={cn("flex flex-col items-center my-20")}>
      <div className={cn("w-[70%] mobile:w-full")}>
        <SectionTitle
          title="2025 광탈페 본선"
          className={cn("mt-[66px] mobile:mt-[1.7rem] mb-28")}
        />

        <div
          className={cn(
            "flex w-full flex-col items-start gap-10 justify-between mb-[90px] mobile:mb-[38px]",
          )}
        >
          <div className={cn("w-full mobile:w-full mobile:mt-16 mobile:px-16")}>
            <YouTubeLazyEmbed videoId="J-Bj9cM4c3M" title="2025 광탈페 본선 다시보기" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalsSixthSection;
