"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { Section, Seat, SelectedSeatInfo, SEAT_STATUS } from "@/entities/booking/model/types";
import { SeatGrid } from "@/entities/booking/ui/SeatGrid";
import { SelectedSeatDisplay } from "@/entities/booking/ui/SelectedSeatDisplay";
import { useSectionSeatState, useAllSectionsSeatState, seatQueryKeys } from "@/entities/booking/lib/useSeatState";
import { useSeatChangeSSE } from "@/entities/booking/lib/useSeatChangeSSE";
import { getSeatLayout } from "@/entities/booking/model/seatLayouts";
import { useQueryClient } from "@tanstack/react-query";

interface SeatSectionProps {
  selectedSection: Section | null;
  selectedSeat: Seat | null;
  onSeatSelect: (seat: Seat | null) => void;
  selectedSeatInfo: SelectedSeatInfo | null;
  className?: string;
  selectedSeats?: Seat[];
  isSeatSelected?: (seat: Seat) => boolean;
  isPerformerMode?: boolean;
}

export const SeatSection = memo<SeatSectionProps>(
  ({ 
    selectedSection, 
    selectedSeat, 
    onSeatSelect, 
    selectedSeatInfo, 
    className,
    selectedSeats,
    isSeatSelected,
    isPerformerMode = false
  }) => {
    const { data: sectionSeats, isLoading, error } = useSectionSeatState(selectedSection!);
    const { data: allSeats, isLoading: isAllSeatsLoading } = useAllSectionsSeatState();
    const [realTimeSeats, setRealTimeSeats] = useState<Seat[] | null>(null);
    const queryClient = useQueryClient();

    const handleSeatChange = useCallback((event: { seat_section: Section; seat_number: number; is_available: boolean }) => {
      if (event.seat_section !== selectedSection) return;

      setRealTimeSeats(prevSeats => {
        if (!prevSeats) return prevSeats;

        return prevSeats.map(seat => {
          if (seat.seatNumber === event.seat_number.toString()) {
            return {
              ...seat,
              status: event.is_available ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.OCCUPIED,
            };
          }
          return seat;
        });
      });

      const sectionCache = queryClient.getQueryData<Seat[]>(seatQueryKeys.seatState(event.seat_section));
      if (sectionCache) {
        const updatedSeats = sectionCache.map(seat => {
          if (seat.seatNumber === event.seat_number.toString()) {
            return {
              ...seat,
              status: event.is_available ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.OCCUPIED,
            };
          }
          return seat;
        });
        queryClient.setQueryData(seatQueryKeys.seatState(event.seat_section), updatedSeats);
      }
      
      const allSeatsCache = queryClient.getQueryData<Seat[]>(["allSectionsSeatState"]);
      if (allSeatsCache) {
        const updatedAllSeats = allSeatsCache.map(seat => {
          if (seat.section === event.seat_section && seat.seatNumber === event.seat_number.toString()) {
            const newStatus = event.is_available ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.OCCUPIED;
            return {
              ...seat,
              status: newStatus,
            };
          }
          return seat;
        });
        queryClient.setQueryData(["allSectionsSeatState"], updatedAllSeats);
      }
    }, [selectedSection, queryClient]);

    useSeatChangeSSE({
      onSeatChange: handleSeatChange,
      enabled: !!selectedSection,
    });

    useEffect(() => {
      if (!selectedSection) {

        if (allSeats && allSeats.length > 0) {
          setRealTimeSeats(allSeats);
        }
        return;
      }

      const allSectionSeats = allSeats?.filter(seat => seat.section === selectedSection);

      const dataToUse = allSectionSeats && allSectionSeats.length > 0 ? allSectionSeats : sectionSeats;
      
      if (dataToUse) {
        setRealTimeSeats(dataToUse);
      }
    }, [allSeats, sectionSeats, selectedSection, isAllSeatsLoading]);

    const getLayout = () => {
      if (selectedSection) {
        const getFallbackSeats = () => {
          const layout = getSeatLayout(selectedSection);
          return layout.seats.map(seat => ({
            ...seat,
            status: SEAT_STATUS.OCCUPIED,
          }));
        };

        const allSectionSeats = allSeats?.filter(seat => seat.section === selectedSection);
        
        const seatsToUse = realTimeSeats || 
                          (allSectionSeats && allSectionSeats.length > 0 ? allSectionSeats : null) ||
                          sectionSeats || 
                          getFallbackSeats();

        return {
          section: selectedSection,
          seats: seatsToUse,
        };
      } else {
        return null;
      }
    };

    const layout = getLayout();

    return (
      <div className={cn("pb-20", className)}>
        <div className="h-80">
          <SeatGrid
            layout={layout}
            selectedSeat={selectedSeat}
            onSeatSelect={isLoading || !!error ? () => {} : onSeatSelect}
            allSeats={realTimeSeats}
            selectedSeats={selectedSeats}
            isSeatSelected={isSeatSelected}
            isPerformerMode={isPerformerMode}
          />
        </div>

        <div className="h-28"></div>

        <div className="h-24">
          {isPerformerMode ? (
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-sm mb-2">선택된 좌석 ({selectedSeats?.length || 0}/3)</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSeats?.map((seat) => (
                  <span 
                    key={`${seat.section}-${seat.seatNumber}`}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                  >
                    {seat.section}-{seat.seatNumber}
                  </span>
                ))}
                {selectedSeats?.length === 0 && (
                  <span className="text-gray-500 text-sm">좌석을 선택해주세요 (최대 3개)</span>
                )}
              </div>
            </div>
          ) : (
            <SelectedSeatDisplay selectedSeat={selectedSeatInfo} selectedSection={selectedSection} />
          )}
        </div>
      </div>
    );
  },
);

SeatSection.displayName = "SeatSection";

export default SeatSection;
