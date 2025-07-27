"use client";

import { useCallback } from "react";
import SelectSection from "@/widgets/booking/ui/SelectSection";
import SeatSection from "@/widgets/booking/ui/SeatSection";
import Button from "@/shared/ui/Button";
import BackHeader from "@/shared/ui/BackHeader";
import { useSeatSelection } from "@/entities/booking/lib/useSeatSelection";
import { SectionType, Seat } from "@/entities/booking/model/types";

const BookingPage = () => {
  const {
    selectedSection,
    selectedSeat,
    selectedSeatInfo,
    setSelectedSection,
    selectSeat,
    isComplete,
  } = useSeatSelection();

  const handleSectionSelect = useCallback(
    (section: SectionType) => {
      setSelectedSection(section);
    },
    [setSelectedSection],
  );

  const handleSeatSelect = useCallback(
    (seat: Seat | null) => {
      if (seat) {
        selectSeat(seat);
      }
    },
    [selectSeat],
  );

  const handleBookingClick = useCallback(() => {
    if (isComplete && selectedSeatInfo) {
      console.log(
        "section:",
        selectedSeatInfo.section,
        "seat:",
        selectedSeatInfo.seat,
        "seatPosition:",
        `${selectedSeatInfo.section}${selectedSeatInfo.seat.seatNumber}`,
      );
    }
  }, [isComplete, selectedSeatInfo]);

  const getButtonText = () => {
    if (!selectedSection) {
      return "구역을 선택해주세요";
    }
    if (!selectedSeat) {
      return "좌석을 선택해주세요";
    }
    return "예매하기";
  };

  return (
    <main className="w-[375px] h-screen bg-white flex flex-col">
      <BackHeader text="예매하기" />

      <div className="flex-1 flex flex-col p-4 gap-8 overflow-hidden">
        <SelectSection onSectionSelect={handleSectionSelect} />
        <div className="flex-1">
          <SeatSection
            selectedSection={selectedSection}
            selectedSeat={selectedSeat}
            onSeatSelect={handleSeatSelect}
            selectedSeatInfo={selectedSeatInfo}
          />
        </div>
        <Button
          className="fixed bottom-[48px] w-[375px] h-[48px]"
          onClick={handleBookingClick}
          isDisabled={!isComplete}
        >
          {getButtonText()}
        </Button>
      </div>
    </main>
  );
};

export default BookingPage;
