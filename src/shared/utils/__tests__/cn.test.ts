import { describe, it, expect } from "vitest";
import { cn, customTwMerge } from "../cn";

describe("customTwMerge", () => {
  it("커스텀 폰트 사이즈 클래스끼리 중복 시 마지막 클래스만 남긴다", () => {
    expect(customTwMerge("text-h1", "text-h2")).toBe("text-h2");
    expect(customTwMerge("text-body1b", "text-caption1r")).toBe("text-caption1r");
  });

  it("표준 Tailwind 폰트 사이즈 중복 시 마지막 클래스만 남긴다", () => {
    expect(customTwMerge("text-sm", "text-lg")).toBe("text-lg");
  });

  it("배경색 클래스 중복 시 마지막 클래스만 남긴다", () => {
    expect(customTwMerge("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("충돌하지 않는 클래스는 모두 유지된다", () => {
    expect(customTwMerge("text-h1", "font-bold")).toBe("text-h1 font-bold");
  });

  it("커스텀 텍스트 컬러 클래스 중복 시 마지막 클래스만 남긴다", () => {
    expect(customTwMerge("text-main-100", "text-main-200")).toBe("text-main-200");
    expect(customTwMerge("text-gray-100", "text-gray-700")).toBe("text-gray-700");
    expect(customTwMerge("text-system-success", "text-system-error")).toBe("text-system-error");
  });

  it("커스텀 텍스트 컬러와 black/white 중복 시 마지막 클래스만 남긴다", () => {
    expect(customTwMerge("text-black", "text-main-500")).toBe("text-main-500");
    expect(customTwMerge("text-main-300", "text-white")).toBe("text-white");
  });
});

describe("cn", () => {
  it("단일 클래스 문자열을 그대로 반환한다", () => {
    expect(cn("px-4")).toBe("px-4");
  });

  it("여러 클래스를 공백으로 연결한다", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("truthy 조건 클래스를 포함한다", () => {
    expect(cn("base", true && "active")).toBe("base active");
  });

  it("falsy 조건 클래스를 제외한다", () => {
    expect(cn("base", false && "hidden")).toBe("base");
  });

  it("객체 문법에서 true 키만 포함한다", () => {
    expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe("text-red-500");
  });

  it("배열 문법을 처리한다", () => {
    expect(cn(["px-4", "py-2"])).toBe("px-4 py-2");
  });

  it("undefined와 null을 무시한다", () => {
    expect(cn("base", undefined, null)).toBe("base");
  });

  it("빈 문자열을 무시한다", () => {
    expect(cn("base", "", "extra")).toBe("base extra");
  });

  it("Tailwind 클래스 충돌 시 tw-merge가 적용된다", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
    expect(cn("text-h1", "text-h3")).toBe("text-h3");
  });

  it("조건부 + 충돌 병합을 함께 처리한다", () => {
    const isLarge = true;
    expect(cn("text-sm", isLarge && "text-lg")).toBe("text-lg");
  });
});
