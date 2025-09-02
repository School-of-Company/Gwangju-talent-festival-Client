import { useQuery } from "@tanstack/react-query";
import { getMySeat } from "../api/getMySeat";
import { Seat } from "../model/types";

export const useMySeat = () => {
  return useQuery<Seat, Error, Seat>({
    queryKey: ["mySeat"],
    queryFn: () => getMySeat(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: true,
  });
};
