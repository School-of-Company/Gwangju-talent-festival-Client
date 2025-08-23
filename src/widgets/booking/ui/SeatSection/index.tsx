"use client";

import { memo } from "react";
import { cn } from "@/shared/utils/cn";
import { Section, Seat, SelectedSeatInfo } from "@/entities/booking/model/types";
import { SeatGrid } from "@/entities/booking/ui/SeatGrid";
import { SelectedSeatDisplay } from "@/entities/booking/ui/SelectedSeatDisplay";
import { useSectionSeatState } from "@/entities/booking/lib/useSeatState";
import { getSeatLayout } from "@/entities/booking/model/seatLayouts";
import { SEAT_STATUS } from "@/entities/booking/model/types";

interface SeatSectionProps {
  selectedSection: Section | null;
  selectedSeat: Seat | null;
  onSeatSelect: (seat: Seat | null) => void;
  selectedSeatInfo: SelectedSeatInfo | null;
  className?: string;
}

export const SeatSection = memo<SeatSectionProps>(
  ({ selectedSection, selectedSeat, onSeatSelect, selectedSeatInfo, className }) => {
    const { data: sectionSeats, isLoading, error } = useSectionSeatState(selectedSection!);

    const getLayout = () => {
      if (selectedSection) {
        const getFallbackSeats = () => {
          const layout = getSeatLayout(selectedSection);
          return layout.seats.map(seat => ({
            ...seat,
            status: SEAT_STATUS.UNAVAILABLE,
          }));
        };

        return {
          section: selectedSection,
          seats: sectionSeats || getFallbackSeats(),
        };
      }

      return null;
    };

    const layout = getLayout();

    return (
      <div className={cn("pb-20", className)}>
        <div className="h-80">
          <SeatGrid
            layout={layout}
            selectedSeat={selectedSeat}
            onSeatSelect={isLoading || !!error ? () => {} : onSeatSelect}
          />
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
