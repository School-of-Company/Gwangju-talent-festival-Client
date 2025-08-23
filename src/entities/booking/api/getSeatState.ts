import instance from "@/shared/lib/axios";
import { Section, AllSeatsApiResponse, SectionSeatsApiResponse } from "../model/types";

export async function getSeatState(): Promise<AllSeatsApiResponse>;
export async function getSeatState(section: Section): Promise<SectionSeatsApiResponse>;
export async function getSeatState(
  section?: Section,
): Promise<AllSeatsApiResponse | SectionSeatsApiResponse> {
  try {
    const res = await instance.get(`/api/seat${section ? `?seat_section=${section}` : "/all"}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw error;
  }
}
