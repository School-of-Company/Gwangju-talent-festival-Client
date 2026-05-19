import { getTokenFromCookie } from "@/shared/utils/auth";

export const logout = async () => {
  const refreshToken = getTokenFromCookie("refreshToken");

  const response = await fetch("/api/logout", {
    method: "DELETE",
    headers: {
      "Refresh-Token": `Bearer ${refreshToken ?? ""}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "로그아웃에 실패했습니다.");
  }

  return result;
};
