"use client";

import { memo } from "react";
import { cn } from "@/shared/utils/cn";
import { SEAT_INFO, SECTIONS, SelectedSeatInfo, Section } from "../../model/types";
import { getAvailableSeatsCount } from "../../model/seatLayouts";

export interface SelectedSeatDisplayProps {
  selectedSeat: SelectedSeatInfo | null;
  selectedSection?: Section | null;
  className?: string;
}

export const SelectedSeatDisplay = memo<SelectedSeatDisplayProps>(
  ({ selectedSeat, selectedSection, className }) => {
    const Legend = () => (
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-white border border-gray-300"></div>
          <span className="text-gray-600 text-caption1r">가능</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-400 border border-gray-400"></div>
          <span className="text-gray-600 text-caption1r">불가능</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-600 border border-purple-600"></div>
          <span className="text-gray-600 text-caption1r">선택</span>
        </div>
      </div>
    );

    const section = selectedSeat?.section || selectedSection;
    const seatPosition = selectedSeat
      ? `${selectedSeat.section}${selectedSeat.seat.seatNumber}`
      : null;

    let availableSeatsCount = 0;
    let totalSeats = 0;

    if (section) {
      availableSeatsCount = getAvailableSeatsCount(section);
      totalSeats = SEAT_INFO[section].total;
    } else {
      availableSeatsCount = SECTIONS.reduce((total, sec) => total + getAvailableSeatsCount(sec), 0);
      totalSeats = SECTIONS.reduce((total, sec) => total + SEAT_INFO[sec].total, 0);
    }

    return (
      <div className={cn("h-24 p-4 rounded-lg border border-purple-200", className)}>
        <div className="flex items-center justify-between h-full">
          <div className="flex flex-col justify-center gap-1">
            <div>
              <span className="text-body3r text-gray-600">좌석번호 </span>
              <span className="text-body3b font-bold text-purple-600">{seatPosition || ""}</span>
            </div>

            <div>
              <span className="text-body3r text-gray-600">남은좌석 </span>
              <span className="text-body3b font-bold text-gray-900">
                {availableSeatsCount} / {totalSeats}
              </span>
            </div>
          </div>

          <Legend />
        </div>
      </div>
    );
  },
);

SelectedSeatDisplay.displayName = "SelectedSeatDisplay";

export default SelectedSeatDisplay;
