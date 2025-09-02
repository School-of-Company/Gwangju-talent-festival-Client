"use client";

import { memo } from "react";
import { cn } from "@/shared/utils/cn";
import { Seat } from "../../model/types";

export interface BookingInfoDisplayProps {
  mySeat: Seat | null;
  className?: string;
}

export const BookingInfoDisplay = memo<BookingInfoDisplayProps>(
  ({ mySeat, className }) => {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
        <div className="mb-6">
          <h2 className="text-body2b text-gray-900 mb-1">예매정보</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-[15%] text-gray-600 text-sm">예매자</div>
            <div className="flex-1 text-gray-900 font-medium">이름</div>
          </div>

          <div className="flex items-center">
            <div className="w-[15%] text-gray-600 text-sm">관람일자</div>
            <div className="flex-1 text-gray-900 font-medium">2025.9.27.(토) </div>
          </div>

          <div className="flex items-center">
            <div className="w-[15%] text-gray-600 text-sm">장소</div>
            <div className="flex-1 text-gray-900 font-medium">광주광역시 동구 조선대길 146 조선대학교 해오름관</div>
          </div>

          <div className="flex items-center">
            <div className="w-[15%] text-gray-600 text-sm">예약좌석</div>
            <div className="flex-1 text-gray-900 font-medium">
              {mySeat ? `${mySeat.section}${mySeat.seatNumber}` : "-"}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

BookingInfoDisplay.displayName = "BookingInfoDisplay";

export default BookingInfoDisplay;
