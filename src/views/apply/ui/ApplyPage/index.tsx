"use client";

import { useState, useEffect } from "react";
import { DescriptionCard } from "@/entities/apply/ui/DescriptionCard";
import Inform from "@/shared/asset/svg/Inform";
import BackHeader from "@/shared/ui/BackHeader";
import { colors } from "@/shared/utils/color";
import { FC } from "react";
import ArrowSteps from "@/widgets/apply/ui/ArrowSteps";
import ApplyForm from "@/widgets/apply/ui/ApplyForm";
import ApplyModal from "@/widgets/apply/ui/ApplyModal";

const DOCUMENT_ITEMS: string[] = [
  "참가 신청서 작성 내용이 부정확하거나 누락 시 신청 대상에서 제외",
  "영상 재생 오류 및 링크 형태(유튜브, 드라이브 등)의 영상 제출 시 신청 대상에서 제외",
  "전체 영상이 3분 초과일 경우 3분 내외의 심사용 영상에 적합한 구간으로 편집하여 제출",
  "개인정보수집이용활용동의서는 팀원 전체 개인별 작성 서명 후 스캔하여 하나의 PDF로 통합하여 대표자(학생)이 제출",
];

const INFORM_ITEMS: string[] = [
  "참가팀원(전원)은 1인 1팀으로만 신청 가능하며, 중복 참여는 불가",
  "참가(팀원 전원)신청은 관내 초·중·고등학교 재학생 및 학교밖청소년 가능합니다. 팀원 모두 2008년생 이후 출생자, 팀원 중 일부라도 대학생의 경우 신청불가, 팀원 모두 광주거주자에 한함(주민등록상)",
  "학교 밖 청소년은 소속 학교명에 '학교 밖 청소년'이라 기재하시면 됩니다.",
  "'光트로' 예선 진출 팀은 7월 3일(금) 광탈페.kr 홈페이지에 공지됩니다.",
];

export const ApplyPage: FC = () => {
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showInformModal, setShowInformModal] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      setShowDocumentModal(true);
    }
  }, []);

  const handleDocumentClose = () => {
    setShowDocumentModal(false);
    setShowInformModal(true);
  };

  return (
    <>
      <ApplyModal
        title="제출 서류"
        items={DOCUMENT_ITEMS}
        isOpen={showDocumentModal}
        onClose={handleDocumentClose}
      />
      {!showDocumentModal && (
        <ApplyModal
          title="안내사항"
          items={INFORM_ITEMS}
          isOpen={showInformModal}
          onClose={() => setShowInformModal(false)}
        />
      )}
      <div className="w-full min-h-screen flex flex-col items-center py-40 px-16">
        <div className="max-w-3xl w-full flex flex-col gap-24">
          <BackHeader text="참가 신청" />
          <div className="mobile:hidden flex flex-col gap-24">
            <DescriptionCard title="제출 서류" items={DOCUMENT_ITEMS} />
            <DescriptionCard title="안내사항" items={INFORM_ITEMS} />
          </div>

          <div className="flex items-center gap-8">
            <Inform color={colors.gray[500]} width={16} height={16} />
            <p className="text-caption1r text-gray-500">
              신청 기간: 2026. 6. 15.(월) 08:00 ~ 6. 22.(월) 18:00까지 접수분에 한함
            </p>
          </div>

          <ArrowSteps />

          <div className="mt-16">
            <ApplyForm />
          </div>
        </div>
      </div>
    </>
  );
};
