"use client";

import { cn } from "@/shared/utils/cn";
import BackHeader from "@/shared/ui/BackHeader";

type Team = {
  id: number;
  name: string;
  representative: string;
  school: string;
};

const PRELIMINARY_TEAMS: Team[] = [
  { id: 1, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 2, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 3, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 4, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 5, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 6, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 7, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 8, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 9, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 10, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 11, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 12, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 13, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 14, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 15, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 16, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 17, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 18, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 19, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 20, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 21, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 22, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 23, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
  { id: 24, name: "스타트업", representative: "박준민", school: "광주소프트웨어마이스터고" },
];

const maskName = (name: string) => {
  if (name.length <= 1) return name;
  if (name.length === 2) return name[0] + "*";
  return name[0] + "*" + name[name.length - 1];
};

const PreliminaryResultView = () => {
  return (
    <main className={cn("min-h-screen bg-white")}>
      <div className={cn("max-w-[900px] mx-auto px-[5%] pb-80 mobile:pb-52")}>
        <BackHeader text="예선 진출팀" goto="/home" />

        {/* 헤더 */}
        <div className={cn("flex flex-col items-center text-center gap-16 py-40 mobile:py-28")}>
          <h1 className={cn("text-title2b mobile:text-h4b text-black")}>
            2026 광탈페 예선 진출팀
          </h1>
          <div className={cn("flex flex-col gap-6 text-body3r mobile:text-caption1r text-gray-600")}>
            <p>오디션에 선정되신 <strong className="text-orange-500">24개 팀</strong>의 대표는 신분증을 지참하여 협의회에 참석해주세요.</p>
            <p>각 팀의 대표는 사전 협의회 참석 명단을 이메일로 제출해주세요.</p>
            <p>진출하신 모든 팀을 진심으로 축하드립니다.</p>
          </div>
          <a
            href="#"
            className={cn(
              "inline-flex items-center gap-4 text-body3b mobile:text-caption1b text-orange-500",
              "underline underline-offset-4 hover:text-orange-400 transition-colors duration-200",
            )}
          >
            협의회 참석 관련 안내 →
          </a>
        </div>

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-gray-100 mb-40 mobile:mb-28" />

        {/* 팀 카드 그리드 */}
        <div className={cn("grid grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-2 gap-14 mobile:gap-8")}>
          {PRELIMINARY_TEAMS.map((team) => (
            <div
              key={team.id}
              className={cn(
                "relative overflow-hidden rounded-2xl p-24 mobile:p-16",
                "bg-gradient-to-br from-orange-50 to-white",
                "border border-orange-100",
              )}
            >
              {/* 배경 워터마크 번호 */}
              <span
                className="absolute -bottom-10 -right-4 text-[80px] mobile:text-[60px] font-bold text-orange-200 leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                {String(team.id).padStart(2, "0")}
              </span>

              {/* 콘텐츠 */}
              <div className={cn("relative z-10 flex flex-col gap-10 mobile:gap-8")}>
                <span className={cn("text-caption2b text-orange-400")}>
                  {String(team.id).padStart(2, "0")}
                </span>
                <div className={cn("flex flex-col gap-4")}>
                  <p className={cn("text-body3b mobile:text-caption1b text-black break-keep leading-snug")}>
                    {team.name}
                    <span className={cn("ml-6 text-caption1r mobile:text-caption2r text-gray-400 font-normal")}>
                      ({maskName(team.representative)})
                    </span>
                  </p>
                  <p className={cn("text-caption2r text-gray-400 break-keep")}>{team.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default PreliminaryResultView;
