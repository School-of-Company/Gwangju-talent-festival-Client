import { useQuery } from "@tanstack/react-query";
import { getVote } from "../api/getVote";

interface Response {
  team_id: number;
  teamName: string;
  prev_team: {
    team_id: number;
    teamName: string;
  };
  next_team: {
    team_id: number;
    teamName: string;
  };
}

export const useGetVote = () => {
  return useQuery<Response>({
    queryKey: ["vote"],
    queryFn: getVote,
  });
};
