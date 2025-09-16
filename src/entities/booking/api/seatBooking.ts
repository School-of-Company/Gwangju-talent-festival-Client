import { Seat } from "../model/types";
import { getTokenFromCookie } from "@/shared/utils/auth";

export const seatBooking = async (data: Omit<Seat, "status">) => {
  try {
    const accessToken = getTokenFromCookie("accessToken");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    
    const response = await fetch("/api/seat", {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify({
        seat_section: data.section,
        seat_number: data.seatNumber,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "좌석 예매에 실패했습니다." }));
      throw new Error(errorData.message || "좌석 예매에 실패했습니다.");
    }

    return { data: await response.json() };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("좌석 예매에 실패했습니다.");
    }
  }
};
