"use client";

import { memo, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { Seat } from "../../model/types";

interface InfoRowProps {
  label: string;
  children: ReactNode;
}

const InfoRow = ({ label, children }: InfoRowProps) => (
  <div className="flex items-center">
    <div className="w-[15%] text-gray-600 text-sm">{label}</div>
    <div className="flex-1 text-gray-900 font-medium">{children}</div>
  </div>
);

interface BookingInfoDisplayProps {
  mySeat: Seat | null;
  mySeats?: Seat[];
  className?: string;
}

export const BookingInfoDisplay = memo<BookingInfoDisplayProps>(
  ({ mySeat, mySeats, className }) => {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
        <div className="mb-6">
          <h2 className="text-body2b text-gray-900 mb-1">예매정보</h2>
        </div>

        <div className="space-y-6">
          <InfoRow label="관람일자">2025.9.27.(토)</InfoRow>
          <InfoRow label="장소">
            광주광역시 동구 조선대길 146 조선대학교 해오름관
          </InfoRow>
          <InfoRow label="예약좌석">
            {mySeats && mySeats.length > 0 
              ? mySeats.map(seat => `${seat.section}${seat.seatNumber}`).join(", ")
              : mySeat 
                ? `${mySeat.section}${mySeat.seatNumber}` 
                : "-"
            }
          </InfoRow>
        </div>
      </div>
    );
  },
);

BookingInfoDisplay.displayName = "BookingInfoDisplay";

export default BookingInfoDisplay;
