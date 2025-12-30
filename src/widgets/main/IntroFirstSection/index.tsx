import MainYoutubeVideo from "@/entities/home/ui/MainYoutubeVideo";
import { cn } from "@/shared/utils/cn";

const IntroFirstSection = () => {
  return (
    <section
      id="section1"
      className={cn(
        "mobile:h-auto",
        "tablet:h-auto",
        "h-[calc(100vh-4.625rem)]",
        "w-full",
        "relative",
        "top-0",
        "flex",
        "justify-center",
        "bg-black",
        "overflow-hidden",
      )}
    >
      <MainYoutubeVideo />
      <div
        className={cn(
          "relative",
          "z-10",
          "w-full",
          "max-w-[1060px]",
          "px-4",
          "flex",
          "flex-col",
          "justify-end",
          "pb-[12%]",
          "text-white",
        )}
      >
        <h1 className={cn("text-title1b mobile:text-caption1b")}>
          光탈페 (광주학생탈렌트페스티벌)
        </h1>
        <p className={cn("mt-12 text-title4r mobile:text-caption3r leading-[130%]")}>
          광주학생의회가 중심이 되어 학생들이 재능을 펼치고 즐길 수 있도록 기획된 학생주도형 오디션
          프로그램입니다.
        </p>
      </div>
    </section>
  );
};

export default IntroFirstSection;
