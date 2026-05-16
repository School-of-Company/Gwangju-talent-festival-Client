"use client";

export const setCookie = (name: string, value: string, expires?: Date) => {
  const expiry = expires ? `; expires=${expires.toUTCString()}` : "";
  document.cookie = `${name}=${value}${expiry}; path=/;`;
};

export const clearCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
