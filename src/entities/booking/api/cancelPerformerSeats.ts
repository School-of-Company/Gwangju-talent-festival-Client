import { getTokenFromCookie } from "@/shared/utils/auth";

export const cancelPerformerSeats = async () => {
  const accessToken = getTokenFromCookie("accessToken");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  
  const response = await fetch("/api/seat/performer", {
    method: "DELETE",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "좌석 취소에 실패했습니다." }));
    throw new Error(errorData.message || "좌석 취소에 실패했습니다.");
  }

  return { data: await response.json() };
};
