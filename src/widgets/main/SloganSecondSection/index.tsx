"use client";

import { useState, useEffect } from "react";
import SloganMarquee from "@/entities/home/ui/SloganMarquee";
import { cn } from "@/shared/utils/cn";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { sloganStartDate, sloganEndDate, isSloganEnded } from "@/shared/config/dateConfig";

// import { formatDate } from "@/shared/utils/formatDate";
// import Button from "@/shared/ui/Button";
// import { useRouter } from "next/navigation";
// import { ArrowBack } from "@/shared/asset/svg/ArrowBack";

const SLOGAN_YEAR = sloganStartDate.getFullYear();
// const submissionPeriodText = `공모기간 : ${SLOGAN_YEAR}.${formatDate(sloganStartDate)}~${formatDate(sloganEndDate)}`;

const SloganSecondSection = () => {
  // const router = useRouter();

  const [isSloganPeriod, setIsSloganPeriod] = useState(() => {
    const now = new Date();
    return now >= sloganStartDate && now <= sloganEndDate;
  });
  const [sloganEnded, setSloganEnded] = useState(false);
  useEffect(() => {
    setSloganEnded(isSloganEnded());
    const timer = setInterval(() => {
      const now = new Date();
      setIsSloganPeriod(now >= sloganStartDate && now <= sloganEndDate);
      setSloganEnded(isSloganEnded());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="SloganSecondSection"
      className={cn("w-full mt-[3.5rem] mobile:mt-20 pb-[40px] mobile:pb-[24px] text-center")}
    >
      <SectionTitle
        title={
          sloganEnded
            ? `${SLOGAN_YEAR} 광탈페 슬로건 접수마감 되었습니다`
            : `${SLOGAN_YEAR} 광탈페 슬로건 ${isSloganPeriod ? "공모중" : "공모예정"}`
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

      {/* <Button
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
      </div> */}

      <div className={cn("mt-[54px] mb-[10px] flex flex-col items-center gap-8")}>
        <p className={cn("text-body2b mobile:text-body3b text-gray-700")}>
          공모 접수내용에 대해 심사중입니다.
        </p>
        <p className={cn("text-body3r text-gray-700")}>결과발표 : 2026. 6. 9.(예정)</p>
      </div>
    </section>
  );
};

export default SloganSecondSection;
