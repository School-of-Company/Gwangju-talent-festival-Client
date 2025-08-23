import instance from "@/shared/lib/axios";

export const postVote = async (star: number, team_id: number) => {
  try {
    return await instance.post("vote", {
      select: true,
      star,
      team_id,
    });
  } catch (error) {
    throw error;
  }
};
