import instance from "@/shared/lib/axios";
import { SloganFormValues } from "../model/schema";

export const postSlogan = async (data: SloganFormValues, isOutOfSchool: boolean) => {
  const { phone_number, classroom, grade, birthday, school, ...rest } = data;

  return await instance.post("/slogan", {
    ...rest,
    phoneNumber: phone_number,
    schoolStatus: isOutOfSchool ? "OUT_OF_SCHOOL" : "ENROLLED",
    ...(isOutOfSchool
      ? { birthDate: birthday || undefined }
      : { school, grade: Number(grade), classNum: Number(classroom) }),
  });
};
