import { useState, useCallback, useMemo } from "react";
import { Section, Seat, SEAT_STATUS } from "@/entities/booking/model/types";

export const usePerformerSeatSelection = () => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSectionChange = useCallback((section: Section | null) => {
    setSelectedSection(section);
    setSelectedSeats([]);
  }, []);

  const selectSeat = useCallback(
    (seat: Seat) => {
      if (seat.status === SEAT_STATUS.OCCUPIED) return;

      setSelectedSeats(prev => {
        const isAlreadySelected = prev.some(
          s => s.seatNumber === seat.seatNumber && s.section === seat.section
        );

        if (isAlreadySelected) {
          return prev.filter(
            s => !(s.seatNumber === seat.seatNumber && s.section === seat.section)
          );
        } else {
          if (prev.length >= 3) {
            return [...prev.slice(1), seat];
          } else {
            return [...prev, seat];
          }
        }
      });
    },
    []
  );

  const canSelectSeat = useCallback(
    (seat: Seat) => {
      return seat.status === SEAT_STATUS.AVAILABLE;
    },
    []
  );

  const isSeatSelected = useCallback(
    (seat: Seat) => {
      return selectedSeats.some(
        s => s.seatNumber === seat.seatNumber && s.section === seat.section
      );
    },
    [selectedSeats]
  );

  const isComplete = useMemo(() => {
    return !!(selectedSection && selectedSeats.length === 3);
  }, [selectedSection, selectedSeats.length]);

  const canBook = useMemo(() => {
    return selectedSeats.length > 0 && selectedSeats.length <= 3;
  }, [selectedSeats.length]);

  return {
    selectedSection,
    selectedSeats,
    setSelectedSection: handleSectionChange,
    selectSeat,
    canSelectSeat,
    isSeatSelected,
    isComplete,
    canBook,
  };
};
