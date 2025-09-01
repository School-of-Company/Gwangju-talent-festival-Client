export const STATUS = {
  PENDING: "대기 중",
  ONGOING: "투표 중",
  FINISHED: "투표 완료",
} as const;

export type StatusType = keyof typeof STATUS;
