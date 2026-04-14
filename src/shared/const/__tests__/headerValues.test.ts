import { describe, it, expect } from "vitest";
import { isHiddenPath } from "../headerValues";

describe("isHiddenPath", () => {
  describe("헤더를 숨겨야 하는 경로 → true", () => {
    it("/signin 경로에서 true를 반환한다", () => {
      expect(isHiddenPath("/signin")).toBe(true);
    });

    it("/signin 하위 경로에서 true를 반환한다", () => {
      expect(isHiddenPath("/signin/callback")).toBe(true);
      expect(isHiddenPath("/signin/oauth")).toBe(true);
    });

    it("/signup 경로에서 true를 반환한다", () => {
      expect(isHiddenPath("/signup")).toBe(true);
    });

    it("/signup 하위 경로에서 true를 반환한다", () => {
      expect(isHiddenPath("/signup/complete")).toBe(true);
    });

    it("/vote 경로에서 true를 반환한다", () => {
      expect(isHiddenPath("/vote")).toBe(true);
    });

    it("/vote 하위 경로에서 true를 반환한다", () => {
      expect(isHiddenPath("/vote/1")).toBe(true);
      expect(isHiddenPath("/vote/result")).toBe(true);
    });

    it("/admin 경로에서 true를 반환한다", () => {
      expect(isHiddenPath("/admin")).toBe(true);
    });

    it("/admin 하위 경로에서 true를 반환한다", () => {
      expect(isHiddenPath("/admin/dashboard")).toBe(true);
      expect(isHiddenPath("/admin/users/1")).toBe(true);
    });
  });

  describe("헤더를 표시해야 하는 경로 → false", () => {
    it("루트 경로에서 false를 반환한다", () => {
      expect(isHiddenPath("/")).toBe(false);
    });

    it("일반 페이지 경로에서 false를 반환한다", () => {
      expect(isHiddenPath("/home")).toBe(false);
      expect(isHiddenPath("/profile")).toBe(false);
      expect(isHiddenPath("/schedule")).toBe(false);
    });

    it("숨김 prefix와 비슷하지만 독립된 경로에서 false를 반환한다", () => {
      expect(isHiddenPath("/sign")).toBe(false);
      expect(isHiddenPath("/voters")).toBe(false);
      expect(isHiddenPath("/vote-info")).toBe(false);
      expect(isHiddenPath("/admins")).toBe(false);
    });
  });
});
