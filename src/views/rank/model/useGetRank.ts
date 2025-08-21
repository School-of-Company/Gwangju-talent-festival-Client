import { useQuery } from "@tanstack/react-query";
import { getRank } from "../api/getRank";
import { Rank } from "./rankType";

export const useGetRank = () => {
  return useQuery<Rank[]>({
    queryKey: ["rank"],
    queryFn: getRank,
  });
};
