import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getTokenFromCookie, setTokens, clearTokens } from "@/shared/utils/auth";
import { refresh } from "@/shared/api/refresh";
import { publicPages } from "@/shared/config/authConfig";

export const baseURL = "/api/server";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};

let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

const redirectToSignin = () => {
  if (typeof window === "undefined") return;

  const currentPath = window.location.pathname;
  if (currentPath === "/signin") return;

  const search = window.location.search;
  const isPublic = publicPages.some(p => currentPath.startsWith(p));
  const nextParam = isPublic ? "" : `?next=${encodeURIComponent(currentPath + search)}`;
  window.location.href = `/signin${nextParam}`;
};

const setAuthHeader = (config: InternalAxiosRequestConfig, token: string) => {
  config.headers.set("Authorization", `Bearer ${token}`);
};

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window === "undefined") return config;

    const accessToken = getTokenFromCookie("accessToken");
    if (accessToken) setAuthHeader(config, accessToken);
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (typeof window === "undefined") return Promise.reject(error);

    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;
    if (status !== 401 && status !== 403) return Promise.reject(error);

    const refreshToken = getTokenFromCookie("refreshToken");
    if (!refreshToken || originalRequest._retry) {
      clearTokens();
      redirectToSignin();
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            setAuthHeader(originalRequest, token);
            resolve(instance(originalRequest) as Promise<AxiosResponse>);
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const {
        access_token: accessToken,
        access_token_expired_at: accessTokenExpiredAt,
        refresh_token: newRefreshToken,
        refresh_token_expired_at: refreshTokenExpiredAt,
      } = await refresh(refreshToken);

      setTokens(accessToken, accessTokenExpiredAt, newRefreshToken, refreshTokenExpiredAt);
      processQueue(null, accessToken);
      setAuthHeader(originalRequest, accessToken);

      return instance(originalRequest);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      clearTokens();
      redirectToSignin();
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  },
);

export default instance;
