import { getTokenFromCookie } from "@/shared/utils/auth";
import axios from "axios";

export const logout = async () => {
  try {
    const res = await axios.delete("/auth/logout", {
      headers: {
        "Refresh-Token": getTokenFromCookie("refreshToken"),
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
