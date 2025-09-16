import { Seat, Section } from "../model/types";
import { getTokenFromCookie } from "@/shared/utils/auth";

interface MySeatApiResponse {
  seat_section: string;
  seat_number: number;
}

type PerformerSeatsApiResponse = MySeatApiResponse[];

export const getMySeats = async (): Promise<Seat[]> => {
  const accessToken = getTokenFromCookie("accessToken");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  
  const response = await fetch("/api/seat/myself/performer", {
    method: "GET",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "내 좌석 정보를 가져올 수 없습니다." }));
    throw new Error(errorData.message || "내 좌석 정보를 가져올 수 없습니다.");
  }

  const data: PerformerSeatsApiResponse = await response.json();
  
  return data.map(({ seat_section, seat_number }) => ({
    section: seat_section as Section,
    seatNumber: seat_number.toString(),
    status: "selected" as const,
  }));
};

export const getMySeat = async (): Promise<Seat> => {
  const accessToken = getTokenFromCookie("accessToken");
  const role = getTokenFromCookie("role");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  
  const endpoint = role === "ROLE_PERFORMER" ? "/api/seat/myself/performer" : "/api/seat/myself";
  
  const response = await fetch(endpoint, {
    method: "GET",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "내 좌석 정보를 가져올 수 없습니다." }));
    throw new Error(errorData.message || "내 좌석 정보를 가져올 수 없습니다.");
  }

  if (role === "ROLE_PERFORMER") {
    const data: PerformerSeatsApiResponse = await response.json();
    if (data.length === 0) {
      throw new Error("예매된 좌석이 없습니다.");
    }
    const { seat_section, seat_number } = data[0];
    return {
      section: seat_section as Section,
      seatNumber: seat_number.toString(),
      status: "selected" as const,
    };
  } else {
    const data: MySeatApiResponse = await response.json();
    const { seat_section, seat_number } = data;
    
    return {
      section: seat_section as Section,
      seatNumber: seat_number.toString(),
      status: "selected" as const,
    };
  }
};
