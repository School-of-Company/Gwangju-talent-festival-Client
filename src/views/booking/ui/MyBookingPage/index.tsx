"use client";

import { cn } from "@/shared/utils/cn";
import { SeatGrid } from "@/entities/booking/ui/SeatGrid";
import { BookingInfoDisplay } from "@/entities/booking/ui/BookingInfoDisplay";
import { useMySeat } from "@/entities/booking/lib/useMySeat";
import { toast } from "sonner";
import { stringifyError } from "next/dist/shared/lib/utils";
import BackHeader from "@/shared/ui/BackHeader";
import Button from "@/shared/ui/Button";
import { useCallback } from "react";
import { Seat } from "@/entities/booking/model/types";
import { cancelSeatBooking } from "@/entities/booking/api/cancelSeatBooking";
import { useRouter } from "next/navigation";

const MyBookingPage = () => {
  const { data: mySeat, isLoading, error } = useMySeat();
  const router = useRouter();
  const layout = null;

  if (error) { 
    toast.error(stringifyError(error)); 
  }

  if (!mySeat) {
    toast.error("예약된 좌석이 없습니다.");
    router.push("/booking");
  }

  const handleCancelClick = useCallback(() => {
    cancelSeatBooking(mySeat as Seat);
    toast.success("예매가 취소되었습니다.");
    router.push("/home");
  }, [mySeat, router]);

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-4 space-y-6")}>
      <BackHeader text="좌석 예매" goto="/home" />
      <div className="w-full">
        <SeatGrid
          layout={layout}
          selectedSeat={null}
          onSeatSelect={() => {}}
          mySeat={isLoading ? null : mySeat}
          className="w-full"
        />
      </div>

      <div className="w-full">
        <BookingInfoDisplay 
          mySeat={mySeat || null}
          className="w-full"
        />
      </div>
      <Button
          className="fixed bottom-[48px] w-[375px] h-[48px]"
          onClick={handleCancelClick}
        >
          예매 취소
      </Button>
    </div>
  );
};

export default MyBookingPage;
