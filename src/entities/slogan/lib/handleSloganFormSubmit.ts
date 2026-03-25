import { toast } from "sonner";
import { SloganFormValues } from "../model/schema";
import { postSlogan } from "../api/postSlogan";

export async function handleSloganFormSubmit(values: SloganFormValues) {
  try {
    const res = await postSlogan(values);
    if (res.status === 200 || res.status === 201) {
      toast.success("슬로건이 제출되었습니다.");
      return res;
    }
  } catch {
    toast.error("슬로건 제출에 실패했습니다.");
  }
}
