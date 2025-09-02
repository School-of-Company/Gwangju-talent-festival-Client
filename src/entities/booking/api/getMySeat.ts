import instance from "@/shared/lib/axios";
import { Seat } from "../model/types";

export const getMySeat = async (data: Omit<Seat, "status">) => {
  return await instance.get("/seat/myself", {
    params: {
      seat_section: data.section,
      seat_number: data.seatNumber,
    },
  });
};
