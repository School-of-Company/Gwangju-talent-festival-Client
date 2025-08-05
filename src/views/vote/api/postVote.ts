import instance from "@/shared/lib/axios";

export const postVote = (teamName: string, team_id: number) => {
  try {
    return instance.post("vote", {
      select: true,
      teamName,
      team_id,
    });
  } catch (error) {
    throw error;
  }
};
