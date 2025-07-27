"use client";

import { memo, useMemo } from "react";
import { cn } from "@/shared/utils/cn";
import { Section, Seat, SelectedSeatInfo } from "@/entities/booking/model/types";
import { SeatGrid } from "@/entities/booking/ui/SeatGrid";
import { SelectedSeatDisplay } from "@/entities/booking/ui/SelectedSeatDisplay";
import { getSeatLayout } from "@/entities/booking/model/seatLayouts";

interface SeatSectionProps {
  selectedSection: Section | null;
  selectedSeat: Seat | null;
  onSeatSelect: (seat: Seat | null) => void;
  selectedSeatInfo: SelectedSeatInfo | null;
  className?: string;
}

export const SeatSection = memo<SeatSectionProps>(
  ({ selectedSection, selectedSeat, onSeatSelect, selectedSeatInfo, className }) => {
    const seatLayout = useMemo(() => {
      if (!selectedSection) return null;
      return getSeatLayout(selectedSection);
    }, [selectedSection]);

    return (
      <div className={cn("pb-20", className)}>
        <div className="h-80">
          <SeatGrid layout={seatLayout} selectedSeat={selectedSeat} onSeatSelect={onSeatSelect} />
        </div>
        
        <div className="h-28"></div>
        
        <div className="h-24">
          <SelectedSeatDisplay selectedSeat={selectedSeatInfo} selectedSection={selectedSection} />
        </div>
      </div>
    );
  },
);

SeatSection.displayName = "SeatSection";

export default SeatSection;
