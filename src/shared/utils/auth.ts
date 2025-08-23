"use client";

export const setTokens = (
  accessToken: string,
  accessTokenExpiredAt: string,
  refreshToken: string,
  refreshTokenExpiredAt: string,
) => {
  const accessExpiry = new Date(accessTokenExpiredAt);
  const refreshExpiry = new Date(refreshTokenExpiredAt);

  document.cookie = `accessToken=${accessToken}; expires=${accessExpiry.toUTCString()}; path=/; secure; samesite=strict`;
  document.cookie = `refreshToken=${refreshToken}; expires=${refreshExpiry.toUTCString()}; path=/; secure; samesite=strict`;
};

export const clearTokens = () => {
  document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const getTokenFromCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const isLoggedIn = (): boolean => {
  const accessToken = getTokenFromCookie("accessToken");
  const refreshToken = getTokenFromCookie("refreshToken");
  return !!(accessToken && refreshToken);
};
