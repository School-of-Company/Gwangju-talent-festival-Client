"use client";

import { useState, useEffect } from "react";
import SloganMarquee from "@/entities/home/ui/SloganMarquee";
import PrizeItem from "@/entities/home/ui/PrizeItem";
import { cn } from "@/shared/utils/cn";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { sloganStartDate, sloganEndDate, isSloganAwardReleased } from "@/shared/config/dateConfig";

const PRIZE_LIST = [
  { rank: "2등", bg: "bg-gray-400", emoji: "🍗", desc: "치킨 세트" },
  { rank: "1등", bg: "bg-[#E8B84B]", emoji: "🎁", desc: "수상자 해당 학습 간식" },
  { rank: "3등", bg: "bg-[#9B5E3B]", emoji: "🍔", desc: "햄버거 세트" },
];

const AWARD_LIST = [
  { rank: "2등", bg: "bg-gray-400", school: "광주송원여자고등학교", name: "주*서" },
  { rank: "1등", bg: "bg-[#E8B84B]", school: "광주소프트웨어마이스터고", name: "김*솔" },
  { rank: "3등", bg: "bg-[#9B5E3B]", school: "광주소프트웨어마이스터고", name: "이*" },
] as const;

const FIRST_PLACE_SLOGAN = "빛고을에 울려 퍼지는 우리의 끼, 광탈페에서!";
const MARQUEE_EXTRA_SLOGANS = [
  "빛고을에 울려 퍼지는 우리의 끼, 광탈페에서!",
  "우리가 만드는 가장 찬란한 순간, 청춘의 에너지를 무한한 가능성으로!",
  "너의 재능을 ON, 광주의 미래를 ON!",
] as const;

// import { formatDate } from "@/shared/utils/formatDate";
// import Button from "@/shared/ui/Button";
// import { useRouter } from "next/navigation";
// import { ArrowBack } from "@/shared/asset/svg/ArrowBack";

const SLOGAN_YEAR = sloganStartDate.getFullYear();
// const submissionPeriodText = `공모기간 : ${SLOGAN_YEAR}.${formatDate(sloganStartDate)}~${formatDate(sloganEndDate)}`;

const SloganSecondSection = () => {
  const [isSloganPeriod, setIsSloganPeriod] = useState(false);
  const [sloganEnded, setSloganEnded] = useState(false);
  const [awardReleased, setAwardReleased] = useState(() => isSloganAwardReleased());

  useEffect(() => {
    const updateSloganStatus = () => {
      const now = new Date();
      setIsSloganPeriod(now >= sloganStartDate && now <= sloganEndDate);
      setSloganEnded(now > sloganEndDate);
      setAwardReleased(isSloganAwardReleased());
    };

    updateSloganStatus();

    const timer = setInterval(updateSloganStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="SloganSecondSection"
      className={cn("w-full mt-[3.5rem] mobile:mt-20 pb-[40px] mobile:pb-[24px] text-center")}
    >
      <SectionTitle
        title={
          awardReleased
            ? `${SLOGAN_YEAR} 광탈페 슬로건`
            : sloganEnded
              ? `${SLOGAN_YEAR} 광탈페 슬로건 접수마감 되었습니다`
              : `${SLOGAN_YEAR} 광탈페 슬로건 ${isSloganPeriod ? "공모중" : "공모예정"}`
        }
        description={
          awardReleased ? (
            <>
              <span className="inline-block text-black text-body2b mobile:text-body3b mb-[8px]">
                {FIRST_PLACE_SLOGAN}
              </span>
              <span className={cn("block")}>
                {SLOGAN_YEAR}년 모두가 주인공이 되는 광주학생탈렌트페스티벌의 꿈의 무대가
                펼쳐집니다.
              </span>
            </>
          ) : (
            <>
              <span className="text-black text-body2b mobile:text-body3b">
                세상의 무대 위, 광탈페! 너의 꿈이 시작되는 순간!
              </span>
              <span className={cn("block")}>
                {SLOGAN_YEAR}년 모두가 주인공이 되는 광주학생탈렌트페스티벌의 꿈의 무대가
                펼쳐집니다.
              </span>
            </>
          )
        }
      />

      <SloganMarquee extraSlogans={awardReleased ? MARQUEE_EXTRA_SLOGANS : undefined} />

      <div className={cn("mt-[54px] mb-[10px] flex flex-col items-center gap-8")}>
        {awardReleased ? (
          <div className="relative w-full flex justify-center">
            <div className={cn("flex justify-center gap-[60px] mobile:gap-[24px]")}>
              {AWARD_LIST.map(item => (
                <div key={item.rank} className="flex flex-col items-center gap-[16px]">
                  <div
                    className={`w-[60px] h-[60px] mobile:w-[36px] mobile:h-[36px] flex justify-center items-center rounded-full text-white text-body1r mobile:text-caption2r ${item.bg}`}
                  >
                    {item.rank}
                  </div>
                  <div className="flex flex-col items-center gap-[4px] text-body3r mobile:text-caption2r text-gray-700">
                    <span>{item.school}</span>
                    <span>{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div
              className={cn("w-full flex justify-center gap-[60px] mobile:gap-[24px] mb-[24px]")}
            >
              {PRIZE_LIST.map(item => (
                <PrizeItem key={item.rank} {...item} />
              ))}
            </div>
            <p className={cn("text-body2b mobile:text-body3b text-gray-700")}>
              공모 접수내용에 대해 심사중입니다.
            </p>
            <p className={cn("text-body3r text-gray-700")}>결과발표 : 2026. 6. 9.(예정)</p>
          </>
        )}
      </div>
    </section>
  );
};

export default SloganSecondSection;
