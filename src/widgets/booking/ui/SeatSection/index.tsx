"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { Section, Seat, SEAT_STATUS } from "@/entities/booking/model/types";
import { SeatGrid } from "@/entities/booking/ui/SeatGrid";
import { SelectedSeatDisplay } from "@/entities/booking/ui/SelectedSeatDisplay";
import {
  useSectionSeatState,
  useAllSectionsSeatState,
  seatQueryKeys,
} from "@/entities/booking/lib/useSeatState";
import { useSeatChangeSSE } from "@/entities/booking/lib/useSeatChangeSSE";
import { getSeatLayout } from "@/entities/booking/model/seatLayouts";
import { useQueryClient } from "@tanstack/react-query";
import { useBookingStore } from "@/entities/booking/model/bookingStore";
import { useMyBookedSeats } from "@/entities/booking/lib/useMySeat";

interface SeatSectionProps {
  className?: string;
}

export const SeatSection = memo<SeatSectionProps>(({ className }) => {
  const selectedSection = useBookingStore(s => s.selectedSection);
  const selectedSeat = useBookingStore(s => s.selectedSeat);
  const selectedSeats = useBookingStore(s => s.selectedSeats);
  const isPerformerMode = useBookingStore(s => s.isPerformerMode);
  const selectSeat = useBookingStore(s => s.selectSeat);
  const removeOccupiedSeat = useBookingStore(s => s.removeOccupiedSeat);

  const { seats: myBookedSeats } = useMyBookedSeats();
  const maxSelectableSeats = Math.max(0, 3 - (myBookedSeats?.length ?? 0));

  const { data: sectionSeats, isLoading, error } = useSectionSeatState(selectedSection!);
  const { data: allSeats, isLoading: isAllSeatsLoading } = useAllSectionsSeatState();
  const [realTimeSeats, setRealTimeSeats] = useState<Seat[] | null>(null);
  const queryClient = useQueryClient();

  const isSeatSelected = useCallback(
    (seat: Seat) =>
      selectedSeats.some(s => s.seatNumber === seat.seatNumber && s.section === seat.section),
    [selectedSeats],
  );

  const selectedSeatInfo =
    selectedSeat && selectedSection ? { seat: selectedSeat, section: selectedSection } : null;

  const handleSeatChange = useCallback(
    (event: { seat_section: Section; seat_number: number; is_available: boolean }) => {
      if (event.seat_section !== selectedSection) return;

      if (!event.is_available) {
        removeOccupiedSeat(event.seat_section, event.seat_number.toString());
      }

      setRealTimeSeats(prevSeats => {
        if (!prevSeats) return prevSeats;
        return prevSeats.map(seat =>
          seat.seatNumber === event.seat_number.toString()
            ? { ...seat, status: event.is_available ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.OCCUPIED }
            : seat,
        );
      });

      const sectionCache = queryClient.getQueryData<Seat[]>(
        seatQueryKeys.seatState(event.seat_section),
      );
      if (sectionCache) {
        queryClient.setQueryData(
          seatQueryKeys.seatState(event.seat_section),
          sectionCache.map(seat =>
            seat.seatNumber === event.seat_number.toString()
              ? {
                  ...seat,
                  status: event.is_available ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.OCCUPIED,
                }
              : seat,
          ),
        );
      }

      const allSeatsCache = queryClient.getQueryData<Seat[]>(["allSectionsSeatState"]);
      if (allSeatsCache) {
        queryClient.setQueryData(
          ["allSectionsSeatState"],
          allSeatsCache.map(seat =>
            seat.section === event.seat_section &&
            seat.seatNumber === event.seat_number.toString()
              ? {
                  ...seat,
                  status: event.is_available ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.OCCUPIED,
                }
              : seat,
          ),
        );
      }
    },
    [selectedSection, queryClient, removeOccupiedSeat],
  );

  useSeatChangeSSE({ onSeatChange: handleSeatChange, enabled: !!selectedSection });

  useEffect(() => {
    if (!selectedSection) {
      if (allSeats && allSeats.length > 0) setRealTimeSeats(allSeats);
      return;
    }
    const allSectionSeats = allSeats?.filter(seat => seat.section === selectedSection);
    const dataToUse =
      allSectionSeats && allSectionSeats.length > 0 ? allSectionSeats : sectionSeats;
    if (dataToUse) setRealTimeSeats(dataToUse);
  }, [allSeats, sectionSeats, selectedSection, isAllSeatsLoading]);

  const getLayout = () => {
    if (!selectedSection) return null;

    const getFallbackSeats = () =>
      getSeatLayout(selectedSection).seats.map(seat => ({ ...seat, status: SEAT_STATUS.OCCUPIED }));

    const allSectionSeats = allSeats?.filter(seat => seat.section === selectedSection);
    const seatsToUse =
      realTimeSeats ||
      (allSectionSeats && allSectionSeats.length > 0 ? allSectionSeats : null) ||
      sectionSeats ||
      getFallbackSeats();

    return { section: selectedSection, seats: seatsToUse };
  };

  const handleSeatSelect = useCallback(
    (seat: Seat | null) => {
      if (seat) selectSeat(seat, maxSelectableSeats);
    },
    [selectSeat, maxSelectableSeats],
  );

  return (
    <div className={cn("pb-20", className)}>
      <div className="h-80">
        <SeatGrid
          layout={getLayout()}
          selectedSeat={selectedSeat}
          onSeatSelect={isLoading || !!error ? () => {} : handleSeatSelect}
          allSeats={realTimeSeats}
          selectedSeats={selectedSeats}
          isSeatSelected={isSeatSelected}
          isPerformerMode={isPerformerMode}
          myAllSeats={myBookedSeats}
        />
      </div>

      <div className="h-28" />

      <div className="h-24">
        <SelectedSeatDisplay
          selectedSeat={!isPerformerMode ? selectedSeatInfo : null}
          selectedSection={selectedSection}
          selectedSeats={isPerformerMode ? selectedSeats : undefined}
        />
      </div>
    </div>
  );
});

SeatSection.displayName = "SeatSection";

export default SeatSection;
