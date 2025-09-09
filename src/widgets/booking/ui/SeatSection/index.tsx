"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { Section, Seat, SelectedSeatInfo, SEAT_STATUS } from "@/entities/booking/model/types";
import { SeatGrid } from "@/entities/booking/ui/SeatGrid";
import { SelectedSeatDisplay } from "@/entities/booking/ui/SelectedSeatDisplay";
import { useSectionSeatState } from "@/entities/booking/lib/useSeatState";
import { useSeatChangeSSE } from "@/entities/booking/lib/useSeatChangeSSE";
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
    const { data: sectionSeats, isLoading, error } = useSectionSeatState(selectedSection!);
    const [realTimeSeats, setRealTimeSeats] = useState<Seat[] | null>(null);

    const handleSeatChange = useCallback((event: { seat_section: Section; seat_number: number; is_available: boolean }) => {
      if (event.seat_section !== selectedSection) return;

      setRealTimeSeats(prevSeats => {
        if (!prevSeats) return prevSeats;

        return prevSeats.map(seat => {
          if (seat.seatNumber === event.seat_number.toString()) {
            return {
              ...seat,
              status: event.is_available ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.OCCUPIED,
            };
          }
          return seat;
        });
      });
    }, [selectedSection]);

    useSeatChangeSSE({
      onSeatChange: handleSeatChange,
      enabled: !!selectedSection,
    });

    useEffect(() => {
      if (sectionSeats) {
        setRealTimeSeats(sectionSeats);
      }
    }, [sectionSeats, selectedSection]);

    const getLayout = () => {
      if (selectedSection) {
        const getFallbackSeats = () => {
          const layout = getSeatLayout(selectedSection);
          return layout.seats.map(seat => ({
            ...seat,
            status: SEAT_STATUS.OCCUPIED,
          }));
        };

        return {
          section: selectedSection,
          seats: realTimeSeats || sectionSeats || getFallbackSeats(),
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
