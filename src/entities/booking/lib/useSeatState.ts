import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSeatState } from "@/entities/booking/api/getSeatState";
import { Section, Seat, SEAT_STATUS, getSectionFromKey, SECTIONS } from "@/entities/booking/model/types";
import { getSeatLayout } from "@/entities/booking/model/seatLayouts";

export const seatQueryKeys = {
  seatState: (section: Section) => ["seatState", section] as const,
} as const;

export function useSectionSeatState(section: Section) {
  return useQuery({
    queryKey: seatQueryKeys.seatState(section),
    queryFn: async () => {
      const response = await getSeatState(section);

      const layout = getSeatLayout(section);
      return layout.seats.map((seat, index) => ({
        ...seat,
        status: response.seats[index] ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.OCCUPIED,
      }));
    },
    enabled: !!section,
    staleTime: 0,
    refetchOnMount: true,
  });
}

export function usePrefetchSeatCaches() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["__pre__seat_all__"],
    queryFn: async () => {
      const response = await getSeatState();

      (Object.keys(response) as Array<keyof typeof response>).forEach(sectionKey => {
        const section = getSectionFromKey(sectionKey);
        const sectionSeats = response[sectionKey];

        if (sectionSeats) {
          const layout = getSeatLayout(section);
          const transformedSeats: Seat[] = layout.seats.map((seat, index) => ({
            ...seat,
            status:
              index < sectionSeats.length && sectionSeats[index]
                ? SEAT_STATUS.AVAILABLE
                : SEAT_STATUS.OCCUPIED,
          }));

          queryClient.setQueryData(seatQueryKeys.seatState(section), transformedSeats);
        }
      });

      return { warmed: true, at: Date.now() };
    },
    staleTime: 0,
    gcTime: 0,
  });
}

export function useAllSectionsSeatState() {
  return useQuery({
    queryKey: ["allSectionsSeatState"],
    queryFn: async () => {
      const allSeats: Seat[] = [];
      
      for (const section of SECTIONS) {
        try {
          const response = await getSeatState(section);
          const layout = getSeatLayout(section);
          
          const sectionSeats = layout.seats.map((seat, index) => ({
            ...seat,
            status: response.seats[index] ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.OCCUPIED,
          }));
          
          allSeats.push(...sectionSeats);
        } catch (error) {
          console.error(`${section}:`, error);
        }
      }
      
      return allSeats;
    },
  });
}
