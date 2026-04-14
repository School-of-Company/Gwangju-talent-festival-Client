import { describe, it, expect } from "vitest";
import { ease } from "../ease";

/**
 * 베지어 제어점: p1=(0.67, 0.005), p2=(0.27, 1.0)
 *
 * 계수:
 *   cx = 2.01,  bx = -3.21, ax = 2.2
 *   cy = 0.015, by =  2.97,  ay = -1.985
 *
 * 기준점 (매개변수 t에서의 정확한 (X, Y) 값):
 *   t=0.25 → X=0.33625,  Y≈0.158359
 *   t=0.5  → X=0.4775,   Y≈0.501875
 *   t=0.75 → X=0.63,     Y≈0.844453
 */

describe("ease - 경계 조건", () => {
  it("ease(0)은 0을 반환한다", () => {
    expect(ease(0)).toBe(0);
  });

  it("ease(1)은 1을 반환한다", () => {
    expect(ease(1)).toBe(1);
  });

  it("음수 입력은 0을 반환한다", () => {
    expect(ease(-0.1)).toBe(0);
    expect(ease(-1)).toBe(0);
  });

  it("1 초과 입력은 1을 반환한다", () => {
    expect(ease(1.1)).toBe(1);
    expect(ease(2)).toBe(1);
  });
});

describe("ease - 수치 정확도", () => {
  it("t=0.5에서의 베지어 값을 정확히 계산한다 (x=0.4775 → y≈0.501875)", () => {
    // X(0.5) = 0.4775, Y(0.5) = 0.501875
    expect(ease(0.4775)).toBeCloseTo(0.501875, 5);
  });

  it("t=0.25에서의 베지어 값을 정확히 계산한다 (x=0.33625 → y≈0.158359)", () => {
    // X(0.25) = 0.33625, Y(0.25) = 0.158359375
    expect(ease(0.33625)).toBeCloseTo(0.158359, 5);
  });

  it("t=0.75에서의 베지어 값을 정확히 계산한다 (x=0.63 → y≈0.844453)", () => {
    // X(0.75) = 0.63, Y(0.75) = 0.844453125
    expect(ease(0.63)).toBeCloseTo(0.844453, 5);
  });
});

describe("ease - 단조증가 및 범위", () => {
  it("출력이 항상 [0, 1] 범위에 있다", () => {
    const samples = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    for (const x of samples) {
      const y = ease(x);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(1);
    }
  });

  it("단조증가 성질을 만족한다", () => {
    const samples = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    const outputs = samples.map(ease);
    for (let i = 0; i < outputs.length - 1; i++) {
      expect(outputs[i]).toBeLessThan(outputs[i + 1]);
    }
  });
});
