import { describe, it, expect } from "vitest";
import {
  sloganNameSchema,
  sloganDescriptionSchema,
  gradeSchema,
  classroomSchema,
  sloganSchema,
} from "../schema";

describe("sloganNameSchema", () => {
  it("1자 이상이면 유효하다", () => {
    expect(sloganNameSchema.safeParse("광주인재페스티벌").success).toBe(true);
  });

  it("빈 값이면 실패한다", () => {
    const result = sloganNameSchema.safeParse("");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("슬로건을 입력해주세요.");
  });

  it("100자를 초과하면 실패한다", () => {
    expect(sloganNameSchema.safeParse("a".repeat(101)).success).toBe(false);
  });
});

describe("sloganDescriptionSchema", () => {
  it("1자 이상이면 유효하다", () => {
    expect(sloganDescriptionSchema.safeParse("슬로건 설명입니다.").success).toBe(true);
  });

  it("빈 값이면 실패한다", () => {
    const result = sloganDescriptionSchema.safeParse("");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("슬로건 설명을 입력해주세요.");
  });

  it("1000자를 초과하면 실패한다", () => {
    expect(sloganDescriptionSchema.safeParse("a".repeat(1001)).success).toBe(false);
  });
});

describe("gradeSchema", () => {
  it("숫자 문자열이면 유효하다", () => {
    expect(gradeSchema.safeParse("3").success).toBe(true);
  });

  it("빈 값이면 실패한다", () => {
    expect(gradeSchema.safeParse("").success).toBe(false);
  });

  it("숫자가 아닌 문자가 포함되면 실패한다", () => {
    const result = gradeSchema.safeParse("3학년");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("학년은 숫자만 입력할 수 있습니다.");
  });

  it("0이면 실패한다", () => {
    const result = gradeSchema.safeParse("0");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("학년은 1학년 이상 입력해주세요.");
  });

  it("4 이상이면 실패한다", () => {
    expect(gradeSchema.safeParse("4").success).toBe(false);
  });
});

describe("classroomSchema", () => {
  it("숫자 문자열이면 유효하다", () => {
    expect(classroomSchema.safeParse("5").success).toBe(true);
  });

  it("빈 값이면 실패한다", () => {
    expect(classroomSchema.safeParse("").success).toBe(false);
  });

  it("숫자가 아닌 문자가 포함되면 실패한다", () => {
    const result = classroomSchema.safeParse("5반");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("반은 숫자만 입력할 수 있습니다.");
  });

  it("0이면 실패한다", () => {
    const result = classroomSchema.safeParse("0");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("반은 1반 이상 입력해주세요.");
  });

  it("100 이상이면 실패한다", () => {
    expect(classroomSchema.safeParse("100").success).toBe(false);
  });
});

describe("sloganSchema", () => {
  const valid = {
    slogan: "광주인재페스티벌",
    description: "슬로건 설명입니다.",
    school: "광주고등학교",
    name: "홍길동",
    grade: "3",
    classroom: "5",
    phone_number: "01012345678",
  };

  it("모든 필드가 올바르면 유효하다", () => {
    expect(sloganSchema.safeParse(valid).success).toBe(true);
  });

  it("슬로건이 빈 값이면 실패한다", () => {
    expect(sloganSchema.safeParse({ ...valid, slogan: "" }).success).toBe(false);
  });

  it("학년에 숫자가 아닌 값이 있으면 실패한다", () => {
    expect(sloganSchema.safeParse({ ...valid, grade: "삼" }).success).toBe(false);
  });

  it("반에 숫자가 아닌 값이 있으면 실패한다", () => {
    expect(sloganSchema.safeParse({ ...valid, classroom: "오" }).success).toBe(false);
  });

  it("전화번호 형식이 잘못되면 실패한다", () => {
    expect(sloganSchema.safeParse({ ...valid, phone_number: "010-1234-5678" }).success).toBe(false);
  });
});
