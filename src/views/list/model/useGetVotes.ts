import { useQuery } from "@tanstack/react-query";
import { getVotes } from "../api/getVotes";

interface Vote {
  vote_id: number;
  team_id: number;
  teamName: string;
  voteCount: number;
  status: "PENDING" | "ONGOING" | "FINISHED";
}

export const useGetVotes = () => {
  return useQuery<Vote[]>({
    queryKey: ["votes"],
    queryFn: getVotes,
  });
};
