export const ticketOpenDate = new Date("2025-09-18T20:00:00");
export const performerTicketOpenDate = new Date("2025-09-15T20:00:00");
export const festivalDate = new Date("2025-09-27T00:00:00");
export const sloganStartDate = new Date(
  process.env.NEXT_PUBLIC_SLOGAN_START_DATE ?? "2026-05-18T00:00:00+09:00",
);
export const sloganEndDate = new Date(
  process.env.NEXT_PUBLIC_SLOGAN_END_DATE ?? "2026-05-28T18:00:00+09:00",
);
export const isSloganPeriod = () => {
  const now = new Date();
  return now >= sloganStartDate && now <= sloganEndDate;
};
export const isSloganEnded = () => new Date() > sloganEndDate;

export const applyStartDate = new Date(
  process.env.NEXT_PUBLIC_APPLY_START_DATE ?? "2026-06-15T00:00:00+09:00",
);
export const applyEndDate = new Date(
  process.env.NEXT_PUBLIC_APPLY_END_DATE ?? "2026-06-22T18:00:00+09:00",
);
export const isApplyPeriod = () => {
  const now = new Date();
  return now >= applyStartDate && now <= applyEndDate;
};
