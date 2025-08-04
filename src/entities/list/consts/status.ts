export const STATUS = {
  PENDING: "PENGDING",
  ONGOING: "ONGOING",
  FINISHED: "FINISHED",
} as const;

export type StatusType = keyof typeof STATUS;
