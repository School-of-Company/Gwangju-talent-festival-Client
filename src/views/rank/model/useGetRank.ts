import { useQuery } from "@tanstack/react-query";
import { getRank } from "../api/getRank";

interface Response {
  ranking: number;
  team_name: string;
  popularity_award: boolean;
}

export const useGetRank = () => {
  return useQuery<Response[]>({
    queryKey: ["rank"],
    queryFn: getRank,
  });
};
