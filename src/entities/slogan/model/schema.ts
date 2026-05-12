import { phoneNumberSchema } from "@/shared/model/phoneNumberSchema";
import { z } from "zod";

export const sloganNameSchema = z.string().min(1, "슬로건을 입력해주세요.").max(100);

export const sloganDescriptionSchema = z.string().min(1, "슬로건 설명을 입력해주세요.").max(1000);

export const gradeSchema = z
  .string()
  .min(1, "학년을 입력해주세요.")
  .refine(val => /^\d+$/.test(val), "학년은 숫자만 입력할 수 있습니다.")
  .refine(val => Number(val) >= 1, "학년은 1학년 이상 입력해주세요.")
  .refine(val => Number(val) <= 3, "학년은 3학년까지 입력할 수 있습니다.");

export const classroomSchema = z
  .string()
  .min(1, "반을 입력해주세요.")
  .refine(val => /^\d+$/.test(val), "반은 숫자만 입력할 수 있습니다.")
  .refine(val => Number(val) >= 1, "반은 1반 이상 입력해주세요.")
  .refine(val => Number(val) <= 99, "반은 두자릿수 이내로 입력 해주세요.");

const sharedSloganFields = {
  slogan: sloganNameSchema,
  description: sloganDescriptionSchema,
  name: z
    .string()
    .min(1, "이름을 입력해주세요.")
    .regex(/^[가-힣a-zA-Z\s]+$/, "올바르지 않은 형식입니다."),
  phone_number: phoneNumberSchema,
};

export const sloganSchema = z.object({
  ...sharedSloganFields,
  school: z.string().min(1, "학교를 입력해주세요."),
  grade: gradeSchema,
  classroom: classroomSchema,
});

export const outOfSchoolSloganSchema = z.object({
  ...sharedSloganFields,
  birthday: z
    .string()
    .min(1, "생년월일을 선택해주세요.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "올바르지 않은 형식입니다."),
});

export interface SloganFormValues {
  slogan: string;
  description: string;
  name: string;
  phone_number: string;
  school: string;
  grade: string;
  classroom: string;
  birthday: string;
}
