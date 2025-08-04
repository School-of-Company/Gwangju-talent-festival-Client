export const handleStatus = (
  status: "PENDING" | "ONGOING" | "FINISHED",
  type: "vote" | "performance",
) => {
  switch (type) {
    case "vote":
      switch (status) {
        case "FINISHED":
          return { label: "투표 완료", color: "text-gray-800" };
        case "ONGOING":
          return { label: "투표 중", color: "text-main-600" };
        case "PENDING":
          return { label: "대기 중", color: "text-gray-400" };
      }
    case "performance":
      switch (status) {
        case "FINISHED":
          return { label: "공연 완료", color: "text-[#17C200]", bg: "bg-[#17C200]" };
        case "ONGOING":
          return { label: "공연 중", color: "text-[#FE2F33]", bg: "bg-[#FE2F33]" };
        case "PENDING":
          return { label: "대기 중", color: "text-[#FEBD2F]", bg: "bg-[#FEBD2F]" };
      }
  }
};
