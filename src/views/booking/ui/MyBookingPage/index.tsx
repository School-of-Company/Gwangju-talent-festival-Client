"use client";

import { cn } from "@/shared/utils/cn";
import { SeatGrid } from "@/entities/booking/ui/SeatGrid";
import { BookingInfoDisplay } from "@/entities/booking/ui/BookingInfoDisplay";
import { useMyBookedSeats } from "@/entities/booking/lib/useMySeat";
import { toast } from "sonner";
import { stringifyError } from "next/dist/shared/lib/utils";
import BackHeader from "@/shared/ui/BackHeader";
import Button from "@/shared/ui/Button";
import { useCallback, useEffect, useRef } from "react";
import { cancelSeatBooking } from "@/entities/booking/api/cancelSeatBooking";
import { cancelPerformerSeats } from "@/entities/booking/api/cancelPerformerSeats";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const MyBookingPage = () => {
  const { seats, isMultiple, isLoading, error } = useMyBookedSeats();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isCancelingRef = useRef(false);
  const layout = null;

  useEffect(() => {
    if (error) { 
      toast.error(stringifyError(error)); 
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && seats.length === 0 && !isCancelingRef.current) {
      toast.error("예약된 좌석이 없습니다.");
      router.push("/booking");
    }
  }, [isLoading, seats.length, router]);

  const handleCancelClick = useCallback(async () => {
    isCancelingRef.current = true;
    
    try {
      if (isMultiple) {
        await cancelPerformerSeats(seats);
        toast.success(`${seats.length}개 좌석 예매가 취소되었습니다.`);
      } else {
        await cancelSeatBooking(seats[0]);
        toast.success("예매가 취소되었습니다.");
      }
      
      router.push("/home");
      
      queryClient.invalidateQueries({ queryKey: ["mySeat"] });
      queryClient.invalidateQueries({ queryKey: ["mySeats"] });
    } catch (error) {
      toast.error(stringifyError(error as Error));
      isCancelingRef.current = false; 
    }
  }, [seats, isMultiple, router, queryClient]);

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-4 space-y-6")}>
      <BackHeader text="좌석 예매" goto="/home" />
      <div className="w-full">
        <SeatGrid
          layout={layout}
          selectedSeat={null}
          onSeatSelect={() => {}}
          mySeat={isLoading ? null : seats[0]}
          myAllSeats={isMultiple ? seats : undefined}
          className="w-full"
        />
      </div>

      <div className="w-full">
        <BookingInfoDisplay 
          mySeat={!isMultiple ? seats[0] || null : null}
          mySeats={isMultiple ? seats : undefined}
          className="w-full"
        />
      </div>
      <Button
          className="fixed bottom-[48px] left-[50%] -translate-x-1/2 w-[98%] h-[48px]"
          onClick={handleCancelClick}
          disabled={seats.length === 0}
        >
          예매 취소
      </Button>
    </div>
  );
};

export default MyBookingPage;
