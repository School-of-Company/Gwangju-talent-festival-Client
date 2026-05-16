"use client";

import { clearCookie, setCookie } from "./cookie";

export const setTokens = (
  accessToken: string,
  accessTokenExpiredAt: string,
  refreshToken: string,
  refreshTokenExpiredAt: string,
) => {
  setCookie("accessToken", accessToken, new Date(accessTokenExpiredAt));
  setCookie("refreshToken", refreshToken, new Date(refreshTokenExpiredAt));
};

export const clearTokens = () => {
  clearCookie("accessToken");
  clearCookie("refreshToken");
};

export const setRole = (role: string) => {
  setCookie("role", role);
};

export const clearRole = () => {
  clearCookie("role");
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
