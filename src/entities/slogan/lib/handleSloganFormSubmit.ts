import { toast } from "sonner";
import { SloganFormValues } from "../model/schema";
import { postSlogan } from "../api/postSlogan";

export async function handleSloganFormSubmit(values: SloganFormValues, isOutOfSchool: boolean) {
  try {
    const res = await postSlogan(values, isOutOfSchool);
    if (res.status === 200 || res.status === 201) {
      toast.success("슬로건이 제출되었습니다.");
      return res;
    } else {
      toast.error("슬로건 제출에 실패했습니다.");
    }
  } catch (error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    const msg = axiosError?.response?.data?.message;
    toast.error(msg ?? "슬로건 제출에 실패했습니다.");
  }
}
