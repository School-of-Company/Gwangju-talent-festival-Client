import { useQuery } from "@tanstack/react-query";
import { getVote } from "../api/getVote";

export const useGetVote = () => {
  return useQuery({
    queryKey: ["vote"],
    queryFn: getVote,
    refetchInterval: 5000,
  });
};
