export const handleStatus = (
  status: "PENDING" | "ONGOING" | "FINISHED",
  type: "vote" | "performance",
) => {
  switch (status) {
    case "FINISHED":
      return { label: "공연 완료", color: "#17C200" };
    case "ONGOING":
      return { label: type === "vote" ? "투표 중" : "공연 중", color: "#FE2F33" };
    case "PENDING":
      return { label: "대기 중", color: "#FEBD2F" };
  }
};
