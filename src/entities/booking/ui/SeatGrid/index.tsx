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
      row.map((seatNumber, colIndex) => ({
        seatNumber,
        seat: seatNumber ? seatMap.get(seatNumber.toString()) || null : null,
        position: { row: rowIndex + 1, col: colIndex + 1 },
      })),
    );
  }, [layout?.section, layout?.seats]);

  const getGridContainerStyles = () => {
    return "relative bg-gray-800 rounded-lg p-3 overflow-auto h-full w-full flex items-center justify-center";
  };

  return (
    <div className={cn(className)}>
      <div className="h-80 w-full">
        <div className={getGridContainerStyles()}>
          {seatGrid.length ? (
            <div className="min-w-max">
              {seatGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-0.5 mb-1">
                  {row.map(({ seat }, colIndex) => (
                    <div key={colIndex} className="w-5 h-5">
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
