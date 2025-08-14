"use client";

import { memo, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/shared/utils/cn";
import { Seat, SeatLayout, SECTIONS } from "../../model/types";
import { SeatItem } from "../SeatItem";
import { getSeatPattern, getSeatLayout } from "../../model/seatLayouts";

export interface SeatGridProps {
  layout: SeatLayout | null;
  selectedSeat: Seat | null;
  onSeatSelect: (seat: Seat | null) => void;
  className?: string;
}

export const SeatGrid = memo<SeatGridProps>(({ layout, selectedSeat, onSeatSelect, className }) => {
  const queryClient = useQueryClient();
  
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
  
  const allSectionsGrid = useMemo(() => {
    const sectionsRow1 = SECTIONS.slice(0, 5);
    const sectionsRow2 = SECTIONS.slice(5, 10);

    return [sectionsRow1, sectionsRow2];
  }, []);

  const renderSingleSectionGrid = () => (
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
  );

  const renderSectionMiniGrid = (section: (typeof SECTIONS)[number]) => {
    const cachedSeats = queryClient.getQueryData<Seat[]>(["seatState", section]);
    const sectionLayout = getSeatLayout(section);
    const pattern = getSeatPattern(section);
    
    const seatMap = new Map<string, Seat>();
    const seatsToUse = cachedSeats || sectionLayout.seats;
    
    seatsToUse.forEach(seat => {
      seatMap.set(seat.seatNumber, seat);
    });

    return (
      <div className="flex flex-col items-center border rounded-lg mb-28">
        <div className="text-white text-sm font-bold mb-1">{section}</div>
        <div className="flex flex-col gap-1">
          {pattern.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((seatNumber, colIndex) => {
                const seat = seatNumber ? seatMap.get(seatNumber.toString()) || null : null;
                const key = seat ? `${seat.section}-${seat.seatNumber}` : `${rowIndex}-${colIndex}`;
                return (
                  <div key={key} className="w-6 h-6">
                    {seat ? (
                      <div className="w-6 h-6 bg-white cursor-pointer"></div>
                    ) : (
                      <div className="w-6 h-6"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAllSectionsGrid = () => (
    <div className="flex flex-col gap-8 items-center">
      {allSectionsGrid.map((sectionsRow, rowIndex) => (
        <div key={rowIndex} className="flex gap-8 items-end">
          {sectionsRow.map(section => (
            <div key={section}>{renderSectionMiniGrid(section)}</div>
          ))}
        </div>
      ))}
    </div>
  );

  const getGridContainerStyles = () => {
    return "relative bg-gray-800 rounded-lg h-80 w-full flex justify-center";
  };

  return (
    <div className={cn(className)}>
      <div className={getGridContainerStyles()}>
        <div className="absolute inset-3 overflow-auto flex justify-center">
          {layout ? renderSingleSectionGrid() : renderAllSectionsGrid()}
        </div>
      </div>
    </div>
  );
});

SeatGrid.displayName = "SeatGrid";

export default SeatGrid;
