import MainYoutubeVideo from "@/entities/home/ui/MainYoutubeVideo";
import { cn } from "@/shared/utils/cn";

const IntroFirstSection = () => {
  return (
    <section
      id="section1"
      className={cn(
        "w-full relative bg-black overflow-hidden",
        "min-[1000px]:h-screen max-[999px]:h-auto",
      )}
    >
      <MainYoutubeVideo />
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-[8%] mobile:pb-[6%]">
        <div className="w-full max-w-[1060px] mx-auto px-4 text-white">
          <h1 className="text-[clamp(0.875rem,calc(-1.982rem+7.14vw),2.75rem)] font-bold leading-[120%]">
            光탈페 (광주학생탈렌트페스티벌)
          </h1>
          <p className="mt-[clamp(0.5rem,calc(-0.5rem+2.5vw),1.5rem)] text-[clamp(0.6875rem,calc(-1.3125rem+5vw),2rem)] leading-[130%] break-keep">
            광주학생의회가 중심이 되어 학생들이 재능을 펼치고 즐길 수 있도록 기획된 학생주도형
            오디션 프로그램입니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroFirstSection;
