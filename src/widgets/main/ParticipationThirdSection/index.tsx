import Image from "next/image";
import Link from "next/link";
import ImageCarousel from "@/entities/home/ui/ImageCarousel";
import { cn } from "@/shared/utils/cn";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import React from "react";

const SLIDES = [
  "/images/Participation/slide1.jpg",
  "/images/Participation/slide2.jpg",
  "/images/Participation/slide3.jpg",
  "/images/Participation/slide4.jpg",
  "/images/Participation/slide5.jpg",
];

const BackgroundImages = () => (
  <div className={cn("mobile:hidden z-0")}>
    <div className={cn("absolute left-[1%] top-0 h-full w-[24%]")}>
      <Image src="/images/starline.png" alt="Star Line" fill />
    </div>
    <div className={cn("absolute right-[4%] top-0 h-full w-[24%]")}>
      <Image src="/images/trophyline.png" alt="Trophy Line" fill />
    </div>
    <div
      className={cn(
        "absolute left-[-10%] top-[55%] translate-y-[-50%] w-[40%] aspect-square tablet:left-0",
      )}
    >
      <Image src="/images/star.png" alt="Star" fill />
    </div>
    <div
      className={cn("absolute right-[-7%] top-[30%] translate-y-[-50%] w-[40%] aspect-square z-0")}
    >
      <Image src="/images/trophy.png" alt="Trophy" fill />
    </div>
  </div>
);

const ParticipationThirdSection = () => {
  return (
    <section
      id="ParticipationThirdSection"
      className={cn(
        "relative h-[900px] bg-main-100 overflow-hidden tablet:h-[800px] justify-items-center mobile:h-[32rem]",
      )}
    >
      <BackgroundImages />

      <div
        className={cn(
          "w-[65%] h-full flex flex-col justify-center mobile:w-full gap-[60px] mobile:gap-[24px] mx-auto",
        )}
      >
        <div id="apply" className={cn("relative text-center mt-20 mobile:mt-[1.7rem] ")}>
          <SectionTitle
            title="예선 결과 및 사전 협의회 참석 안내"
            description={
              <>
                오디션에 선정되신 24개 팀의 대표는 신분증을 지참하여 협의회에 참석해주세요.
                <br />
                <span className={cn("inline-block")}>
                  (7월 16일(수) 17:00~18:00 광주학생예술누리터 꿈이룸관(2층))
                </span>
              </>
            }
          />

          <Link href="/result">
            <span
              className={cn(
                "inline-flex items-center font-bold text-body2b mobile:text-sm group cursor-pointer underline text-main-500",
              )}
            >
              자세히 보기 &gt;
            </span>
          </Link>
        </div>
        <ImageCarousel slides={SLIDES} />
      </div>
    </section>
  );
};

export default ParticipationThirdSection;
