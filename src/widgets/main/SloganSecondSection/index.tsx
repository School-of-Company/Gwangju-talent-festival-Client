"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import PrizeItem from "@/entities/home/ui/PrizeItem";
import SloganMarquee from "@/entities/home/ui/SloganMarquee";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { formatDate } from "@/shared/utils/formatDate";
import { sloganStartDate, sloganEndDate, isSloganEnded } from "@/shared/config/dateConfig";
import { ArrowBack } from "@/shared/asset/svg/ArrowBack";

const SLOGAN_YEAR = sloganStartDate.getFullYear();
const submissionPeriodText = `공모기간 : ${SLOGAN_YEAR}.${formatDate(sloganStartDate)}~${formatDate(sloganEndDate)}`;

const SloganSecondSection = () => {
  const router = useRouter();

  const [isSloganPeriod, setIsSloganPeriod] = useState(() => {
    const now = new Date();
    return now >= sloganStartDate && now <= sloganEndDate;
  });
  const [sloganEnded, setSloganEnded] = useState(isSloganEnded);
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setIsSloganPeriod(now >= sloganStartDate && now <= sloganEndDate);
      setSloganEnded(isSloganEnded());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="SloganSecondSection" className={cn("w-full mt-[3.5rem] mobile:mt-20 text-center")}>
      <SectionTitle
        title={
          sloganEnded
            ? `${SLOGAN_YEAR} 광탈페 슬로건 접수마감 되었습니다`
            : `${SLOGAN_YEAR} 광탈페 슬로건 공모예정`
        }
        description={
          <>
            <span className="text-black text-body2b">
              세상의 무대 위, 광탈페! 너의 꿈이 시작되는 순간!
            </span>
            <span className={cn("block")}>
              {SLOGAN_YEAR}년 모두가 주인공이 되는 광주학생탈렌트페스티벌의 꿈의 무대가 펼쳐집니다.
            </span>
          </>
        }
      />

      <SloganMarquee />

      {/* <div className={cn("flex flex-col items-center p-6 bg-white my-30")}>
        <div className={cn("flex justify-center items-center gap-[40px]")}>
          <PrizeItem key={PRIZES[1].rank} {...PRIZES[1]} />
          <PrizeItem key={PRIZES[0].rank} {...PRIZES[0]} />
          <PrizeItem key={PRIZES[2].rank} {...PRIZES[2]} />
        </div>
      </div> */}
      <Button
        type="button"
        onClick={() => router.push("/slogan")}
        className={cn("mobile:mb-[12px] px-28 mt-[54px] mb-[10px] rounded-lg")}
        disabled={!isSloganPeriod}
      >
        <span className={cn("text-body3b px-[60px] mobile:text-body3b flex items-center gap-10")}>
          {isSloganPeriod ? "슬로건 공모하러가기" : "공모기간이 아닙니다"}{" "}
          <ArrowBack color={isSloganPeriod ? "white" : "#1F2937"} />
        </span>
      </Button>

      <div className={cn("text-caption1r mobile:text-caption2r text-gray-400")}>
        {submissionPeriodText}
      </div>
    </section>
  );
};

export default SloganSecondSection;
