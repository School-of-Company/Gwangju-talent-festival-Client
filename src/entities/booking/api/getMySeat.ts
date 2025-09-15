import { Seat, Section } from "../model/types";
import { getTokenFromCookie } from "@/shared/utils/auth";

interface MySeatApiResponse {
  seat_section: string;
  seat_number: number;
}

export const getMySeat = async (): Promise<Seat> => {
  const accessToken = getTokenFromCookie("accessToken");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  
  const response = await fetch("/api/seat/myself", {
    method: "GET",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "내 좌석 정보를 가져올 수 없습니다." }));
    throw new Error(errorData.message || "내 좌석 정보를 가져올 수 없습니다.");
  }

  const data: MySeatApiResponse = await response.json();
  const { seat_section, seat_number } = data;
  
  return {
    section: seat_section as Section,
    seatNumber: seat_number.toString(),
    status: "selected" as const,
  };
};
