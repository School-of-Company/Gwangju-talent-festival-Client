"use client";

import { FC, useRef, useState, ChangeEvent, FormEvent } from "react";
import { DownloadButton } from "@/entities/apply/ui/DownloadButton";
import { postApply } from "@/entities/apply/api/postApply";
import ApplyFormSuccess from "@/entities/apply/ui/ApplyFormSuccess";
import { Input, Button, Modal } from "@/shared/ui";
import { colors } from "@/shared/utils/color";
import { toast } from "sonner";

interface FileState {
  file: File | null;
  error: string;
}

interface FileActionButtonsProps {
  onPreview: () => void;
  onDelete: () => void;
}

const FileActionButtons = ({ onPreview, onDelete }: FileActionButtonsProps) => (
  <div className="flex gap-8">
    <button
      type="button"
      onClick={onPreview}
      className="border-0 text-caption1r text-white bg-orange-400 rounded-md px-12 py-6 cursor-pointer hover:bg-orange-500 transition-colors shrink-0"
    >
      미리보기
    </button>
    <button
      type="button"
      onClick={onDelete}
      className="border-0 text-caption1r text-gray-500 bg-white rounded-md px-12 py-6 cursor-pointer hover:bg-gray-50 transition-colors shrink-0"
    >
      삭제
    </button>
  </div>
);

interface FormFields {
  field: string;
  teamName: string;
  school: string;
  representative: string;
  contact: string;
}

const FIELD_CONFIG: readonly { name: keyof FormFields; label: string; placeholder: string }[] = [
  { name: "field", label: "분야 (댄스, 보컬, 밴드, 연주, 국악 등)", placeholder: "예: 댄스" },
  { name: "teamName", label: "팀명", placeholder: "예: 빛나라" },
  { name: "school", label: "대표자 학교", placeholder: "예: 한국중" },
  { name: "representative", label: "대표자 이름", placeholder: "예: 홍길동" },
  { name: "contact", label: "연락처", placeholder: "예: 01012345678" },
] as const;

const INITIAL_FIELDS: FormFields = {
  field: "",
  teamName: "",
  school: "",
  representative: "",
  contact: "",
};

const INITIAL_FILE: FileState = { file: null, error: "" };

export const ApplyForm: FC = () => {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [applicationFile, setApplicationFile] = useState<FileState>(INITIAL_FILE);
  const [privacyFile, setPrivacyFile] = useState<FileState>(INITIAL_FILE);
  const [videoFile, setVideoFile] = useState<FileState>(INITIAL_FILE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"pdf" | "video">("pdf");

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video/") ? "video" : "pdf";
    if (window.matchMedia("(max-width: 640px)").matches) {
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } else {
      setPreviewType(type);
      setPreviewUrl(url);
    }
  };

  const handleClosePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const appFileRef = useRef<HTMLInputElement>(null);
  const privFileRef = useRef<HTMLInputElement>(null);
  const vidFileRef = useRef<HTMLInputElement>(null);

  if (isSubmitted) {
    return <ApplyFormSuccess />;
  }

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitized = value;

    if (name === "representative") {
      sanitized = value.replace(/[0-9]/g, "");
    } else if (name === "contact") {
      sanitized = value.replace(/[^0-9]/g, "").slice(0, 11);
    }

    setFields(prev => ({ ...prev, [name]: sanitized }));
  };

  const validateAndSetFile = (
    acceptedExt: string,
    setter: (state: FileState) => void,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (ext !== acceptedExt) {
      setter({ file: null, error: `${acceptedExt.toUpperCase()} 파일만 제출 가능합니다.` });
      e.target.value = "";
      return;
    }
    setter({ file, error: "" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { field, teamName, school, representative, contact } = fields;

    if (!field || !teamName || !school || !representative || !contact) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }
    if (!/^01[0-9]{9}$/.test(contact)) {
      toast.error("연락처는 하이픈 없이 11자리 숫자로 입력해주세요. 예: 01012341234");
      return;
    }
    if (!applicationFile.file) {
      toast.error("참가신청서를 첨부해주세요.");
      return;
    }
    if (!privacyFile.file) {
      toast.error("개인정보활용동의서를 첨부해주세요.");
      return;
    }
    if (!videoFile.file) {
      toast.error("공연 영상을 첨부해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await postApply({
        field,
        teamName,
        school,
        representative,
        contact,
        applicationFile: applicationFile.file,
        privacyFile: privacyFile.file,
        videoFile: videoFile.file,
      });
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "전송 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <video src={previewUrl ?? ""} className="w-full h-full rounded bg-black" controls />
        ) : (
          <iframe src={previewUrl ?? ""} className="w-full h-full rounded" />
        )}
      </Modal>

      <form onSubmit={handleSubmit} className="flex flex-col gap-40 pb-28">
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

          {/* 참가신청서 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-body3b">참가신청서</span>
              <span className="text-caption1r bg-orange-100 text-orange-500 px-8 py-2 rounded-md font-medium">
                PDF만 가능
              </span>
              <DownloadButton
                filePath="/files/2026 광탈페 참가 신청서(서식).hwp"
                label="참가신청서 다운로드"
                className="!text-caption1r !text-orange-500"
                iconColor={colors.orange[500]}
              />
            </div>
            {applicationFile.file ? (
              <div className="w-full h-[50px] rounded-md border border-orange-500 bg-orange-50 px-16 flex items-center gap-8">
                <span className="text-body3r text-orange-500 flex-1 truncate min-w-0">✓ {applicationFile.file.name}</span>
                <FileActionButtons
                  onPreview={() => handlePreview(applicationFile.file!)}
                  onDelete={() => { setApplicationFile(INITIAL_FILE); if (appFileRef.current) appFileRef.current.value = ""; }}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => appFileRef.current?.click()}
                className="w-full h-[50px] rounded-md border border-dashed border-gray-200 text-body3r text-gray-400 cursor-pointer hover:border-orange-300 transition-colors"
              >
                클릭하여 PDF 파일 선택
              </button>
            )}
            {applicationFile.error && (
              <p className="text-caption1r text-red-500">{applicationFile.error}</p>
            )}
            <input
              ref={appFileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={e => validateAndSetFile("pdf", setApplicationFile, e)}
            />
          </div>

          {/* 개인정보활용동의서 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-body3b">개인정보활용동의서</span>
              <span className="text-caption1r bg-orange-100 text-orange-500 px-8 py-2 rounded-md font-medium">
                PDF만 가능
              </span>
              <DownloadButton
                filePath="/files/2026 광탈페 참가신청 개인정보제공활용 동의서.pdf"
                label="개인정보활용동의서 다운로드"
                className="!text-caption1r !text-orange-500"
                iconColor={colors.orange[500]}
              />
            </div>
            {privacyFile.file ? (
              <div className="w-full h-[50px] rounded-md border border-orange-500 bg-orange-50 px-16 flex items-center gap-8">
                <span className="text-body3r text-orange-500 flex-1 truncate min-w-0">✓ {privacyFile.file.name}</span>
                <FileActionButtons
                  onPreview={() => handlePreview(privacyFile.file!)}
                  onDelete={() => { setPrivacyFile(INITIAL_FILE); if (privFileRef.current) privFileRef.current.value = ""; }}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => privFileRef.current?.click()}
                className="w-full h-[50px] rounded-md border border-dashed border-gray-200 text-body3r text-gray-400 cursor-pointer hover:border-orange-300 transition-colors"
              >
                클릭하여 PDF 파일 선택
              </button>
            )}
            {privacyFile.error && (
              <p className="text-caption1r text-red-500">{privacyFile.error}</p>
            )}
            <input
              ref={privFileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={e => validateAndSetFile("pdf", setPrivacyFile, e)}
            />
          </div>

          {/* 공연 영상 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-body3b">공연 영상</span>
              <span className="text-caption1r bg-orange-100 text-orange-500 px-8 py-2 rounded-md font-medium">
                MP4만 가능
              </span>
            </div>
            <p className="text-caption1r text-gray-400">
              3분 내외로 편집하여 제출 · MOV 등 다른 형식은 접수 불가
            </p>
            {videoFile.file ? (
              <div className="w-full h-[50px] rounded-md border border-orange-500 bg-orange-50 px-16 flex items-center gap-8">
                <span className="text-body3r text-orange-500 flex-1 truncate min-w-0">✓ {videoFile.file.name}</span>
                <FileActionButtons
                  onPreview={() => handlePreview(videoFile.file!)}
                  onDelete={() => { setVideoFile(INITIAL_FILE); if (vidFileRef.current) vidFileRef.current.value = ""; }}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => vidFileRef.current?.click()}
                className="w-full h-[50px] rounded-md border border-dashed border-gray-200 text-body3r text-gray-400 cursor-pointer hover:border-orange-300 transition-colors"
              >
                클릭하여 MP4 파일 선택
              </button>
            )}
            {videoFile.error && (
              <p className="text-caption1r text-red-500">{videoFile.error}</p>
            )}
            <input
              ref={vidFileRef}
              type="file"
              accept=".mp4,video/mp4"
              className="hidden"
              onChange={e => validateAndSetFile("mp4", setVideoFile, e)}
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
          {isSubmitting ? "접수 중..." : "참여 신청하기"}
        </Button>
      </form>
    </>
  );
};

export default ApplyForm;
