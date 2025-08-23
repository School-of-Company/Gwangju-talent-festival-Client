import instance from "@/shared/lib/axios";

export const getVote = async (team: string) => {
  try {
    const res = await instance.get("/vote/" + team);
    return res.data;
  } catch (error) {
    throw error;
  }
};
