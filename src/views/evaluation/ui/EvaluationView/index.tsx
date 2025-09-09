"use client";

import EvaluationCard from "@/entities/evaluation/ui/EvaluationCard";
import Standard from "@/entities/evaluation/ui/Standard";
import { useGetEvaluations } from "../../model/useGetEvaluations";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/shared/ui";
import { useGetEvaluation } from "../../model/useGetEvaluation";
import { changePerformOrder } from "@/views/evaluation/api/changePerformOrder";

export default function EvaluationView() {
  const [isOne, setIsOne] = useState(false);
  const { data } = useGetEvaluations(isOne);
  const [team, setTeam] = useState("");
  const { data: teamData } = useGetEvaluation(team, isOne);

  useEffect(() => {
    changePerformOrder((teamId: number) => {
      setTeam(String(teamId));
    });
  }, []);
  const toggle = useCallback(() => {
    setIsOne(!isOne);
  }, [isOne]);
  return (
    <div className="flex items-center flex-col justify-center ">
      <header className="flex w-full pt-24 justify-between px-24">
        <h1 className="text-body1b">공연 팀</h1>
        <div className="text-caption2b flex gap-12 py-8">
          <Button onClick={toggle} variant={isOne ? "secondary" : "default"}>
            전체보기
          </Button>
          <Button onClick={toggle} variant={isOne ? "default" : "secondary"}>
            개별보기
          </Button>
        </div>
      </header>
      <Standard />
      <div className="justify-center flex flex-col gap-24 w-full">
        {isOne && teamData ? (
          <EvaluationCard
            creativity_composition={teamData.creativity_composition}
            judge_id={teamData.judge_id}
            team_id={teamData.team_id}
            total_score={teamData.total_score}
            completion_expression={teamData.completion_expression}
            stage_manner_performance={teamData.stage_manner_performance}
            team_name={teamData.team_name}
            is_judged={teamData.is_judged}
            is_performed={teamData.is_performed}
          />
        ) : (
          data &&
          data.map((v, i) => {
            return (
              <EvaluationCard
                completion_expression={v.completion_expression}
                creativity_composition={v.creativity_composition}
                judge_id={v.judge_id}
                total_score={v.total_score}
                stage_manner_performance={v.stage_manner_performance}
                team_id={v.team_id}
                team_name={v.team_name}
                key={i}
                is_judged={v.is_judged}
                is_performed={v.is_performed}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
