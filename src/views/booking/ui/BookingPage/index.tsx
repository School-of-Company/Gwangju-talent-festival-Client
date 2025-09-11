"use client";

import { useCallback } from "react";
import SelectSection from "@/widgets/booking/ui/SelectSection";
import SeatSection from "@/widgets/booking/ui/SeatSection";
import Button from "@/shared/ui/Button";
import BackHeader from "@/shared/ui/BackHeader";
import { useSeatSelection } from "@/widgets/booking/lib/useSeatSelection";
import { SectionType, Seat } from "@/entities/booking/model/types";
import { useSeatBooking } from "@/widgets/booking/lib/useSeatBooking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BookingPage = () => {
  const {
    selectedSection,
    selectedSeat,
    selectedSeatInfo,
    setSelectedSection,
    selectSeat,
    isComplete,
  } = useSeatSelection();

  const seatBookingMutation = useSeatBooking();
  const router = useRouter();
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
      seatBookingMutation.mutate({
        section: selectedSeatInfo.seat.section,
        seatNumber: selectedSeatInfo.seat.seatNumber,
      });
      toast.success("예매가 완료되었습니다.");
      router.push("/home");
    }
  }, [isComplete, selectedSeatInfo, seatBookingMutation, router]);

  const getButtonText = () => {
    if (seatBookingMutation.isPending) {
      return "예매 중...";
    }
    if (!selectedSection) {
      return "구역을 선택해주세요";
    }
    if (!selectedSeat) {
      return "좌석을 선택해주세요";
    }
    return "예매하기";
  };

  return (
    <main className="w-[375px] h-screen bg-white flex flex-col fixed  overflow-hidden">
      <BackHeader text="예매하기" />

      <div className="flex-1 flex flex-col p-4 gap-8 min-h-0">
        <div className="flex-shrink-0">
          <SelectSection onSectionSelect={handleSectionSelect} />
        </div>
        <div className="flex-shrink-0 overflow-hidden">
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
          disabled={!isComplete}
        >
          {getButtonText()}
        </Button>
      </div>
    </main>
  );
};

export default BookingPage;
