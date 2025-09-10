import instance from "@/shared/lib/axios";

export const saveScore = async (
  team_id: number,
  stage_manner_performance: number,
  completion_expression: number,
  creativity_composition: number,
) => {
  try {
    const res = await instance.patch("/judge/" + team_id, {
      stage_manner_performance,
      completion_expression,
      creativity_composition,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
