import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleSignupFormSubmit } from "../handleSignupFormSubmit";

vi.mock("@/entities/user/api/signup", () => ({ signUp: vi.fn() }));

import { signUp } from "@/entities/user/api/signup";

const mockSignUp = vi.mocked(signUp);

const INITIAL_STATE = { values: {}, isValid: false, submitted: false };

const VALID_FORM = {
  phoneNumber: "01012345678",
  verificationCode: "123456",
  password: "pass1234",
  passwordConfirm: "pass1234",
};

function makeFormData(data: Record<string, string>) {
  const fd = new FormData();
  Object.entries(data).forEach(([k, v]) => fd.append(k, v));
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("handleSignupFormSubmit - 유효성 검사", () => {
  it("전화번호 형식이 잘못되면 API를 호출하지 않고 isValid: false를 반환한다", async () => {
    const result = await handleSignupFormSubmit(
      INITIAL_STATE,
      makeFormData({ ...VALID_FORM, phoneNumber: "010-1234-5678" }),
    );
    expect(result.isValid).toBe(false);
    expect(mockSignUp).not.toHaveBeenCalled();
    expect(Array.isArray(result.error)).toBe(true);
  });

  it("인증코드가 6자리가 아니면 isValid: false를 반환한다", async () => {
    const result = await handleSignupFormSubmit(
      INITIAL_STATE,
      makeFormData({ ...VALID_FORM, verificationCode: "12345" }),
    );
    expect(result.isValid).toBe(false);
    expect(mockSignUp).not.toHaveBeenCalled();
    expect(Array.isArray(result.error)).toBe(true);
  });

  it("비밀번호가 8자 미만이면 isValid: false를 반환한다", async () => {
    const result = await handleSignupFormSubmit(
      INITIAL_STATE,
      makeFormData({ ...VALID_FORM, password: "ab1", passwordConfirm: "ab1" }),
    );
    expect(result.isValid).toBe(false);
    expect(mockSignUp).not.toHaveBeenCalled();
    expect(Array.isArray(result.error)).toBe(true);
  });
});

describe("handleSignupFormSubmit - 비밀번호 확인", () => {
  it("비밀번호와 확인이 다르면 isValid: false와 에러 메시지를 반환한다", async () => {
    const result = await handleSignupFormSubmit(
      INITIAL_STATE,
      makeFormData({ ...VALID_FORM, passwordConfirm: "different1" }),
    );
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("비밀번호가 일치하지 않습니다.");
    expect(mockSignUp).not.toHaveBeenCalled();
  });
});

describe("handleSignupFormSubmit - 회원가입 성공", () => {
  it("/signin으로 리다이렉트한다", async () => {
    mockSignUp.mockResolvedValue({ success: true, message: "가입 완료" });
    const result = await handleSignupFormSubmit(INITIAL_STATE, makeFormData(VALID_FORM));
    expect(result.isValid).toBe(true);
    expect(result.shouldRedirect).toBe(true);
    expect(result.redirectTo).toBe("/signin");
  });

  it("signUp API에 올바른 데이터를 전달한다", async () => {
    mockSignUp.mockResolvedValue({ success: true, message: "가입 완료" });
    await handleSignupFormSubmit(INITIAL_STATE, makeFormData(VALID_FORM));
    expect(mockSignUp).toHaveBeenCalledWith({
      phone_number: "01012345678",
      code: "123456",
      password: "pass1234",
    });
  });
});

describe("handleSignupFormSubmit - 회원가입 실패", () => {
  it("API 오류 시 isValid: false와 에러 메시지를 반환한다", async () => {
    mockSignUp.mockRejectedValue(new Error("이미 가입된 번호입니다."));
    const result = await handleSignupFormSubmit(INITIAL_STATE, makeFormData(VALID_FORM));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("이미 가입된 번호입니다.");
  });

  it("알 수 없는 오류면 기본 메시지를 반환한다", async () => {
    mockSignUp.mockRejectedValue("unknown");
    const result = await handleSignupFormSubmit(INITIAL_STATE, makeFormData(VALID_FORM));
    expect(result.error).toBe("회원가입에 실패했습니다.");
  });
});
