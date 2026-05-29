const matchesSegment = (pathname: string, prefix: string): boolean => {
  return pathname === prefix || pathname.startsWith(prefix + "/");
};

const HIDDEN_PREFIXES = ["/signin", "/signup", "/vote", "/admin"];

export const isHiddenPath = (pathname: string): boolean => {
  return HIDDEN_PREFIXES.some(prefix => matchesSegment(pathname, prefix));
};

export const links = [
  { section: "SloganSecondSection", label: "2026 광탈페 슬로건" },
  // { section: "section3", label: "FaQ" },
  { section: "ApplyThirdSection", label: "참여 신청" },
  { section: "FinalsSixthSection", label: "2025 광탈페 본선 다시보기" },
  // { section: "ReservationFifthSection", label: "본선 수상팀 명단" },
];
