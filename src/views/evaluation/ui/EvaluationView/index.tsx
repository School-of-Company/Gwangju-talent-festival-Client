"use client";

import EvaluationCard from "@/entities/evaluation/ui/EvaluationCard";
import Standard from "@/entities/evaluation/ui/Standard";
import { useGetEvaluations } from "../../model/useGetEvaluations";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/ui";
import { useGetEvaluation } from "../../model/useGetEvaluation";

export default function EvaluationView() {
  const { data } = useGetEvaluations();
  const [isOne, setIsOne] = useState(false);
  const [team, setTeam] = useState("");
  const { data: teamData } = useGetEvaluation(team, isOne);

  useEffect(() => {
    const es = new EventSource("/judge/changes", { withCredentials: true });

    es.onmessage = event => {
      try {
        const payload = JSON.parse(event.data);
        setTeam(payload.team_id);
      } catch (error) {
        throw error;
      }
    };

    es.onerror = e => {
      toast.error("현재 공연 중인 팀 조회 실패");
      console.log(e);
    };
    return () => {
      es.close();
    };
  }, []);
  const toggle = useCallback(() => {
    setIsOne(!isOne);
  }, [isOne]);
  return (
    <div className="flex items-center flex-col">
      <header className="flex w-full pt-24 justify-between px-24">
        <h1 className="text-body1b">공연 팀</h1>
        <div className="text-caption2b py-8">
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
