"use client";

import { Score } from "@/views/evaluation/model/score";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui";
import DownArrow from "@/shared/asset/svg/DownArrow";
import UpArrow from "@/shared/asset/svg/UpArrow";

export default function EvaluationCard({
  // judge_id,
  stage_manner_performance,
  completion_expression,
  creativity_composition,
  total_score,
  team_id,
  team_name,
  // is_judged,
  is_performed,
}: Score) {
  return (
    <div
      className={cn(
        "text-body1b grid grid-cols-6 py-14 border text-gray-300 mx-24 rounded-md border-gray-100 border-solid items-center text-center",
        !is_performed && "bg-#E9E9E9",
      )}
    >
      <div className="text-main-500 text-center">{team_id + ". " + team_name}</div>
      <div className="flex items-center justify-center gap-8">
        <span className="ml-12">{completion_expression}</span>
        <DownArrow height={36} width={37} />
        <UpArrow />
      </div>
      <div className="flex items-center justify-center gap-8">
        <span className="ml-12">{creativity_composition}</span>
        <DownArrow height={36} width={37} />
        <UpArrow />
      </div>
      <div className="flex items-center justify-center gap-8">
        <span className="ml-12">{stage_manner_performance}</span>
        <DownArrow height={36} width={37} />
        <UpArrow />
      </div>
      <div>{total_score}</div>
      <div className="w-full flex justify-center px-24 gap-24">
        <Button className="text-body2b w-1/2">저장</Button>
        <Button className="text-body2b w-1/2">수정</Button>
      </div>
    </div>
  );
}
