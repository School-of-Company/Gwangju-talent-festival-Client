"use client";

import { memo, useCallback, useMemo } from "react";
import { cn } from "@/shared/utils/cn";
import { Seat, SeatLayout } from "../../model/types";
import { SeatItem } from "../SeatItem";
import { getSeatPattern } from "../../model/seatLayouts";

export interface SeatGridProps {
  layout: SeatLayout | null;
  selectedSeat: Seat | null;
  onSeatSelect: (seat: Seat | null) => void;
  className?: string;
}

export const SeatGrid = memo<SeatGridProps>(({ layout, selectedSeat, onSeatSelect, className }) => {
  const handleSeatSelect = useCallback(
    (seat: Seat) => {
      onSeatSelect(seat);
    },
    [onSeatSelect],
  );

  const seatGrid = useMemo(() => {
    if (!layout?.section) return [];

    const pattern = getSeatPattern(layout.section);
    const seatMap = new Map<string, Seat>();

    layout.seats.forEach(seat => {
      seatMap.set(seat.seatNumber, seat);
    });

    return pattern.map((row, rowIndex) =>
      row.map((seatNumber, colIndex) => {
        const seat = seatNumber ? seatMap.get(seatNumber.toString()) || null : null;
        const key = seat ? `${seat.section}-${seat.seatNumber}` : `${rowIndex}-${colIndex}`;
        
        return {
          seatNumber,
          seat,
          key,
        };
      }),
    );
  }, [layout?.section, layout?.seats]);

  const getGridContainerStyles = () => {
    return "relative bg-gray-800 rounded-lg h-80 w-full flex justify-center";
  };

  return (
    <div className={cn(className)}>
      <div className={getGridContainerStyles()}>
        <div className="absolute inset-3 overflow-auto flex justify-center">
          {seatGrid.length ? (
            <div className="min-w-max flex flex-col justify-start">
              {seatGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-4 mb-4">
                  {row.map(({ seat, key }) => (
                    <div key={key} className="w-5 h-5">
                      {seat ? (
                        <SeatItem
                          seat={seat}
                          isSelected={
                            selectedSeat?.seatNumber === seat.seatNumber &&
                            selectedSeat?.section === seat.section
                          }
                          onSelect={handleSeatSelect}
                        />
                      ) : (
                        <div className="w-5 h-5" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* 좌석이 없을 때 빈 상태 */
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-sm">구역을 선택해주세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SeatGrid.displayName = "SeatGrid";

export default SeatGrid;
