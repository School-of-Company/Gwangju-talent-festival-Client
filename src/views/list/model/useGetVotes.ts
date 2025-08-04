import { useQuery } from "@tanstack/react-query";
import { getVotes } from "../api/getVotes";
import { StatusType } from "@/entities/list/consts/status";

interface Vote {
  vote_id: number;
  team_id: number;
  teamName: string;
  voteCount: number;
  status: StatusType;
}

export const useGetVotes = () => {
  return useQuery<Vote[]>({
    queryKey: ["votes"],
    queryFn: getVotes,
  });
};
