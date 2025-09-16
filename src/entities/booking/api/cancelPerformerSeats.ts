import { getTokenFromCookie } from "@/shared/utils/auth";
import { Seat } from "../model/types";

export const cancelPerformerSeats = async (seats: Seat[]) => {
  const accessToken = getTokenFromCookie("accessToken");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const cancelPromises = seats.map(seat => 
    fetch("/api/seat/performer", {
      method: "DELETE",
      credentials: "include",
      headers,
      body: JSON.stringify({
        seat_section: seat.section,
        seat_number: seat.seatNumber,
      }),
    })
  );

  const results = await Promise.allSettled(cancelPromises);
  
  const successful = results.filter(result => result.status === 'fulfilled');
  const failed = results.filter(result => result.status === 'rejected');

  if (failed.length > 0) {
    const errorMessages = failed.map((result, index) => {
      if (result.status === 'rejected') {
        const seat = seats[index];
        return `${seat.section}-${seat.seatNumber} 좌석 취소 실패`;
      }
      return '';
    }).filter(Boolean);
    
    throw new Error(`일부 좌석 취소에 실패했습니다: ${errorMessages.join(', ')}`);
  }

  const responses = await Promise.all(
    (successful as PromiseFulfilledResult<Response>[]).map(result => {
      const response = result.value;
      if (!response.ok) {
        throw new Error("좌석 취소에 실패했습니다.");
      }
      return response.json();
    })
  );

  return { 
    data: responses,
    message: `${seats.length}개 좌석이 성공적으로 취소되었습니다.`
  };
};
