import { StatusType } from "../consts/status";

export const handleStatus = (status: StatusType) => {
  switch (status) {
    case "FINISHED":
      return { label: "투표완료", color: "text-[#17C200]", bg: "bg-[#17C200]" };
    case "ONGOING":
      return { label: "투표 중", color: "text-[#FE2F33]", bg: "bg-[#FE2F33]" };
    case "PENDING":
      return { label: "대기 중", color: "text-[#FEBD2F]", bg: "bg-[#FEBD2F]" };
  }
};
