import instance from "@/shared/lib/axios";
import { toast } from "sonner";

export const closeVote = async (id: string) => {
  try {
    const res = await instance.delete(`/api/vote/${id}`);
    if (res.status === 200) {
      toast.success("투표가 종료되었습니다");
    }
  } catch (error) {
    toast.error("투표 종료에 실패했습니다");
    throw error;
  }
};
