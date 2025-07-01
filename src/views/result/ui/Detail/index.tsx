"use client";

import { DescriptionCard } from "@/entities/apply/ui/DescriptionCard";
import Inform from "@/shared/asset/svg/Inform";
import { colors } from "@/shared/utils/color";
import { FC, ReactNode } from "react";
import EmailButtons from "@/widgets/apply/ui/EmailButtons";
import { DownloadButton } from "@/entities/apply/ui/DownloadButton";
import { Map } from "@/entities/home/ui/Map"

type DocumentItem = string;
type MethodItem = string;
type InformItem = string;

const DOCUMENT_ITEMS: DocumentItem[] = [
  "일시: 2025.07.16(수) 17:00~18:00",
  "대상: 예선 진출 24개팀 대표 (팀당 1명 필참, 사진학생증(신분증)지참)",
  "장소: 광주예술누리터 꿈이룸관 (2층)",
] as const;

const METHOD_ITEMS: MethodItem[] = [
  "예선팀 사전 협의회 참석 명단 제출",
  "메일 제출: artist90@korea.kr",
  "제출 내용: 분야_대표자명(학교명, 핸드폰 번호)_팀명_사전 협의회 참석자명(학교명)",
  "예시) 댄스_김가나(다라고, 010-0000-0000)_마바팀_김가나(다라고)",
] as const;

const INFORM_ITEMS: InformItem[] = [
  "2025 광탈페(광주학생탈렌트페스티벌) 예선(오디션) 운영 전반 사항 안내",
  "예선 참여 곡명 및 무대 지원 필요 사항 등",
  "팀 당 1곡 6분 이내로 제한(6분 초과 시 중단시킬 수 있음, 6분을 2곡 2팀으로 나누는 것 불가)",
  "팀 소개 관련 자료 수합 안내(사진, 팀 소개, 연주곡 소개 등)",
];

export const ResultDetailPage: FC = () => {
  const renderMethodItem = (item: MethodItem, index: number): ReactNode => {
    if (index === 0) {
      const [mainText, emailText] = item.split("(");
      return (
        <>
          {mainText}
          <span className="block ml-5">({emailText}</span>
        </>
      );
    }
    return item;
  };

  return (
    <div className="w-full min-h-{calc(100vh-20px)}] flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full flex flex-col gap-10">
        <DescriptionCard
          title="예선팀 대표 사전 협의회 참석 안내"
          items={DOCUMENT_ITEMS}
        />
        <Map latitude={35.150653} longitude={126.918134} className="rounded-md mb-0"/>
        <DescriptionCard
          title="예선팀 대표 사전 협의회 내용"
          items={INFORM_ITEMS}
          renderCustomItem={renderMethodItem}
        />
        <DescriptionCard title="협조 사항" items={METHOD_ITEMS} />

        <div className="flex items-center gap-2 ml-2 py-10">
          <Inform color={colors.gray[500]} />
          <p className="text-gray-500">
            제출 기간: 2025.07.08(화) 13:00까지
          </p>
        </div>

        <DownloadButton
          filePath="/files/광탈페_예선팀_대표_사전_협의회_안내문.pdf"
          label="참석 안내문 다운로드"
        />

        <EmailButtons className="pt-28" />
      </div>
    </div>
  );
};
