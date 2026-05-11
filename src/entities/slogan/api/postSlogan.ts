import instance from "@/shared/lib/axios";
import { SloganFormValues } from "../model/schema";

export const postSlogan = async (data: SloganFormValues, isOutOfSchool: boolean) => {
  const { phone_number, classroom, grade, birthday, school, ...rest } = data;

  if (isOutOfSchool) {
    return await instance.post("/slogan", {
      ...rest,
      phoneNumber: phone_number,
      schoolStatus: "OUT_OF_SCHOOL",
      birthDate: birthday || undefined,
    });
  }

  return await instance.post("/slogan", {
    ...rest,
    phoneNumber: phone_number,
    schoolStatus: "ENROLLED",
    school,
    grade: Number(grade),
    classNum: Number(classroom),
  });
};
