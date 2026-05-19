"use client";

const isHttps = () =>
  typeof window !== "undefined" && window.location.protocol === "https:";

const buildAttributes = (expires?: Date) => {
  const parts = ["path=/", "SameSite=Lax"];
  if (expires) parts.push(`expires=${expires.toUTCString()}`);
  if (isHttps()) parts.push("Secure");
  return parts.join("; ");
};

export const setCookie = (name: string, value: string, expires?: Date) => {
  document.cookie = `${name}=${value}; ${buildAttributes(expires)}`;
};

export const clearCookie = (name: string) => {
  document.cookie = `${name}=; ${buildAttributes(new Date(0))}`;
};
