"use client";

import { cn } from "@/shared/utils/cn";
import { SeatGrid } from "@/entities/booking/ui/SeatGrid";
import { BookingInfoDisplay } from "@/entities/booking/ui/BookingInfoDisplay";
import { useMyBookedSeats } from "@/entities/booking/lib/useMySeat";
import { toast } from "sonner";
import { stringifyError } from "next/dist/shared/lib/utils";
import BackHeader from "@/shared/ui/BackHeader";
import Button from "@/shared/ui/Button";
import { useCallback } from "react";
import { cancelSeatBooking } from "@/entities/booking/api/cancelSeatBooking";
import { useRouter } from "next/navigation";

const MyBookingPage = () => {
  const { seats, isMultiple, isLoading, error } = useMyBookedSeats();
  const router = useRouter();
  const layout = null;

  if (error) { 
    toast.error(stringifyError(error)); 
  }

  if (!isLoading && seats.length === 0) {
    toast.error("예약된 좌석이 없습니다.");
    router.push("/booking");
  }

  const handleCancelClick = useCallback(async () => {
    try {
      if (isMultiple) {
        await Promise.all(seats.map(seat => cancelSeatBooking(seat)));
        toast.success(`${seats.length}개 좌석 예매가 취소되었습니다.`);
      } else {
        await cancelSeatBooking(seats[0]);
        toast.success("예매가 취소되었습니다.");
      }
      router.push("/home");
    } catch (error) {
      toast.error(stringifyError(error as Error));
    }
  }, [seats, isMultiple, router]);

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-4 space-y-6")}>
      <BackHeader text="좌석 예매" goto="/home" />
      <div className="w-full">
        <SeatGrid
          layout={layout}
          selectedSeat={null}
          onSeatSelect={() => {}}
          mySeat={isLoading ? null : seats[0]}
          allSeats={isMultiple ? seats : undefined}
          className="w-full"
        />
      </div>

      <div className="w-full">
        {isMultiple ? (
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-lg mb-3">예매된 좌석 ({seats.length}개)</h3>
            <div className="space-y-2">
              {seats.map((seat, index) => (
                <div key={`${seat.section}-${seat.seatNumber}`} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{seat.section}구역 {seat.seatNumber}번</span>
                  <span className="text-sm text-gray-600">좌석 {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <BookingInfoDisplay 
            mySeat={seats[0] || null}
            className="w-full"
          />
        )}
      </div>
      <Button
          className="fixed bottom-[48px] w-[375px] h-[48px]"
          onClick={handleCancelClick}
          disabled={seats.length === 0}
        >
          {isMultiple ? `${seats.length}개 좌석 예매 취소` : "예매 취소"}
      </Button>
    </div>
  );
};

export default MyBookingPage;
