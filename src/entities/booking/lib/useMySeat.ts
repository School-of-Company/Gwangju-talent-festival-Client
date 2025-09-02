import { useQuery } from "@tanstack/react-query";
import { getMySeat } from "../api/getMySeat";
import { Seat } from "../model/types";

export const useMySeat = (seat: Omit<Seat, "status"> | null) => {
  return useQuery({
    queryKey: ["mySeat", seat?.section, seat?.seatNumber],
    queryFn: () => getMySeat(seat!),
    enabled: Boolean(seat),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
