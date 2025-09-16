import { Section, AllSeatsApiResponse, SectionSeatsApiResponse } from "../model/types";
import { getTokenFromCookie } from "@/shared/utils/auth";

export async function getSeatState(): Promise<AllSeatsApiResponse>;
export async function getSeatState(section: Section): Promise<SectionSeatsApiResponse>;
export async function getSeatState(
  section?: Section,
): Promise<AllSeatsApiResponse | SectionSeatsApiResponse> {
  try {
    const url = `/api/seat${section ? `?section=${section}` : "/all"}`;
    const accessToken = getTokenFromCookie("accessToken");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw error;
  }
}
