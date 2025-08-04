import instance from "@/shared/lib/axios";
import { toast } from "sonner";

export const startCount = async (id: string) => {
  try {
    const res = await instance.post("/admin/vote/" + id);
    if (res.status === 200) toast.success("집계 시작되었습니다");
  } catch (error) {
    toast.error("집계 시작에 실패했습니다");
    throw error;
  }
};
