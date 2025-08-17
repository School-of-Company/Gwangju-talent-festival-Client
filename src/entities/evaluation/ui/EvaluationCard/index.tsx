"use client";

import { CheckIcon } from "@/shared/asset/svg/CheckIcon";
import { Button } from "@/shared/ui";
import { useCallback, useEffect, useState } from "react";
import CustomDropdown from "../Dropdown";
import { Score } from "@/views/evaluation/model/score";
import { saveScore } from "../../api/saveScore";
import { toast } from "sonner";
import { colors } from "@/shared/utils/color";
import { cn } from "@/shared/utils/cn";

type ValueType = {
  value: number | string;
  write: boolean;
  max: number;
  show: boolean;
};

const scores: ValueType[] = [
  { value: 0, write: false, max: 40, show: false },
  { value: 0, write: false, max: 30, show: false },
  { value: 0, write: false, max: 30, show: false },
];
export default function EvaluationCard({
  judge_id,
  stage_manner_performance,
  completion_expression,
  creativity_composition,
  total_score,
  team_id,
  team_name,
  is_judged,
  is_performed,
}: Score) {
  const [values, setValues] = useState<ValueType[]>(scores);
  const [variant, setVariant] = useState<"submitted" | "active" | "disabled">("active");

  useEffect(() => {
    setValues(prev =>
      prev.map((item, idx) => (idx === 0 ? { ...item, value: stage_manner_performance } : item)),
    );
    setValues(prev =>
      prev.map((item, idx) => (idx === 1 ? { ...item, value: completion_expression } : item)),
    );
    setValues(prev =>
      prev.map((item, idx) => (idx === 1 ? { ...item, value: creativity_composition } : item)),
    );
    if (is_judged) {
      setVariant("submitted");
      return;
    } else if (!is_performed) {
      setVariant("disabled");
    }
  }, [
    judge_id,
    stage_manner_performance,
    completion_expression,
    creativity_composition,
    total_score,
    team_id,
    is_judged,
    is_performed,
  ]);

  const handleSave = useCallback(async () => {
    const res = await saveScore(
      team_id,
      Number(values[0].value),
      Number(values[1].value),
      Number(values[2].value),
    );
    if (res.status === 200) {
      toast.success("심사 내용이 저장되었습니다");
      setVariant("submitted");
    } else {
      toast.error("심사 내용 저장에 실패하였습니다");
      setVariant("active");
    }
  }, [team_id, values]);

  return (
    <ul
      className={cn(
        "w-full text-body3b flex py-14 border items-center rounded-md border-gray-100 border-solid justify-between px-24 pl-[80px]",
        !is_performed && "bg-#E9E9E9",
      )}
    >
      <li className="text-main-600">{team_id + ". " + team_name}</li>
      {values.map((v, i) => {
        return v.write ? (
          <input
            className="w-[46.53px]"
            key={i}
            max={v.max}
            min={0}
            type="number"
            value={v.value}
            onChange={e => {
              const val = e.target.value === "" ? 0 : Number(e.target.value);

              if (val <= v.max && val >= 0) {
                setValues(prev =>
                  prev.map((item, idx) => (idx === i ? { ...item, value: val } : item)),
                );
              }
            }}
            onBlur={() => {
              setValues(prev =>
                prev.map((item, idx) =>
                  idx === i
                    ? {
                        ...item,
                        value: item.value === 0 || Number.isNaN(item.value) ? 0 : item.value,
                        write: false,
                        show: false,
                      }
                    : item,
                ),
              );
            }}
            autoFocus
          />
        ) : (
          <CustomDropdown
            key={i}
            value={v.value}
            max={v.max}
            isOpen={v.show}
            onToggle={() => {
              setValues(prev =>
                prev.map((item, idx) => (idx === i ? { ...item, show: !item.show } : item)),
              );
            }}
            onSelect={selectedValue => {
              setValues(prev =>
                prev.map((item, idx) =>
                  idx === i ? { ...item, value: selectedValue, write: false, show: false } : item,
                ),
              );
            }}
            onDoubleClick={() => {
              setValues(prev =>
                prev.map((item, idx) => (idx === i ? { ...item, write: true, show: false } : item)),
              );
            }}
          />
        );
      })}
      <Button
        onClick={handleSave}
        variant={variant === "submitted" ? "secondary" : "default"}
        className={cn("py-12 px-16 gap-12 w-[126px] justify-center flex items-center")}
      >
        <CheckIcon color={variant === "active" ? "white" : colors.main[600]} />
        {is_performed && total_score}
      </Button>
    </ul>
  );
}
