"use client";

import EvaluationCard from "@/entities/evaluation/ui/EvaluationCard";
import Standard from "@/entities/evaluation/ui/Standard";
import { useGetEvaluations } from "../../model/useGetEvaluations";

export default function EvaluationView() {
  const { data: teams } = useGetEvaluations();
  return (
    <div className="flex items-center flex-col justify-center ">
      <header className="flex w-full pt-24 justify-center px-24">
        <h1 className="text-body1b">공연 팀 심사</h1>
      </header>
      <Standard />
      <div className="justify-center flex flex-col gap-24 w-full">
        {teams?.map(v => {
          return (
            <EvaluationCard
              key={v.team_id}
              creativity_composition={v.creativity_composition}
              team_id={v.team_id}
              total_score={v.total_score}
              completion_expression={v.completion_expression}
              stage_manner_performance={v.stage_manner_performance}
              team_name={v.team_name}
              is_judged={v.is_judged}
              is_performed={v.is_performed}
            />
          );
        })}
      </div>
    </div>
  );
}
