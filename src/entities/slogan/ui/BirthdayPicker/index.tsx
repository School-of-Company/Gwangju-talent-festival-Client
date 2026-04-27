"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { cn } from "@/shared/utils/cn";

type BirthdayPickerProps = {
  value: string;
  onSelect: (date: Date | undefined) => void;
  onBlur?: () => void;
  error?: string;
};

const formatDisplay = (dateStr: string) => dateStr;

const BirthdayPicker = ({ value, onSelect, onBlur, error }: BirthdayPickerProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const selectedDate = value ? new Date(value) : undefined;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (openRef.current) {
          onBlur?.();
        }
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      onSelect(date);
      setOpen(false);
    },
    [onSelect],
  );

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className={cn(
          "w-full text-left rounded-md px-16 h-[50px] border border-gray-100 text-body3r",
          value ? "text-gray-900" : "text-gray-400",
        )}
      >
        {value ? formatDisplay(value) : "생년월일을 선택해주세요"}
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-4 z-20 bg-white shadow-xl rounded-lg">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            locale={ko}
            captionLayout="dropdown"
            defaultMonth={selectedDate ?? new Date()}
            style={{ "--rdp-accent-color": "#FF9644" } as React.CSSProperties}
          />
        </div>
      )}
      {error && (
        <p className="text-caption1r h-[0.75rem] leading-none text-red-500 mt-8">{error}</p>
      )}
    </div>
  );
};

export default BirthdayPicker;
