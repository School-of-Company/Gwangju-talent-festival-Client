import instance from "@/shared/lib/axios";

export const postVote = async (teamName: string, team_id: number) => {
  try {
    return await instance.post("vote", {
      select: true,
      teamName,
      team_id,
    });
  } catch (error) {
    throw error;
  }
};
