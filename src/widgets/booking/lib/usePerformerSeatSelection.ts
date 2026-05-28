import { useCallback, useMemo } from "react";
import { Seat, SEAT_STATUS } from "@/entities/booking/model/types";
import { useBookingStore } from "@/entities/booking/model/bookingStore";

export const usePerformerSeatSelection = (existingSeatsCount: number = 0) => {
  const selectedSection = useBookingStore(s => s.selectedSection);
  const selectedSeats = useBookingStore(s => s.selectedSeats);
  const setSelectedSection = useBookingStore(s => s.setSelectedSection);
  const selectSeat = useBookingStore(s => s.selectSeat);
  const removeOccupiedSeat = useBookingStore(s => s.removeOccupiedSeat);

  const maxSelectableSeats = Math.max(0, 3 - existingSeatsCount);

  const handleSelectSeat = useCallback(
    (seat: Seat) => selectSeat(seat, maxSelectableSeats),
    [selectSeat, maxSelectableSeats],
  );

  const isSeatSelected = useCallback(
    (seat: Seat) =>
      selectedSeats.some(s => s.seatNumber === seat.seatNumber && s.section === seat.section),
    [selectedSeats],
  );

  const isComplete = useMemo(
    () => !!(selectedSection && selectedSeats.length === 3),
    [selectedSection, selectedSeats.length],
  );

  const canBook = useMemo(
    () => selectedSeats.length > 0 && selectedSeats.length <= maxSelectableSeats,
    [selectedSeats.length, maxSelectableSeats],
  );

  const canSelectSeat = (seat: Seat) => seat.status === SEAT_STATUS.AVAILABLE;

  return {
    selectedSection,
    selectedSeats,
    setSelectedSection,
    selectSeat: handleSelectSeat,
    canSelectSeat,
    isSeatSelected,
    isComplete,
    canBook,
    maxSelectableSeats,
    removeOccupiedSeat,
  };
};
