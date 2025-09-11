import instance from "@/shared/lib/axios";
import { Seat } from "../model/types";
import { AxiosError } from "axios";

export const seatBooking = async (data: Omit<Seat, "status">) => {
  try {
    
    return await instance.post("/seat", {
      seat_section: data.section,
      seat_number: data.seatNumber,
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("좌석 예매에 실패했습니다.");
    }
  }
};
