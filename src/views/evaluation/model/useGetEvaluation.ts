import { useQuery } from "@tanstack/react-query";
import { getEvaluation } from "../api/getEvaluation";
import { EvaluationCategory } from "@/entities/evaluation/model/Category";

interface Response {
  judge_id: number;
  totalScore: number;
  score: { category: EvaluationCategory; value: number }[];
}

export const useGetEvaluation = () => {
  return useQuery<Response>({
    queryKey: ["evaluation"],
    queryFn: getEvaluation,
  });
};
