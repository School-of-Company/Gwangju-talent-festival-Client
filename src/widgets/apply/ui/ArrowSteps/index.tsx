import { FC } from "react";

interface StepData {
  num: string;
  lines: string[];
  bg: string;
  fg: string;
}

const STEPS: readonly StepData[] = [
  { num: "01", lines: ["참가 신청서", "작성"],                    bg: "#FFEAD4", fg: "#4E4E4E" },
  { num: "02", lines: ["개인정보수집이용", "활용동의서 작성"],      bg: "#FFCE99", fg: "#383838" },
  { num: "03", lines: ["공연영상 제작", "3분 내외, MP4"],          bg: "#FFAD6D", fg: "#FFFFFF" },
  { num: "04", lines: ["홈페이지에서", "파일 제출"],               bg: "#FF9644", fg: "#FFFFFF" },
] as const;

interface ArrowStepsProps {
  className?: string;
}

const ArrowSteps: FC<ArrowStepsProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      {/* 데스크탑 */}
      <div className="hidden md:flex items-start justify-between py-28 relative">
        <div
          className="absolute h-[2px] bg-orange-200"
          style={{ top: 50, left: "calc(12.5%)", right: "calc(12.5%)" }}
        />
        {STEPS.map(({ num, lines, bg, fg }) => (
          <div key={num} className="flex flex-col items-center z-10 w-1/4 gap-12">
            <div
              className="w-44 h-44 rounded-full flex items-center justify-center text-caption1b font-bold shrink-0 shadow-sm"
              style={{ backgroundColor: bg, color: fg }}
            >
              {num}
            </div>
            <p className="text-caption1b text-center text-gray-700 leading-[1.6]">
              {lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* 모바일 */}
      <div className="flex md:hidden flex-col py-28 gap-0">
        {STEPS.map(({ num, lines, bg, fg }, i) => (
          <div key={num} className="flex items-start gap-16">
            <div className="flex flex-col items-center shrink-0">
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center text-caption2b font-bold"
                style={{ backgroundColor: bg, color: fg }}
              >
                {num}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-[2px] h-20 bg-orange-200" />
              )}
            </div>
            <p className="text-body3r text-gray-700 mt-8">
              {lines.join(" ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrowSteps;
