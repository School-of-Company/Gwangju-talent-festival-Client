import { describe, it, expect } from "vitest"
import { getSectionFromKey } from "../types"

describe("getSectionFromKey - 섹션 키 변환", () => {
  it("section_a를 A로 변환한다", () => {
    expect(getSectionFromKey("section_a")).toBe("A")
  })

  it("모든 유효한 섹션 키를 올바르게 변환한다", () => {
    const cases = [
      ["section_a", "A"],
      ["section_b", "B"],
      ["section_c", "C"],
      ["section_d", "D"],
      ["section_e", "E"],
      ["section_f", "F"],
      ["section_g", "G"],
      ["section_h", "H"],
      ["section_i", "I"],
      ["section_j", "J"],
    ] as const

    cases.forEach(([key, expected]) => {
      expect(getSectionFromKey(key)).toBe(expected)
    })
  })

  it("유효하지 않은 섹션 키면 에러를 던진다", () => {
    expect(() =>
      getSectionFromKey("section_z" as Parameters<typeof getSectionFromKey>[0]),
    ).toThrow("Invalid section key: section_z")
  })
})
