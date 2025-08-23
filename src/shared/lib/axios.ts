import axios, { InternalAxiosRequestConfig } from "axios";
import { getTokenFromCookie } from "../utils/auth";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

if (typeof window !== "undefined") {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const isAuthPage = ["/signin", "/signup"].includes(window.location.pathname);

    config.withCredentials = !isAuthPage;

    const accessToken = getTokenFromCookie("accessToken");
    if (accessToken) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).authorization = `Bearer ${accessToken}`;
    }

    return config;
  });
}

export default instance;
