import instance from "@/shared/lib/axios";
import { Seat } from "../model/types";

export const cancelSeatBooking = async (data: Omit<Seat, "status">) => {
  return await instance.delete("/seat", {
    data: {
      seat_section: data.section,
      seat_number: data.seatNumber,
    },
  });
};
