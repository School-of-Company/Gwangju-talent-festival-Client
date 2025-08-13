export const EVALUATION_CATEGORY = {
  COMPLETION_EXPRESSION: "완성도 및 표현력",
  CREATIVITY_COMPOSITION: "창의력과 구성",
  STAGE_MANNER_PERFORMANCE: "무대매너 및 퍼포먼스",
} as const;

export type EvaluationCategory = keyof typeof EVALUATION_CATEGORY;
