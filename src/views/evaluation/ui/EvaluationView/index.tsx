import EvaluationCard from "@/entities/evaluation/ui/EvaluationCard";
import Standard from "@/entities/evaluation/ui/Standard";
import { Button } from "@/shared/ui";
import { useGetEvaluations } from "../../model/useGetEvaluation";

export default function EvaluationView() {
  const { data } = useGetEvaluations();
  return (
    <div className="flex items-center flex-col">
      <Standard />
      <div className="justify-center flex flex-col gap-24 w-full">
        {data &&
          data.map(v => {
            return (
              <EvaluationCard
                completion_expression={v.completion_expression}
                creativity_composition={v.creativity_composition}
                judge_id={v.judge_id}
                total_score={v.total_score}
                stage_manner_performance={v.stage_manner_performance}
                team_id={v.team_id}
                team_name={v.team_name}
                key={v.judge_id}
              />
            );
          })}
      </div>
      <Button className="w-[420px] mt-[60px] mb-[70px]">확인</Button>
    </div>
  );
}
