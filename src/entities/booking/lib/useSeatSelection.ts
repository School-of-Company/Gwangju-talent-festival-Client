import { useState, useCallback, useMemo } from "react";
import { Section, Seat, SelectedSeatInfo } from "../model/types";

export const useSeatSelection = () => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const handleSectionChange = useCallback((section: Section | null) => {
    setSelectedSection(section);
    setSelectedSeat(null);
  }, []);

  const selectSeat = useCallback(
    (seat: Seat) => {
      if (seat.status === "unavailable") return;

      if (selectedSeat?.seatNumber === seat.seatNumber && selectedSeat?.section === seat.section) {
        setSelectedSeat(null);
      } else {
        setSelectedSeat(seat);
      }
    },
    [selectedSeat],
  );

  const canSelectSeat = useCallback((seat: Seat) => {
    return seat.status === "available";
  }, []);

  const selectedSeatInfo = useMemo((): SelectedSeatInfo | null => {
    if (!selectedSeat || !selectedSection) return null;

    return {
      seat: selectedSeat,
      section: selectedSection,
    };
  }, [selectedSeat, selectedSection]);

  const isComplete = useMemo(() => {
    return !!(selectedSection && selectedSeat);
  }, [selectedSection, selectedSeat]);

  return {
    selectedSection,
    selectedSeat,
    selectedSeatInfo,
    setSelectedSection: handleSectionChange,
    selectSeat,
    canSelectSeat,
    isComplete,
  };
};
