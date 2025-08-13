import { useQuery } from "@tanstack/react-query";
import { getVote } from "../api/getVote";

interface Response {
  team_id: number;
  team_name: string;
  star: number;
}

export const useGetVote = () => {
  return useQuery<Response>({
    queryKey: ["vote"],
    queryFn: getVote,
  });
};
