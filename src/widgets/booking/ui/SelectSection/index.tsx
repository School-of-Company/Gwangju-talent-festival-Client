"use client";

import { useState, useCallback, memo, useMemo } from "react";
import { cn } from "@/shared/utils/cn";
import { SectionButtons } from "@/entities/booking/ui/SectionButtons";
import {
  SelectSectionProps,
  SectionType,
  Section,
  SECTIONS,
  SEAT_INFO,
} from "@/entities/booking/model/types";

export const SelectSection = memo<SelectSectionProps>(({ onSectionSelect, className }) => {
  const [selectedSection, setSelectedSection] = useState<SectionType>(null);

  const handleSectionSelect = useCallback(
    (section: SectionType) => {
      setSelectedSection(section);
      onSectionSelect?.(section);
    },
    [onSectionSelect],
  );

  const seatInfoMap = useMemo(() => {
    const map: Record<Section, string> = {} as Record<Section, string>;
    SECTIONS.forEach(section => {
      const seatInfo = SEAT_INFO[section];
      map[section] = `${seatInfo.occupied}/${seatInfo.total}`;
    });
    return map;
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <SectionButtons
        selectedSection={selectedSection}
        onSectionSelect={handleSectionSelect}
        sections={SECTIONS}
        seatInfoMap={seatInfoMap}
      />
    </div>
  );
});

SelectSection.displayName = "SelectSection";

export default SelectSection;
