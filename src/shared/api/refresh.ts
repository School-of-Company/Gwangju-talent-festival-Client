"use client";

interface RefreshResponse {
  access_token: string;
  access_token_expired_at: string;
  refresh_token: string;
  refresh_token_expired_at: string;
}

export const refresh = async (refreshToken: string): Promise<RefreshResponse> => {
  const response = await fetch("/api/refresh", {
    method: "PATCH",
    headers: {
      "Refresh-Token": `Bearer ${refreshToken}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "토큰 갱신에 실패했습니다.");
  }

  return result;
};
