import { getTokenFromCookie } from "@/shared/utils/auth";
import axios from "axios";

export const logout = async () => {
  try {
    const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/auth/logout", {
      headers: {
        "Refresh-Token": "Bearer " + getTokenFromCookie("refreshToken"),
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
