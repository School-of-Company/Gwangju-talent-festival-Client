"use client";

import { ChangeEvent } from "react";
import { FileState } from "@/widgets/apply/model/useApplyForm";

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

interface FileUploadFieldProps {
  label: string;
  badge: string;
  description?: string;
  accept: string;
  fileState: FileState;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isSubmitting: boolean;
  placeholder: string;
  onPreview: (file: File) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

export const FileUploadField = ({
  label,
  badge,
  description,
  accept,
  fileState,
  inputRef,
  isSubmitting,
  placeholder,
  onPreview,
  onFileChange,
  onDelete,
}: FileUploadFieldProps) => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-body3b">{label}</span>
      <span className="text-caption1r bg-orange-100 text-orange-500 px-8 py-2 rounded-md font-medium">
        {badge}
      </span>
    </div>
    {description && <p className="text-caption1r text-gray-400">{description}</p>}
    {fileState.file ? (
      <div className="w-full h-[50px] rounded-md border border-orange-500 bg-orange-50 px-16 flex items-center gap-8">
        <span className="text-body3r text-orange-500 flex-1 truncate min-w-0">
          ✓ {fileState.file.name}
        </span>
        {!isSubmitting && (
          <FileActionButtons onPreview={() => onPreview(fileState.file!)} onDelete={onDelete} />
        )}
      </div>
    ) : (
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full h-[50px] rounded-md border border-dashed border-gray-200 text-body3r text-gray-400 cursor-pointer hover:border-orange-300 transition-colors"
      >
        {placeholder}
      </button>
    )}
    {fileState.error && <p className="text-caption1r text-red-500">{fileState.error}</p>}
    <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onFileChange} />
  </div>
);

export default FileUploadField;
