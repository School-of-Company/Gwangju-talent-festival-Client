"use client";

import DownArrow from "@/shared/asset/svg/DownArrow";
import { useEffect, useRef } from "react";

export default function CustomDropdown({
  value,
  max,
  isOpen,
  onToggle,
  onSelect,
  onDoubleClick,
}: {
  value: number | string;
  max: number;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: number) => void;
  onDoubleClick: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex gap-12 cursor-pointer" onClick={onToggle} onDoubleClick={onDoubleClick}>
        {value}
        <DownArrow />
      </div>

      {isOpen && (
        <div className="absolute text-center top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto min-w-[80px]">
          {Array.from({ length: max }, (_, num) => (
            <div
              key={num + 1}
              className="px-12 py-8 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => onSelect(num + 1)}
            >
              {num + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
