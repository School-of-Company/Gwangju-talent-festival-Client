"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import { RightArrow } from "@/shared/asset/svg/RightArrow";
import { isApplyPeriod, isApplyEnded } from "@/shared/config/dateConfig";

const FLOW_TEXT =
  "온·오프라인 참여 홍보 및 신청 접수 → 1차 영상 심사 및 光트로(예선) 참가팀 선정 → 光트로 참가팀 사전 협의 및 안내";

const ApplyThirdSection = () => {
  const router = useRouter();

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [applyEnded, setApplyEnded] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsApplyOpen(isApplyPeriod());
      setApplyEnded(isApplyEnded());
    };
    check();
    const timer = setInterval(check, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="ApplyThirdSection" className={cn("relative w-full overflow-hidden bg-orange-200")}>
      {/* 배경 커브 — 좌하단 */}
      <svg
        width="429"
        height="439"
        viewBox="0 0 429 439"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0 pointer-events-none select-none h-full w-auto mobile:hidden"
        aria-hidden="true"
      >
        <path
          d="M106.371 439C106.371 439 129.42 306.264 316.546 187.72C467.979 91.7876 449.697 1.38997 360.379 1.11389C360.379 1.11389 153.601 0.997719 0 -4.70441e-06L2.38886e-06 439L106.371 439Z"
          fill="#FFCE99"
        />
      </svg>

      {/* 배경 커브 — 우상단 */}
      <svg
        width="396"
        height="439"
        viewBox="0 0 396 439"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 top-0 pointer-events-none select-none h-full w-auto mobile:hidden"
        aria-hidden="true"
      >
        <path
          d="M333.796 0C351.835 68.889 410.893 178.39 174.936 207.06C-61.0213 235.729 -3.60242 388.221 37.3941 439H458V0H333.796Z"
          fill="#FFCE99"
        />
      </svg>

      {/* 좌측 데코 — 와이드 데스크탑에서만 표시 */}
      <div className="absolute left-[5%] top-0 pointer-events-none select-none mobile:hidden tablet:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/apply-deco-left.png"
          alt=""
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>

      {/* 우측 데코 — 와이드 데스크탑에서만 표시 */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none select-none mobile:hidden tablet:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/apply-deco-right.png"
          alt=""
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>

      {/* 모바일 좌상단 데코 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/apply-deco-left.png"
        alt=""
        width={120}
        height={120}
        className="absolute left-0 top-0 pointer-events-none select-none hidden mobile:block w-[120px] h-auto"
      />

      {/* 모바일 우하단 데코 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/apply-deco-right.png"
        alt=""
        width={120}
        height={120}
        className="absolute right-0 bottom-0 pointer-events-none select-none hidden mobile:block w-[120px] h-auto"
      />

      {/* 본문 */}
      <div className="relative z-10 flex flex-col items-center text-center py-[80px] mobile:py-[52px] px-[80px] tablet:px-[40px] mobile:px-16 gap-24 mobile:gap-16">
        <h2 className="text-title2b tablet:text-title4b mobile:text-body1b text-black">2026 광탈페 참가신청</h2>

        <p className="text-body3r tablet:text-body3r mobile:text-body3r text-gray-700">
          신청기간 : 2026.6.15(월) 08:00 ~ 6.22(월) 18:00
        </p>

        <p className="text-caption1r mobile:text-caption1r text-gray-700 w-full leading-[180%] break-keep">
          {FLOW_TEXT}
        </p>

        {applyEnded ? (
          <div className="flex flex-col items-center gap-12 bg-white/70 backdrop-blur-sm rounded-2xl px-40 py-28 mobile:px-20 mobile:py-20 w-full max-w-[480px]">
            <span className="inline-flex items-center gap-6 bg-orange-500 text-white text-caption1b rounded-full px-14 py-4">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5.5" stroke="white" />
                <path d="M6 3.5V6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="6" cy="8.5" r="0.75" fill="white" />
              </svg>
              신청 마감
            </span>
            <p className="text-body2b mobile:text-body3b text-gray-900 leading-snug text-center break-keep">
              신청이 마감되었습니다
            </p>
            <div className="flex flex-col gap-6 items-center">
              <p className="text-body3r mobile:text-caption1r text-gray-700 text-center">
                현재 영상 심사가 진행 중입니다
              </p>
              <p className="text-body3r mobile:text-caption1r text-orange-500 font-semibold text-center break-keep">
                7월 3일(금) 예선 진출팀 발표 예정
              </p>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => router.push("/apply")}
            disabled={!isApplyOpen}
            className="px-28 rounded-lg mobile:w-full"
          >
            <span className="text-body3b flex items-center justify-center gap-10 px-[60px] mobile:px-0 mobile:w-full">
              {isApplyOpen ? "신청하러 가기" : "신청기간이 아닙니다"}
              {isApplyOpen && <RightArrow color="white" />}
            </span>
          </Button>
        )}

      </div>
    </section>
  );
};

export default ApplyThirdSection;
