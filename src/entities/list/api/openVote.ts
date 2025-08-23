import instance from "@/shared/lib/axios";
import { toast } from "sonner";

export const openVote = async (id: string) => {
  try {
    const res = await instance.post(`/vote/${id}`);
    if (res.status === 200) {
      toast.success("투표가 시작되었습니다");
    }
  } catch (error) {
    toast.error("투표 시작에 실패하였습니다");
    throw error;
  }
};
