import { describe, it, expect } from "vitest";
import { isSafeRedirectPath } from "../safeRedirect";

describe("isSafeRedirectPath", () => {
  it("내부 절대 경로는 허용한다", () => {
    expect(isSafeRedirectPath("/vote")).toBe(true);
    expect(isSafeRedirectPath("/admin/dashboard")).toBe(true);
  });

  it("null/undefined/빈 문자열은 거부한다", () => {
    expect(isSafeRedirectPath(null)).toBe(false);
    expect(isSafeRedirectPath(undefined)).toBe(false);
    expect(isSafeRedirectPath("")).toBe(false);
  });

  it("외부 URL은 거부한다", () => {
    expect(isSafeRedirectPath("https://evil.com")).toBe(false);
    expect(isSafeRedirectPath("http://evil.com")).toBe(false);
  });

  it("protocol-relative URL(//evil.com)은 거부한다", () => {
    expect(isSafeRedirectPath("//evil.com")).toBe(false);
  });

  it("백슬래시 우회(/\\evil.com)는 거부한다", () => {
    expect(isSafeRedirectPath("/\\evil.com")).toBe(false);
  });

  it("/signin은 거부한다", () => {
    expect(isSafeRedirectPath("/signin")).toBe(false);
  });
});
