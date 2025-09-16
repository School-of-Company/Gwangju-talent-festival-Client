"use client";

import { Score } from "@/views/evaluation/model/score";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui";
import DownArrow from "@/shared/asset/svg/DownArrow";
import UpArrow from "@/shared/asset/svg/UpArrow";
import { useCallback, useState } from "react";
import { saveScore } from "../../api/saveScore";
import { MAX } from "../../const/max";

export default function EvaluationCard({
  judge_id,
  stage_manner_performance,
  completion_expression,
  creativity_composition,
  team_id,
  team_name,
  is_performed,
}: Score) {
  const [perform, setPerform] = useState(stage_manner_performance);
  const [compleition, setCompleition] = useState(completion_expression);
  const [creativity, setCreativity] = useState(creativity_composition);

  const handleUp = useCallback((evaluationType: "perform" | "compleition" | "creativity") => {
    switch (evaluationType) {
      case "perform":
        setPerform(prev => Math.min(prev + 1, MAX.perform));
        break;
      case "compleition":
        setCompleition(prev => Math.min(prev + 1, MAX.compleition));
        break;
      case "creativity":
        setCreativity(prev => Math.min(prev + 1, MAX.creativity));
        break;
    }
  }, []);

  const handleDown = useCallback((evaluationType: "perform" | "compleition" | "creativity") => {
    switch (evaluationType) {
      case "perform":
        setPerform(prev => Math.max(prev - 1, 0));
        break;
      case "compleition":
        setCompleition(prev => Math.max(prev - 1, 0));
        break;
      case "creativity":
        setCreativity(prev => Math.max(prev - 1, 0));
        break;
    }
  }, []);

  const handleSave = useCallback(() => {
    saveScore(judge_id, perform, compleition, creativity);
  }, [judge_id, perform, compleition, creativity]);

  return (
    <div
      className={cn(
        "text-body1b grid grid-cols-6 py-14 border text-gray-300 mx-24 rounded-md border-gray-100 border-solid items-center text-center",
        !is_performed && "bg-#E9E9E9",
      )}
    >
      <div className="text-main-600 text-center">{team_id + ". " + team_name}</div>
      <div className="flex items-center justify-center gap-8">
        <span className="ml-12">{compleition}</span>
        <div onClick={() => handleDown("compleition")}>
          <DownArrow height={36} width={37} />
        </div>
        <div onClick={() => handleUp("compleition")}>
          <UpArrow />
        </div>
      </div>
      <div className="flex items-center justify-center gap-8">
        <span className="ml-12">{creativity}</span>
        <div onClick={() => handleDown("creativity")}>
          <DownArrow height={36} width={37} />
        </div>
        <div onClick={() => handleUp("creativity")}>
          <UpArrow />
        </div>
      </div>
      <div className="flex items-center justify-center gap-8">
        <span className="ml-12">{perform}</span>
        <div onClick={() => handleDown("perform")}>
          <DownArrow height={36} width={37} />
        </div>
        <div onClick={() => handleUp("perform")}>
          <UpArrow />
        </div>
      </div>
      <div className="text-main-600 text-center">{perform + compleition + creativity}</div>
      <div className="w-full flex justify-center px-24 gap-24">
        <Button onClick={handleSave} className="text-body2b w-1/2">
          저장
        </Button>
      </div>
    </div>
  );
}
