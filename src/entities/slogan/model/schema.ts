import { phoneNumberSchema } from "@/shared/model/phoneNumberSchema";
import { z } from "zod";

export const sloganNameSchema = z.string().min(1, "슬로건을 입력해주세요.").max(100);

export const sloganDescriptionSchema = z.string().min(1, "슬로건 설명을 입력해주세요.").max(1000);

export const gradeSchema = z
  .string()
  .min(1, "학년을 입력해주세요.")
  .refine(val => Number(val) <= 3, "학년은 3학년까지 입력할 수 있습니다.");

export const classroomSchema = z
  .string()
  .min(1, "반을 입력해주세요.")
  .refine(val => Number(val) <= 99, "반은 두자릿수 이내로 입력 해주세요.");

export const sloganSchema = z.object({
  slogan: sloganNameSchema,
  description: sloganDescriptionSchema,
  name: z
    .string()
    .min(1, "이름을 입력해주세요.")
    .regex(/^[가-힣a-zA-Z\s]+$/, "올바르지 않은 형식입니다."),
  school: z.string().min(1, "학교를 입력해주세요."),
  grade: gradeSchema,
  classroom: classroomSchema,
  phone_number: phoneNumberSchema,
  birthday: z.string().optional(),
});

export const outOfSchoolSloganSchema = sloganSchema
  .omit({
    school: true,
    grade: true,
    classroom: true,
  })
  .extend({
    birthday: z
      .string()
      .min(1, "생년월일을 입력해주세요.")
      .regex(/^\d{4}\/\d{2}\/\d{2}$/, "올바르지 않은 형식입니다."),
  });

export type SloganFormValues = z.infer<typeof sloganSchema>;
