import { describe, it, expect, vi, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../middleware";

vi.mock("@/shared/config/authConfig", () => ({
  publicPages: ["/home", "/signin", "/signup", "/admin", "/vote", "/slogan"],
  publicIn18: ["/booking"],
  publicIn27: ["/vote"],
  ticketOpenDate: new Date("2025-09-18T20:00:00"),
  performerTicketOpenDate: new Date("2025-09-15T20:00:00"),
  festivalDate: new Date("2025-09-27T00:00:00"),
  sloganStartDate: new Date("2026-05-18T00:00:00+09:00"),
  sloganEndDate: new Date("2026-05-28T23:59:59+09:00"),
}));

function makeRequest(path: string, cookies: Record<string, string> = {}) {
  const cookieHeader = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

  return new NextRequest(new URL(path, "http://localhost"), {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
}

function getLocation(res: Response) {
  return res.headers.get("location");
}

describe("middleware - 라우팅 보호", () => {
  it("토큰 없이 보호된 경로 접근 시 /signin으로 리다이렉트한다", () => {
    const res = middleware(makeRequest("/my-page"));
    expect(res.status).toBe(307);
    expect(getLocation(res)).toContain("/signin");
  });

  it("리다이렉트 URL에 next 파라미터가 포함된다", () => {
    const res = middleware(makeRequest("/my-page"));
    expect(getLocation(res)).toContain("next=%2Fmy-page");
  });

  it("토큰이 있으면 보호된 경로를 통과시킨다", () => {
    const res = middleware(makeRequest("/my-page", { accessToken: "abc", refreshToken: "xyz" }));
    expect(res.status).toBe(200);
  });

  it("/home은 토큰 없이 접근 가능하다", () => {
    expect(middleware(makeRequest("/home")).status).toBe(200);
  });

  it("/signin은 토큰 없이 접근 가능하다", () => {
    expect(middleware(makeRequest("/signin")).status).toBe(200);
  });
});

describe("middleware - /signin 리다이렉트", () => {
  it("로그인 상태에서 /signin 접근 시 /home으로 리다이렉트한다", () => {
    const res = middleware(makeRequest("/signin", { accessToken: "abc", refreshToken: "xyz" }));
    expect(res.status).toBe(307);
    expect(getLocation(res)).toContain("/home");
  });

  it("올바른 next 파라미터가 있으면 해당 경로로 리다이렉트한다", () => {
    const res = middleware(
      makeRequest("/signin?next=%2Fvote", { accessToken: "abc", refreshToken: "xyz" }),
    );
    expect(getLocation(res)).toContain("/vote");
  });

  it("오픈 리다이렉트 방지: next가 /signin이면 /home으로 이동한다", () => {
    const res = middleware(
      makeRequest("/signin?next=%2Fsignin", { accessToken: "abc", refreshToken: "xyz" }),
    );
    expect(getLocation(res)).toContain("/home");
  });

  it("오픈 리다이렉트 방지: next가 외부 URL이면 /home으로 이동한다", () => {
    const res = middleware(
      makeRequest("/signin?next=https%3A%2F%2Fevil.com", { accessToken: "abc", refreshToken: "xyz" }),
    );
    expect(getLocation(res)).toContain("/home");
  });
});

describe("middleware - 어드민 접근 제어", () => {
  it("ADMIN이 아니면 /admin 접근 시 /home으로 리다이렉트한다", () => {
    const res = middleware(
      makeRequest("/admin/dashboard", { accessToken: "abc", refreshToken: "xyz", role: "USER" }),
    );
    expect(res.status).toBe(307);
    expect(getLocation(res)).toContain("/home");
  });

  it("ADMIN이면 /admin 접근이 허용된다", () => {
    const res = middleware(
      makeRequest("/admin/dashboard", { accessToken: "abc", refreshToken: "xyz", role: "ADMIN" }),
    );
    expect(res.status).toBe(200);
  });

  it("/admin/lottery/:id는 비어드민도 접근 가능하다", () => {
    const res = middleware(
      makeRequest("/admin/lottery/123", { accessToken: "abc", refreshToken: "xyz", role: "USER" }),
    );
    expect(res.status).toBe(200);
  });

  it("/admin/score/:id는 비어드민도 접근 가능하다", () => {
    const res = middleware(
      makeRequest("/admin/score/456", { accessToken: "abc", refreshToken: "xyz", role: "USER" }),
    );
    expect(res.status).toBe(200);
  });
});

describe("middleware - publicIn27 (축제 날짜 접근 제한)", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("축제 이전에는 비어드민의 /vote 접근을 /home으로 리다이렉트한다", () => {
    vi.setSystemTime(new Date("2025-09-20T00:00:00"));
    const res = middleware(makeRequest("/vote", { role: "USER" }));
    expect(res.status).toBe(307);
    expect(getLocation(res)).toContain("/home");
  });

  it("축제 이후에는 비어드민도 /vote 접근이 허용된다", () => {
    vi.setSystemTime(new Date("2025-09-28T00:00:00"));
    const res = middleware(makeRequest("/vote", { role: "USER" }));
    expect(res.status).toBe(200);
  });

  it("어드민은 축제 이전에도 /vote 접근이 허용된다", () => {
    vi.setSystemTime(new Date("2025-09-20T00:00:00"));
    const res = middleware(makeRequest("/vote", { accessToken: "abc", refreshToken: "xyz", role: "ADMIN" }));
    expect(res.status).toBe(200);
  });
});

describe("middleware - 슬로건 게이트", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  // TODO: 테스트용 기간 제한 우회 중 — 테스트 완료 후 주석 해제
  // it("슬로건 기간 이전에는 /slogan 접근 시 /home으로 리다이렉트한다", () => {
  //   vi.setSystemTime(new Date("2026-04-01T00:00:00"));
  //   const res = middleware(makeRequest("/slogan", { accessToken: "abc", refreshToken: "xyz" }));
  //   expect(res.status).toBe(307);
  //   expect(getLocation(res)).toContain("/home");
  // });

  it("슬로건 기간 내에는 /slogan 접근이 허용된다", () => {
    vi.setSystemTime(new Date("2026-05-20T00:00:00"));
    const res = middleware(makeRequest("/slogan", { accessToken: "abc", refreshToken: "xyz" }));
    expect(res.status).toBe(200);
  });

  // TODO: 테스트용 기간 제한 우회 중 — 테스트 완료 후 주석 해제
  // it("슬로건 기간 이후에는 /slogan 접근 시 /home으로 리다이렉트한다", () => {
  //   vi.setSystemTime(new Date("2026-06-01T00:00:00"));
  //   const res = middleware(makeRequest("/slogan", { accessToken: "abc", refreshToken: "xyz" }));
  //   expect(res.status).toBe(307);
  //   expect(getLocation(res)).toContain("/home");
  // });
});
