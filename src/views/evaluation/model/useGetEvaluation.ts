import { useQuery } from "@tanstack/react-query";
import { getEvaluation } from "../api/getEvaluation";
import { Score } from "./score";

export const useGetEvaluation = (team_id: string, isOne: boolean) => {
  return useQuery<Score>({
    queryKey: ["team", team_id, isOne],
    queryFn: () => getEvaluation(team_id),
    enabled: isOne && Boolean(team_id),
  });
};
