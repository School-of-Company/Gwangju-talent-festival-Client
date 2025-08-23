import instance from "@/shared/lib/axios";
import { Seat } from "../model/types";

export const seatBooking = async (data: Omit<Seat, "status">) => {
  return await instance.post("/seat", {
    seat_section: data.section,
    seat_number: data.seatNumber,
  });
};
