"use client";

import { FC } from "react";
import { DownloadButton } from "@/entities/apply/ui/DownloadButton";
import ApplyFormSuccess from "@/entities/apply/ui/ApplyFormSuccess";
import { Input, Button, Modal } from "@/shared/ui";
import { colors } from "@/shared/utils/color";
import { FileUploadField } from "@/widgets/apply/ui/FileUploadField";
import { useApplyForm, FIELD_CONFIG, INITIAL_FILE } from "@/widgets/apply/model/useApplyForm";

export const ApplyForm: FC = () => {
  const {
    fields,
    applicationFile,
    privacyFile,
    videoFile,
    isSubmitting,
    isSubmitted,
    uploadProgress,
    previewUrl,
    previewType,
    appFileRef,
    privFileRef,
    vidFileRef,
    setApplicationFile,
    setPrivacyFile,
    setVideoFile,
    handleFieldChange,
    validateAndSetFile,
    handlePreview,
    handleClosePreview,
    handleSubmit,
  } = useApplyForm();

  if (isSubmitted) {
    return <ApplyFormSuccess />;
  }

  return (
    <>
      <Modal
        isOpen={!!previewUrl}
        onClose={handleClosePreview}
        title={previewType === "video" ? "영상 미리보기" : "PDF 미리보기"}
        className="w-[90vw] max-w-4xl"
        contentClassName="h-[70vh]"
      >
        {previewType === "video" ? (
          previewUrl && <video src={previewUrl} className="w-full h-full rounded bg-black" controls />
        ) : (
          previewUrl && <iframe src={previewUrl} className="w-full h-full rounded" />
        )}
      </Modal>

      <form onSubmit={handleSubmit} className="flex flex-col gap-40 pb-28">
        <div className="flex flex-col gap-16">
          <h2 className="text-body2b border-b border-gray-100 pb-3">서식 다운로드</h2>
          <p className="text-caption1r text-gray-400">
            아래 서식을 먼저 다운로드하여 작성한 후 파일 첨부 항목에 업로드해주세요.
          </p>
          <div className="flex flex-col gap-12">
            <div className="flex items-center justify-between px-16 py-14 rounded-xl border border-gray-100 bg-gray-50">
              <div className="flex flex-col gap-2">
                <span className="text-body3b">참가신청서</span>
                <span className="text-caption1r text-gray-400">작성 후 PDF로 변환하여 제출</span>
              </div>
              <DownloadButton
                filePath="/files/2026 광탈페 참가 신청서(서식).hwp"
                label="다운로드"
                className="!text-caption1r !text-orange-500"
                iconColor={colors.orange[500]}
              />
            </div>
            <div className="flex items-center justify-between px-16 py-14 rounded-xl border border-gray-100 bg-gray-50">
              <div className="flex flex-col gap-2">
                <span className="text-body3b">개인정보활용동의서</span>
                <span className="text-caption1r text-gray-400">
                  팀원 전체 서명 후 PDF로 통합하여 제출
                </span>
              </div>
              <DownloadButton
                filePath="/files/2026 광탈페 참가신청 개인정보제공활용 동의서.pdf"
                label="다운로드"
                className="!text-caption1r !text-orange-500"
                iconColor={colors.orange[500]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-24">
          <h2 className="text-body2b border-b border-gray-100 pb-3">참가 정보 입력</h2>
          {FIELD_CONFIG.map(({ name, label, placeholder }) => (
            <Input
              key={name}
              id={name}
              name={name}
              type="text"
              label={label}
              value={fields[name]}
              onChange={handleFieldChange}
              placeholder={placeholder}
              hideErrorSpace
            />
          ))}
        </div>

        <div className="flex flex-col gap-24">
          <h2 className="text-body2b border-b border-gray-100 pb-3">파일 첨부</h2>
          <FileUploadField
            label="참가신청서"
            badge="PDF만 가능"
            accept=".pdf"
            fileState={applicationFile}
            inputRef={appFileRef}
            isSubmitting={isSubmitting}
            placeholder="클릭하여 PDF 파일 선택"
            onPreview={handlePreview}
            onFileChange={e => validateAndSetFile("pdf", setApplicationFile, e, 4)}
            onDelete={() => {
              setApplicationFile(INITIAL_FILE);
              if (appFileRef.current) appFileRef.current.value = "";
            }}
          />
          <FileUploadField
            label="개인정보활용동의서"
            badge="PDF만 가능"
            accept=".pdf"
            fileState={privacyFile}
            inputRef={privFileRef}
            isSubmitting={isSubmitting}
            placeholder="클릭하여 PDF 파일 선택"
            onPreview={handlePreview}
            onFileChange={e => validateAndSetFile("pdf", setPrivacyFile, e, 4)}
            onDelete={() => {
              setPrivacyFile(INITIAL_FILE);
              if (privFileRef.current) privFileRef.current.value = "";
            }}
          />
          <FileUploadField
            label="공연 영상"
            badge="MP4만 가능"
            description="3분 내외로 편집하여 제출 · MOV 등 다른 형식은 접수 불가"
            accept=".mp4,video/mp4"
            fileState={videoFile}
            inputRef={vidFileRef}
            isSubmitting={isSubmitting}
            placeholder="클릭하여 MP4 파일 선택"
            onPreview={handlePreview}
            onFileChange={e => validateAndSetFile("mp4", setVideoFile, e)}
            onDelete={() => {
              setVideoFile(INITIAL_FILE);
              if (vidFileRef.current) vidFileRef.current.value = "";
            }}
          />
        </div>

        {isSubmitting && (
          <div className="flex flex-col gap-10 rounded-xl border border-orange-300 bg-orange-50 px-16 py-14">
            <p className="text-body3b text-orange-500">
              업로드가 완료될 때까지 이 페이지를 닫거나 나가지 마세요!
            </p>
            <p className="text-caption1r text-orange-400">
              영상 길이에 따라 업로드에 수 분이 걸릴 수 있어요. 페이지를 벗어나면 처음부터 다시
              제출해야 해요.
            </p>
            {uploadProgress !== null && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between text-caption1r text-gray-500">
                  <span>{uploadProgress < 100 ? "영상 업로드 중..." : "영상 처리 중..."}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-400 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
          {isSubmitting ? "접수 중..." : "참여 신청하기"}
        </Button>
      </form>
    </>
  );
};

export default ApplyForm;
