import instance from "@/shared/lib/axios";
import { toast } from "sonner";

export const getEvaluation = async (team_id: string) => {
  try {
    const res = await instance.get("/api/judge/" + team_id);
    return res.data;
  } catch (error) {
    toast.error("현재 공연중인 팀이 존재하지 않습니다");
    throw error;
  }
};
