import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSeatState } from "@/entities/booking/api/getSeatState";
import { 
  Section, 
  Seat, 
  SEAT_STATUS, 
  getSectionFromKey
} from "@/entities/booking/model/types";
import { getSeatLayout } from "@/entities/booking/model/seatLayouts";

export const seatQueryKeys = {
  seatState: (section: Section) => ["seatState", section] as const,
  allSeats: () => ["allSeats"] as const,
} as const;

export function useSectionSeatState(section: Section) {
  return useQuery({
    queryKey: seatQueryKeys.seatState(section),
    queryFn: async () => {
      const response = await getSeatState(section);
      
      const layout = getSeatLayout(section);
      return layout.seats.map((seat, index) => ({
        ...seat,
        status: response.seats[index] ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.UNAVAILABLE,
      }));
    },
    staleTime: 30000,
    refetchInterval: 60000,
    retry: 3,
    enabled: !!section,
  });
}

export function usePrefetchAllSeats() {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: seatQueryKeys.allSeats(),
    queryFn: async () => {
      try {
        const response = await getSeatState();
        
        (Object.keys(response) as Array<keyof typeof response>).forEach(sectionKey => {
          const section = getSectionFromKey(sectionKey);
          const sectionSeats = response[sectionKey];
          
          if (sectionSeats) {
            const layout = getSeatLayout(section);
            const transformedSeats: Seat[] = layout.seats.map((seat, index) => ({
              ...seat,
              status: (index < sectionSeats.length && sectionSeats[index]) ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.UNAVAILABLE,
            }));
            
            queryClient.setQueryData(seatQueryKeys.seatState(section), transformedSeats);
          }
        });
        
        return { success: true, timestamp: Date.now() };
      } catch (error) {
        throw error;
      }
    },
    staleTime: 30000,
    refetchInterval: 60000,
    retry: 3,
  });
}