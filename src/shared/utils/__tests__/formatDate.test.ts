import { describe, it, expect } from "vitest";
import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("월은 패딩 없이, 일은 2자리로 포맷된다", () => {
    // 2025-01-05 (일요일)
    const date = new Date(2025, 0, 5);
    expect(formatDate(date)).toBe("1.05(일)");
  });

  it("두 자리 월을 올바르게 포맷한다", () => {
    // 2025-12-25 (목요일)
    const date = new Date(2025, 11, 25);
    expect(formatDate(date)).toBe("12.25(목)");
  });

  it("일이 이미 두 자리인 경우 그대로 유지된다", () => {
    // 2025-01-11 (토요일) - padStart(2, "0")이 적용되지만 변화 없음
    const date = new Date(2025, 0, 11);
    expect(formatDate(date)).toBe("1.11(토)");
  });

  it("모든 요일이 올바르게 표시된다", () => {
    // 2025-01-05 ~ 2025-01-11: 일, 월, 화, 수, 목, 금, 토
    const expected = ["일", "월", "화", "수", "목", "금", "토"];
    expected.forEach((day, i) => {
      const date = new Date(2025, 0, 5 + i);
      expect(formatDate(date)).toContain(`(${day})`);
    });
  });

  it("일이 한 자리일 때 앞에 0을 붙인다", () => {
    // 2025-03-05 (수요일)
    const date = new Date(2025, 2, 5);
    expect(formatDate(date)).toBe("3.05(수)");
  });

  it("포맷 구조가 'M.DD(요일)' 형태를 따른다", () => {
    const date = new Date(2025, 5, 20); // 2025-06-20
    const result = formatDate(date);
    expect(result).toMatch(/^\d{1,2}\.\d{2}\([가-힣]\)$/);
  });
});
