import instance from "@/shared/lib/axios";

export const getEvaluation = async (team_id: string) => {
  try {
    const res = await instance.get("/judge/" + team_id);
    return res.data;
  } catch (error) {
    throw error;
  }
};
