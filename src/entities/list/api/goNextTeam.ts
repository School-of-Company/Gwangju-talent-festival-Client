import instance from "@/shared/lib/axios";
import { toast } from "sonner";

export const goNextTeam = async (team_id: string) => {
  try {
    const res = await instance.patch("/team/" + team_id);
    if (res.status === 200) {
      toast.success("투표가 시작되었습니다");
    }
  } catch (error) {
    toast.error("투표 시작에 실패하였습니다");
    throw error;
  }
};
