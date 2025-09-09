import { useQuery } from "@tanstack/react-query";
import { getEvaluations } from "../api/getEvaluations";
import { Score } from "./score";

export const useGetEvaluations = (isOne: boolean) => {
  return useQuery<Score[]>({
    queryKey: ["evaluation"],
    queryFn: getEvaluations,
    enabled: !isOne,
  });
};
