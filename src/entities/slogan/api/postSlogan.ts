import instance from "@/shared/lib/axios";
import { SloganFormValues } from "../model/schema";

export const postSlogan = async (data: SloganFormValues) => {
  const { phone_number, classroom, grade, ...rest } = data;
  return await instance.post("/slogan", {
    ...rest,
    phoneNumber: phone_number,
    grade: Number(grade),
    classNum: Number(classroom),
  });
};
