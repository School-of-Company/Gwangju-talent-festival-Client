const matchesSegment = (pathname: string, prefix: string): boolean => {
  return pathname === prefix || pathname.startsWith(prefix + "/");
};

export const isHiddenPath = (pathname: string): boolean => {
  return (
    matchesSegment(pathname, "/signin") ||
    matchesSegment(pathname, "/signup") ||
    matchesSegment(pathname, "/vote") ||
    matchesSegment(pathname, "/admin")
  );
};

export const links = [
  { section: "SloganSecondSection", label: "2025 광탈페 슬로건" },
  // { section: "section3", label: "FaQ" },
  { section: "PreliminaryFourthSection", label: "2025 광탈페 예선 다시보기" },
  { section: "FinalsSixthSection", label: "2025 광탈페 본선 다시보기" },
  // { section: "ReservationFifthSection", label: "본선 수상팀 명단" },
];
