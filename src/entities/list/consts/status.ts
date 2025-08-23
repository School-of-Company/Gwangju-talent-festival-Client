export const STATUS = {
  PENDING: "대기 중",
  ONGOING: "공연 중",
  FINISHED: "공연 완료",
} as const;

export type StatusType = keyof typeof STATUS;
