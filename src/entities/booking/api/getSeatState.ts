import instance from "@/shared/lib/axios";
import { Section, AllSeatsApiResponse, SectionSeatsApiResponse } from "../model/types";

export const getSeatState = async (section?: Section): Promise<AllSeatsApiResponse | SectionSeatsApiResponse> => {
  try {
    const res = await instance.get(`/seat${section ? `?section=${section}` : "/all"}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
