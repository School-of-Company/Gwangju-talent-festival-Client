// import ImageCarousel from "@/entities/home/ui/ImageCarousel";
import { cn } from "@/shared/utils/cn";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { formatDate } from "@/shared/utils/formatDate";
import ImageCarousel from "@/entities/home/ui/ImageCarousel";

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

const PRELIMINARY_START_DATE = new Date("2025-07-25T00:00:00+09:00");
const PRELIMINARY_END_DATE = new Date("2025-07-26T23:59:59+09:00");

const PreliminaryFourthSection = () => {
  const openYoutube = () => {
    window.open(
      "https://www.youtube.com/@%EA%B4%91%EC%A3%BC%ED%95%99%EC%83%9D%EC%98%88%EC%88%A0%EB%88%84%EB%A6%AC-s3w",
      "_blank",
    );
  };

  return (
    <section id="PreliminaryFourthSection" className={cn("flex flex-col items-center")}>
      <div className={cn("w-[70%] mobile:w-full")}>
        <SectionTitle
          title="2025 광탈페 예선"
          description=""
          className={cn("mt-[66px] mobile:mt-[1.7rem] mb-[24px]")}
        />

        <div
          className={cn(
            "flex w-full items-start justify-between mb-[90px] mobile:flex-col mobile:mb-[38px]",
          )}
        >
          <div className={cn("w-[70%] mobile:w-full mobile:mt-16")}>
            <ImageCarousel wide slides={SLIDES_3} />
          </div>
          <div className={cn("w-[25%] mobile:w-full mobile:px-16")}>
            <p className={cn("text-title4b mobile:text-body3b place-self-start mb-24 mobile:mb-0")}>
              예선(光트로)
            </p>
            <button
              className={cn(
                "inline-flex items-center text-main-600 font-bold text-body2b mb-12 mobile:mb-0 mobile:text-sm hover:underline group",
              )}
            >
              2025. {formatDate(PRELIMINARY_START_DATE)} ~ {formatDate(PRELIMINARY_END_DATE)} 14:00
            </button>
            <button
              className={cn(
                "inline-flex items-center text-main-600 font-bold text-body2b mb-24 mobile:mb-0 mobile:text-sm hover:underline group",
              )}
            >
              광주광역시교육청학생교육문화회관 공연장
            </button>
            <div className={cn("flex flex-col gap-16")}>
              <p className={cn("text-body2r text-gray-500 mobile:text-caption2r mobile:py-8")}>
                영상심사를 통과한 참가자들이 직접 무대에서 경연을 펼치게 됩니다. 전문 심사위원의
                심사를 거쳐 본선 진출자를 확정하게 됩니다.
              </p>
              <p className={cn("text-body2r text-gray-500 mobile:text-caption2r mobile:py-8")}>
                예선은 광주학생예술누리터 유튜브 생중계를 통해서만 관람하실 수 있습니다
              </p>
            </div>
            <div
              className={cn("w-[100%] mobile:w-full mobile:px-16 mt-12 flex flex-col items-center")}
            >
              <video
                src="https://kr.object.ncloudstorage.com/gwangju-talent-festival-bucket/예선.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <button
                className={cn(
                  "inline-flex items-center justify-center text-main-600 font-bold text-body2b mt-12 mobile:mt-0 mobile:text-sm hover:underline group self-center",
                )}
                onClick={() => {
                  openYoutube();
                }}
              >
                예선 보러가기 &gt;
              </button>
            </div>
          </div>
        </div>
        <div className={cn("flex w-full items-start justify-between mobile:flex-col-reverse")}>
          {/* <div className={cn("w-[70%] mobile:w-full mobile:mt-16")}>
            <ImageCarousel wide={true} slides={SLIDES_2} />
          </div>
          <div className={cn("w-[25%] mobile:w-full mobile:px-16")}>
            <p className={cn("text-title4b mobile:text-body3b place-self-start mb-24 mobile:mb-0")}>
              2차 예선(光트로)
            </p>
            <button
              className={cn(
                "inline-flex items-center text-main-600 font-bold text-body2b mb-24 mobile:mb-0 mobile:text-sm hover:underline group",
              )}
            >
              2025. {formatDate(PRELIMINARY_START_DATE)} ~ {formatDate(PRELIMINARY_END_DATE)} 14:00
              <br />
              광주광역시교육청학생교육문화회관 공연장
            </button>
            <p className={cn("text-body2r text-gray-500 mobile:text-caption2r mobile:py-8")}>
              1차 영상심사를 통과한 참가자들이 직접 무대에서 경연을 펼치게 됩니다. 전문 심사위원의
              심사를 거쳐 본선 진출자를 확정하게 됩니다.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default PreliminaryFourthSection;
