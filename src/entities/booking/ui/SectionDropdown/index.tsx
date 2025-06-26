"use client";

import { memo, useState, useCallback } from "react";
import { cn } from "@/shared/utils/cn";
import { Section, SectionType } from "../../model/types";

interface SectionDropdownProps {
  selectedSection: SectionType;
  onSectionSelect: (section: SectionType) => void;
  sections: readonly Section[];
  seatInfoMap: Record<Section, string>;
  className?: string;
}

export const SectionDropdown = memo<SectionDropdownProps>(
  ({ selectedSection, onSectionSelect, sections, seatInfoMap, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = useCallback(() => {
      setIsOpen(prev => !prev);
    }, []);

    const handleSectionClick = useCallback(
      (section: Section) => {
        const newSection: SectionType = selectedSection === section ? null : section;
        onSectionSelect(newSection);
        setIsOpen(false);
      },
      [selectedSection, onSectionSelect],
    );

    const handleBackdropClick = useCallback(() => {
      setIsOpen(false);
    }, []);

    return (
      <>
        {isOpen && <div className="fixed inset-0 z-10" onClick={handleBackdropClick} />}

        <div className={cn("relative", className)}>
          <button
            onClick={toggleDropdown}
            className={cn(
              "flex items-center justify-between w-full px-10 py-3 text-body2b transition-colors duration-200",
              "min-w-[400px] min-h-[48px] border-1 rounded-md",
              selectedSection
                ? "border-main-600 bg-main-50"
                : "border-gray-200 bg-white text-gray-500 hover:border-main-300",
            )}
          >
            <span className="text-caption2b mx-4 font-bold">{selectedSection || "선택하기"}</span>
            <svg
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isOpen ? "rotate-180" : "rotate-0",
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border-1 border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
              {sections.map(section => (
                <button
                  key={section}
                  onClick={() => handleSectionClick(section)}
                  className={cn(
                    "w-full px-10 py-3 text-left hover:bg-gray-50 transition-colors duration-150",
                    "first:rounded-t-lg last:rounded-b-lg",
                    selectedSection === section ? "bg-main-50 text-main-600" : "text-gray-700",
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-caption2b mx-4 font-bold">{section}</span>
                    <span className="text-caption2r mx-4 opacity-80">{seatInfoMap[section]}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </>
    );
  },
);

SectionDropdown.displayName = "SectionDropdown";

export default SectionDropdown;
