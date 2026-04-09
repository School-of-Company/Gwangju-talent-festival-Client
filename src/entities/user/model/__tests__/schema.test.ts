import { describe, it, expect } from "vitest";
import {
  passwordSchema,
  verificationCodeSchema,
  signinSchema,
  signUpSchema,
} from "../schema";

describe("passwordSchema", () => {
  it("8자 이상 영문+숫자 포함이면 유효하다", () => {
    expect(passwordSchema.safeParse("abc12345").success).toBe(true);
  });

  it("8자 미만이면 실패한다", () => {
    const result = passwordSchema.safeParse("ab1234");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("비밀번호는 최소 8자 이상이어야 합니다.");
  });

  it("숫자가 없으면 실패한다", () => {
    const result = passwordSchema.safeParse("abcdefgh");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("비밀번호는 영문과 숫자를 포함해야 합니다.");
  });

  it("영문이 없으면 실패한다", () => {
    const result = passwordSchema.safeParse("12345678");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("비밀번호는 영문과 숫자를 포함해야 합니다.");
  });
});

describe("verificationCodeSchema", () => {
  it("6자리면 유효하다", () => {
    expect(verificationCodeSchema.safeParse("123456").success).toBe(true);
  });

  it("빈 값이면 실패한다", () => {
    const result = verificationCodeSchema.safeParse("");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("인증번호를 입력해주세요.");
  });

  it("6자리 미만이면 실패한다", () => {
    const result = verificationCodeSchema.safeParse("12345");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("인증번호는 6자리여야 합니다.");
  });

  it("6자리 초과면 실패한다", () => {
    const result = verificationCodeSchema.safeParse("1234567");
    expect(result.success).toBe(false);
  });
});

describe("signinSchema", () => {
  it("올바른 전화번호와 비밀번호면 유효하다", () => {
    expect(signinSchema.safeParse({ phoneNumber: "01012345678", password: "pass1234" }).success).toBe(true);
  });

  it("전화번호 형식이 잘못되면 실패한다", () => {
    expect(signinSchema.safeParse({ phoneNumber: "010-1234-5678", password: "pass1234" }).success).toBe(false);
  });

  it("비밀번호가 짧으면 실패한다", () => {
    expect(signinSchema.safeParse({ phoneNumber: "01012345678", password: "ab1" }).success).toBe(false);
  });
});

describe("signUpSchema", () => {
  it("모든 필드가 올바르면 유효하다", () => {
    expect(
      signUpSchema.safeParse({
        phoneNumber: "01012345678",
        verificationCode: "123456",
        password: "pass1234",
        passwordConfirm: "pass1234",
      }).success,
    ).toBe(true);
  });

  it("인증코드가 없으면 실패한다", () => {
    expect(
      signUpSchema.safeParse({
        phoneNumber: "01012345678",
        verificationCode: "",
        password: "pass1234",
        passwordConfirm: "pass1234",
      }).success,
    ).toBe(false);
  });
});
