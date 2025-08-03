import instance from "@/shared/lib/axios";
import { toast } from "sonner";

export const closeVote = async (id: string) => {
  try {
    const res = await instance.patch(`/admin/vote/${id}/close`);
    if (res.status === 200) {
      toast.success("투표가 종료되었습니다");
    }
  } catch (error) {
    toast.error("투표 종료에 실패하셨습니다");
    throw error;
  }
};
