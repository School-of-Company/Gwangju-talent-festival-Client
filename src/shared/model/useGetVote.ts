import { useQuery } from "@tanstack/react-query";
import { getVote } from "../api/getVote";

interface Response {
  team_id: number;
  team_name: string;
  star: number;
}

export const useGetVote = (team: string) => {
  return useQuery<Response>({
    queryKey: ["vote", team],
    queryFn: () => getVote(team),
    enabled: team !== "",
  });
};
