"use client";

import { useState, useCallback, memo, useMemo, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/shared/utils/cn";
import { SectionButtons } from "@/entities/booking/ui/SectionButtons";
import { seatQueryKeys } from "@/entities/booking/lib/useSeatState";
import {
  SectionType,
  Section,
  Seat,
  SECTIONS,
  SEAT_INFO,
  SEAT_STATUS,
} from "@/entities/booking/model/types";
import { usePrefetchSeatCaches } from "@/entities/booking/lib/useSeatState";
import { toast } from "sonner";

interface SelectSectionProps {
  onSectionSelect?: (section: SectionType) => void;
  className?: string;
}

export const SelectSection = memo<SelectSectionProps>(({ onSectionSelect, className }) => {
  const [selectedSection, setSelectedSection] = useState<SectionType>(null);
  const queryClient = useQueryClient();

  const { isLoading: isPrefetching, error: prefetchError } = usePrefetchSeatCaches();

  useEffect(() => {
    if (prefetchError) {
      console.error(prefetchError);
      toast.error("좌석 정보를 불러오는 중 오류가 발생했습니다.");
    }
  }, [prefetchError]);

  const handleSectionSelect = useCallback(
    (section: SectionType) => {
      setSelectedSection(section);
      onSectionSelect?.(section);
    },
    [onSectionSelect],
  );

  const seatInfoMap = useMemo(() => {
    const map: Record<Section, string> = {} as Record<Section, string>;

    if (isPrefetching) {
      SECTIONS.forEach(section => {
        const seatInfo = SEAT_INFO[section];
        map[section] = `${seatInfo.occupied}/${seatInfo.total}`;
      });
      return map;
    }

    SECTIONS.forEach(section => {
      const total = SEAT_INFO[section].total;

      const cachedSeats = queryClient.getQueryData<Seat[]>(seatQueryKeys.seatState(section));

      if (cachedSeats) {
        const occupied = cachedSeats.filter(seat => seat.status === SEAT_STATUS.OCCUPIED).length;
        map[section] = `${occupied}/${total}`;
      } else {
        const seatInfo = SEAT_INFO[section];
        map[section] = `${seatInfo.occupied}/${seatInfo.total}`;
      }
    });

    return map;
  }, [isPrefetching, queryClient]);

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
