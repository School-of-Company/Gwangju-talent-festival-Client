import instance from "@/shared/lib/axios";
import axios from "axios";

export const postVote = async (star: number, team_id: number) => {
  try {
    return await instance.post("/api/vote", {
      select: true,
      star,
      team_id,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
