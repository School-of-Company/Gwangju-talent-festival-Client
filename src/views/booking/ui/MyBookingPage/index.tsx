"use client";

import { cn } from "@/shared/utils/cn";
import { SeatGrid } from "@/entities/booking/ui/SeatGrid";
import { BookingInfoDisplay } from "@/entities/booking/ui/BookingInfoDisplay";
import { useMySeat } from "@/entities/booking/lib/useMySeat";
import { toast } from "sonner";
import { stringifyError } from "next/dist/shared/lib/utils";
import BackHeader from "@/shared/ui/BackHeader";

const MyBookingPage = () => {
  const { data: mySeat, isLoading, error } = useMySeat();
  
  const layout = null;

  if (error) toast.error(stringifyError(error));

  if (!mySeat) toast.error("예약된 좌석이 없습니다.");

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
    </div>
  );
};

export default MyBookingPage;
