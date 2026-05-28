import { useMemo, useCallback } from "react";
import { Seat, SelectedSeatInfo, SEAT_STATUS } from "@/entities/booking/model/types";
import { useBookingStore } from "@/entities/booking/model/bookingStore";

export const useSeatSelection = () => {
  const selectedSection = useBookingStore(s => s.selectedSection);
  const selectedSeat = useBookingStore(s => s.selectedSeat);
  const setSelectedSection = useBookingStore(s => s.setSelectedSection);
  const selectSeat = useBookingStore(s => s.selectSeat);

  const selectedSeatInfo = useMemo((): SelectedSeatInfo | null => {
    if (!selectedSeat || !selectedSection) return null;
    return { seat: selectedSeat, section: selectedSection };
  }, [selectedSeat, selectedSection]);

  const isComplete = useMemo(
    () => !!(selectedSection && selectedSeat),
    [selectedSection, selectedSeat],
  );

  const canSelectSeat = useCallback((seat: Seat) => seat.status === SEAT_STATUS.AVAILABLE, []);

  return { selectedSection, selectedSeat, selectedSeatInfo, setSelectedSection, selectSeat, canSelectSeat, isComplete };
};
