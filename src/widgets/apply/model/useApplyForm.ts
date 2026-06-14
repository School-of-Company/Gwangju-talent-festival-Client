"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import { postApply } from "@/entities/apply/api/postApply";
import { toast } from "sonner";

export interface FileState {
  file: File | null;
  error: string;
}

export interface FormFields {
  field: string;
  teamName: string;
  school: string;
  representative: string;
  contact: string;
}

export const FIELD_CONFIG: readonly { name: keyof FormFields; label: string; placeholder: string }[] =
  [
    { name: "field", label: "분야 (댄스, 보컬, 밴드, 연주, 국악 등)", placeholder: "예: 댄스" },
    { name: "teamName", label: "팀명", placeholder: "예: 빛나라" },
    { name: "school", label: "대표자 학교", placeholder: "예: 한국중" },
    { name: "representative", label: "대표자 이름", placeholder: "예: 홍길동" },
    { name: "contact", label: "연락처", placeholder: "예: 01012345678" },
  ] as const;

export const INITIAL_FILE: FileState = { file: null, error: "" };

const INITIAL_FIELDS: FormFields = {
  field: "",
  teamName: "",
  school: "",
  representative: "",
  contact: "",
};

export const useApplyForm = () => {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [applicationFile, setApplicationFile] = useState<FileState>(INITIAL_FILE);
  const [privacyFile, setPrivacyFile] = useState<FileState>(INITIAL_FILE);
  const [videoFile, setVideoFile] = useState<FileState>(INITIAL_FILE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"pdf" | "video">("pdf");

  const appFileRef = useRef<HTMLInputElement>(null);
  const privFileRef = useRef<HTMLInputElement>(null);
  const vidFileRef = useRef<HTMLInputElement>(null);

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
    e: ChangeEvent<HTMLInputElement>,
    maxSizeMB?: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (ext !== acceptedExt) {
      setter({ file: null, error: `${acceptedExt.toUpperCase()} 파일만 제출 가능합니다.` });
      e.target.value = "";
      return;
    }
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setter({ file: null, error: `파일 크기는 최대 ${maxSizeMB}MB 이하여야 합니다.` });
      e.target.value = "";
      return;
    }
    setter({ file, error: "" });
  };

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video/") ? "video" : "pdf";
    if (window.matchMedia("(max-width: 640px)").matches) {
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } else {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewType(type);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleClosePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
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
      await postApply(
        {
          field,
          teamName,
          school,
          representative,
          contact,
          applicationFile: applicationFile.file,
          privacyFile: privacyFile.file,
          videoFile: videoFile.file,
        },
        setUploadProgress,
      );
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "전송 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  return {
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
  };
};
