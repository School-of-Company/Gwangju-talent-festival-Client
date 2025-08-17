import instance from "@/shared/lib/axios";

export const saveScore = async (team_id: number) => {
  try {
    const res = await instance.post("/judge/" + team_id);
    return res;
  } catch (error) {
    throw error;
  }
};
