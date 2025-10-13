import instance from "@/shared/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const saveScore = async (
  team_id: number,
  stage_manner_performance: number,
  completion_expression: number,
  creativity_composition: number,
) => {
  try {
    const res = await instance.patch("/api/judge/" + team_id, {
      stage_manner_performance,
      completion_expression,
      creativity_composition,
    });
    if (res.status === 200) {
      toast.success("심사가 저장되었습니다");
    }
    return res;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError?.response?.data &&
      typeof axiosError.response.data === "object" &&
      "message" in axiosError.response.data
        ? (axiosError.response.data as { message: string }).message
        : "심사 실패했습니다.";
    throw new Error(errorMessage);
  }
};
