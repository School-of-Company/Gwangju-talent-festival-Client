export const STATUS = {
  PENDING: "PENDING",
  ONGOING: "ONGOING",
  FINISHED: "FINISHED",
} as const;

export type StatusType = keyof typeof STATUS;
