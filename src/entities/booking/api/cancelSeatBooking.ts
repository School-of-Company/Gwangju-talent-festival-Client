import { Seat } from "../model/types";
import { getTokenFromCookie } from "@/shared/utils/auth";

export const cancelSeatBooking = async (data: Omit<Seat, "status">) => {
  const accessToken = getTokenFromCookie("accessToken");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  
  const response = await fetch("/api/seat", {
    method: "DELETE",
    credentials: "include",
    headers,
    body: JSON.stringify({
      seat_section: data.section,
      seat_number: data.seatNumber,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "좌석 취소에 실패했습니다." }));
    throw new Error(errorData.message || "좌석 취소에 실패했습니다.");
  }

  return { data: await response.json() };
};
