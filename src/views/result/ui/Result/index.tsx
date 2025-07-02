"use client";

import BackHeader from "@/shared/ui/BackHeader";
import { FC } from "react";
import Link from "next/link";
import { FieldSection } from "@/widgets/result/ui/FieldSection";
import { ParticipantInfo } from "@/entities/result/model/type";


const PRELIMINARY_RESULTS: ParticipantInfo[] = [
  { 순번: 1, 분야: "국악", 소속: "일신초등학교", 팀명: "구각와니", 신청자명: "장○환" },
  { 순번: 2, 분야: "연주", 소속: "동신고등학교", 신청자명: "신○" },
  { 순번: 3, 분야: "댄스", 소속: "서강중학교", 팀명: "위더스", 신청자명: "강○린" },
  { 순번: 4, 분야: "댄스", 소속: "전남여자상업고등학교", 신청자명: "김○린" },
  { 순번: 5, 분야: "댄스", 소속: "광주경신여자고등학교", 팀명: "CLEO", 신청자명: "김○원" },
  { 순번: 6, 분야: "댄스", 소속: "문산중학교", 팀명: "illusion", 신청자명: "나○인" },
  { 순번: 7, 분야: "댄스", 소속: "국제고등학교 등", 팀명: "ALL", 신청자명: "오○주" },
  { 순번: 8, 분야: "댄스", 소속: "전대사대부설고등학교", 신청자명: "이○은" },
  { 순번: 9, 분야: "댄스", 소속: "선운중학교", 팀명: "UNIVERSE", 신청자명: "최○서" },
  { 순번: 10, 분야: "밴드", 소속: "광주숭일중학교", 팀명: "원미동사람들", 신청자명: "김○영" },
  { 순번: 11, 분야: "밴드", 소속: "문성고등학교", 팀명: "사하라", 신청자명: "김○수" },
  { 순번: 12, 분야: "밴드", 소속: "광주예술고등학교", 팀명: "밴드 야간합주실", 신청자명: "김○우" },
  { 순번: 13, 분야: "밴드", 소속: "성덕고등학교", 팀명: "라온", 신청자명: "김○혁" },
  { 순번: 14, 분야: "밴드", 소속: "광주고등학교", 팀명: "167Band", 신청자명: "박○현" },
  { 순번: 15, 분야: "밴드", 소속: "광주여자고등학교", 팀명: "화양연화", 신청자명: "이○윤" },
  { 순번: 16, 분야: "밴드", 소속: "광주여자고등학교 등", 팀명: "NOTES", 신청자명: "정○현" },
  { 순번: 17, 분야: "밴드", 소속: "신가중학교", 팀명: "신가밴드", 신청자명: "홍○희" },
  { 순번: 18, 분야: "보컬", 소속: "첨단고등학교", 신청자명: "곽○영" },
  { 순번: 19, 분야: "보컬", 소속: "전대사대부설고등학교", 신청자명: "곽○희" },
  { 순번: 20, 분야: "보컬", 소속: "광주수피아여자고등학교 등", 신청자명: "구○유" },
  { 순번: 21, 분야: "보컬", 소속: "전대사대부설고등학교", 신청자명: "김○슬" },
  { 순번: 22, 분야: "보컬", 소속: "비아고등학교", 신청자명: "이○은" },
  { 순번: 23, 분야: "보컬", 소속: "광주석산고등학교", 신청자명: "임○영" },
  { 순번: 24, 분야: "보컬", 소속: "학교밖청소년", 신청자명: "정○서" },
]

export const ResultPage: FC = () => {
  const groupedResults = PRELIMINARY_RESULTS.reduce((acc, participant) => {
    if (!acc[participant.분야]) {
      acc[participant.분야] = [];
    }
    acc[participant.분야].push(participant);
    return acc;
  }, {} as Record<string, ParticipantInfo[]>);

  const fieldOrder = ["국악", "연주", "댄스", "밴드", "보컬"];

  return (
    <div className="w-full min-h-[calc(100vh-70px)] flex flex-col items-center px-4">
      <div className="max-w-4xl w-full flex flex-col gap-8 py-6">
        <BackHeader text="예선 결과" />
        
        <div className="bg-white p-8 mobile:p-6 shadow-sm border">
          <header className="flex flex-col justify-center items-center gap-8 mb-24">
            <div className="text-title4b mobile:text-body1b text-center text-gray-900">2025 광탈페 예선전 진출팀</div>
            <p className="text-body2r mobile:text-caption1r text-gray-500">오디션에 선정되신 24개 팀의 대표는 신분증을 지참하여 협의회에 참석해주세요.</p>
            <p className="text-body2r mobile:text-caption1r text-gray-500">각 팀의 대표는 사전 협의회 참석 명단을 이메일로 제출해주세요.</p>
            <Link href="/result/detail" className="text-body2b mobile:text-caption1b text-main-600 underline">협의회 참석 관련 안내 &gt;</Link>
          </header>

          <section className="space-y-28 mt-12">
            {fieldOrder.map((field) => {
              const participants = groupedResults[field] || [];
              if (participants.length === 0) return null;
              
              return (
                <FieldSection
                  key={field}
                  field={field}
                  participants={participants}
                />
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
};

