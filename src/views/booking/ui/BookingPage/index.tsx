"use client";

import { useCallback, useEffect } from "react";
import SelectSection from "@/widgets/booking/ui/SelectSection";
import SeatSection from "@/widgets/booking/ui/SeatSection";
import Button from "@/shared/ui/Button";
import BackHeader from "@/shared/ui/BackHeader";
import { useSeatSelection } from "@/widgets/booking/lib/useSeatSelection";
import { usePerformerSeatSelection } from "@/widgets/booking/lib/usePerformerSeatSelection";
import { useSeatBooking, useMultipleSeatBooking } from "@/widgets/booking/lib/useSeatBooking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMyBookedSeats } from "@/entities/booking/lib/useMySeat";
import { useBookingStore } from "@/entities/booking/model/bookingStore";

const BookingPage = () => {
  const router = useRouter();
  const { seats: myBookedSeats } = useMyBookedSeats();

  const setSelectedSection = useBookingStore(s => s.setSelectedSection);
  const isPerformer = useBookingStore(s => s.isPerformerMode);
  const selectedSection = useBookingStore(s => s.selectedSection);
  const selectedSeat = useBookingStore(s => s.selectedSeat);
  const reset = useBookingStore(s => s.reset);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const { selectedSeatInfo, isComplete } = useSeatSelection();
  const { selectedSeats, canBook, maxSelectableSeats } = usePerformerSeatSelection(
    myBookedSeats?.length ?? 0,
  );

  const seatBookingMutation = useSeatBooking();
  const multipleSeatBookingMutation = useMultipleSeatBooking();

  const handleBookingClick = useCallback(() => {
    if (isPerformer) {
      if (canBook && selectedSeats.length > 0) {
        multipleSeatBookingMutation.mutate(selectedSeats);
        router.push("/home");
      }
    } else {
      if (isComplete && selectedSeatInfo) {
        seatBookingMutation.mutate({
          section: selectedSeatInfo.seat.section,
          seatNumber: selectedSeatInfo.seat.seatNumber,
        });
        toast.success("예매가 완료되었습니다.");
        router.push("/home");
      }
    }
  }, [
    isPerformer,
    canBook,
    selectedSeats,
    multipleSeatBookingMutation,
    isComplete,
    selectedSeatInfo,
    seatBookingMutation,
    router,
  ]);

  const getButtonText = () => {
    if (isPerformer) {
      if (multipleSeatBookingMutation.isPending) return "예매 중...";
      if (!selectedSection) return "구역을 선택해주세요";
      if (selectedSeats.length === 0) {
        if (maxSelectableSeats === 0) return "최대 예매 가능 좌석 수 도달";
        return `좌석을 선택해주세요 (최대 ${maxSelectableSeats}개 추가 가능)`;
      }
      return `${selectedSeats.length}개 좌석 예매하기`;
    } else {
      if (seatBookingMutation.isPending) return "예매 중...";
      if (!selectedSection) return "구역을 선택해주세요";
      if (!selectedSeat) return "좌석을 선택해주세요";
      return "예매하기";
    }
  };

  return (
    <main className="w-[375px] h-screen bg-white flex flex-col fixed  overflow-hidden">
      <BackHeader goto="/home" text="예매하기" />

      <div className="flex-1 flex flex-col p-4 gap-8 min-h-0">
        <div className="flex-shrink-0">
          <SelectSection onSectionSelect={setSelectedSection} />
        </div>
        <div className="flex-shrink-0 overflow-hidden">
          <SeatSection />
        </div>
        <Button
          className="fixed bottom-[48px] w-[375px] h-[48px]"
          onClick={handleBookingClick}
          disabled={isPerformer ? !canBook || maxSelectableSeats === 0 : !isComplete}
        >
          {getButtonText()}
        </Button>
      </div>
    </main>
  );
};

export default BookingPage;
