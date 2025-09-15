import instance from "@/shared/lib/axios";
import { Seat, Section } from "../model/types";

interface MySeatApiResponse {
  seat_section: string;
  seat_number: number;
}

export const getMySeat = async (): Promise<Seat> => {
  const response = await instance.get<MySeatApiResponse>("/seat/myself");
  const { seat_section, seat_number } = response.data;
  
  return {
    section: seat_section as Section,
    seatNumber: seat_number.toString(),
    status: "selected" as const,
  };
};
