// import ImageCarousel from "@/entities/home/ui/ImageCarousel";
import { cn } from "@/shared/utils/cn";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import ImageCarousel from "@/entities/home/ui/ImageCarousel";
import Image from "next/image";

// const SLIDES_1 = [
//   "/images/Preliminary/slide1_1.jpg",
//   "/images/Preliminary/slide1_2.jpg",
//   "/images/Preliminary/slide1_3.jpg",
// ];

// const SLIDES_2 = [
//   "/images/Preliminary/slide2_1.jpg",
//   "/images/Preliminary/slide2_2.jpg",
//   "/images/Preliminary/slide2_3.jpg",
// ];

const SLIDES_3 = [
  "/images/예선_공연_순서.jpg",
  "/images/25일/1.jpg",
  "/images/25일/2.jpg",
  "/images/25일/3.jpg",
  "/images/25일/4.jpg",
  "/images/25일/5.jpg",
  "/images/25일/6.jpg",
  "/images/25일/7.jpg",
  "/images/25일/8.jpg",
  "/images/25일/9.jpg",
  "/images/25일/10.jpg",
  "/images/25일/11.jpg",
  "/images/26일/1.jpg",
  "/images/26일/2.jpg",
  "/images/26일/3.jpg",
  "/images/26일/4.jpg",
  "/images/26일/5.jpg",
  "/images/26일/6.jpg",
  "/images/26일/7.jpg",
  "/images/26일/8.jpg",
  "/images/26일/9.jpg",
  "/images/26일/10.jpg",
  "/images/26일/11.jpg",
  "/images/26일/12.jpg",
  "/images/26일/13.jpg",
];

const YOUTUBE_PRELIMINARY_SAT = "https://www.youtube.com/embed/n1o5Q2AVs88";
const YOUTUBE_PRELIMINARY_FRI = "https://www.youtube.com/embed/KbnIFWzWU2Y";

const TEAMS_IMAGE = "/images/본선_진출팀.png";

const PreliminaryFourthSection = () => {
  return (
    <section id="PreliminaryFourthSection" className={cn("flex flex-col items-center")}>
      <div className={cn("w-[70%] mobile:w-full")}>
        <SectionTitle
          title="2025 광탈페 예선 다시보기"
          className={cn("mt-[66px] mobile:mt-[1.7rem] mb-[24px]")}
        />

        <h2
          className={cn(
            "text-body2b mobile:text-body3b place-self-start mb-18 mobile:mb-0 mobile:ml-12",
          )}
        >
          2025 광탈페 예선 참가팀 소개
        </h2>

        <div
          className={cn(
            "flex w-full items-start gap-10 justify-between mobile:flex-col mobile:mb-[38px]",
          )}
        >
          <div className={cn("w-[50%] mobile:w-full mobile:mt-16")}>
            <ImageCarousel wide slides={SLIDES_3} />
          </div>
          <div className={cn("w-[50%] mobile:w-full mobile:px-16")}>
            <video
              src="https://kr.object.ncloudstorage.com/gwangju-talent-festival-bucket/예선.mp4"
              className="w-full h-full object-cover rounded-xl"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </div>

        <div className={cn("flex w-full gap-10 mobile:flex-col")}>
          <div
            className={cn(
              "flex w-full flex-col items-start gap-10 justify-between mb-[90px] mobile:mb-[38px]",
            )}
          >
            <h2
              className={cn(
                "text-body2b mobile:text-body3b place-self-start mb-18 mobile:mb-0 mobile:ml-12",
              )}
            >
              2025. 7. 25(금) 光트로 예선1 다시보기
            </h2>
            <div className={cn("w-full mobile:w-full mobile:mt-16 mobile:px-16")}>
              <div
                className={cn("relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden")}
              >
                <iframe
                  src={YOUTUBE_PRELIMINARY_FRI}
                  title="2025 광탈페 예선1 다시보기"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div
            className={cn(
              "flex w-full flex-col items-start gap-10 justify-between mb-[90px] mobile:mb-[38px]",
            )}
          >
            <h2
              className={cn(
                "text-body2b mobile:text-body3b place-self-start mb-18 mobile:mb-0 mobile:ml-12",
              )}
            >
              2025. 7. 26(토) 光트로 예선2 다시보기
            </h2>
            <div className={cn("w-full mobile:w-full mobile:mt-16 mobile:px-16")}>
              <div
                className={cn("relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden")}
              >
                <iframe
                  src={YOUTUBE_PRELIMINARY_SAT}
                  title="2025 광탈페 예선2 다시보기"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cn("w-[70%] mobile:w-full")}>
        <SectionTitle
          title="2025 광탈페 본선 진출팀"
          className={cn("mt-[66px] mobile:mt-[1.7rem] mb-28")}
        />

        <div
          className={cn(
            "flex w-full items-center gap-10 justify-between mobile:flex-col mobile:mb-[38px] mb-32",
          )}
        >
          <div className={cn("w-[50%] mobile:w-full mobile:mt-16 flex justify-center px-8")}>
            <Image src={TEAMS_IMAGE} alt="본선 진출팀" width={500} height={500} />
          </div>
          <div className={cn("w-[50%] mobile:w-full mobile:px-16")}>
            <div className="space-y-6">
              <h3 className="text-body2r mobile:text-caption2r font-bold text-gray-800 mb-4">
                감동과 열정의 예선경연을 거쳐 총 10개 팀이
                <br />
                선정되었습니다. 축하드립니다.
              </h3>
              <div className="space-y-4 text-body2r mobile:text-caption2r">
                <p>
                  이제 2025. 9.27. 토요일
                  <br />
                  조선대학교 해오름관에서 대망의 본선무대가
                  <br />
                  펼쳐 집니다. 많은 관심과 응원 바랍니다.
                </p>
                <p className="text-body2r mobile:text-caption2r">
                  상기 순서는 실제 본선 공연순서와 다르며
                  <br />
                  예선심사점수와 무관합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreliminaryFourthSection;
