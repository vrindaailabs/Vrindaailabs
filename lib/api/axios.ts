import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import authService from "@/services/auth.service";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8080/api",

  timeout: 10000,
});

/**
 * Authentication endpoints that must NOT
 * trigger automatic token refresh.
 */
const PUBLIC_AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/refresh-token",
  "/auth/logout",
];

/**
 * Check whether request is an authentication
 * endpoint that should bypass refresh handling.
 */
function isPublicAuthEndpoint(
  url?: string
): boolean {

  if (!url) {
    return false;
  }

  return PUBLIC_AUTH_ENDPOINTS.some(
    (endpoint) =>
      url.includes(endpoint)
  );
}

/**
 * Prevent multiple API calls from refreshing
 * the token simultaneously.
 */
let refreshPromise:
  Promise<string> | null = null;

/**
 * Automatically attach JWT
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    if (
      typeof window !== "undefined"
    ) {

      const token =
        localStorage.getItem(
          "accessToken"
        );

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    /*
     * Do not force Content-Type globally.
     *
     * Axios/browser automatically handles:
     *
     * multipart/form-data; boundary=...
     *
     * for FormData requests.
     */
    return config;
  },

  (error) =>
    Promise.reject(error)
);

/**
 * Handle Unauthorized responses.
 *
 * Flow:
 *
 * API request
 *      ↓
 * 401
 *      ↓
 * Refresh token
 *      ↓
 * Success → retry original request
 *
 * Refresh failure
 *      ↓
 * Clear session
 *      ↓
 * Redirect to login
 */
api.interceptors.response.use(

  (response) =>
    response,

  async (
    error: AxiosError
  ) => {

    const originalRequest =
      error.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

    if (
      error.response?.status !== 401 ||
      typeof window === "undefined" ||
      !originalRequest
    ) {

      return Promise.reject(
        error
      );
    }

    /**
     * Do not refresh authentication
     * endpoints themselves.
     */
    if (
      isPublicAuthEndpoint(
        originalRequest.url
      )
    ) {

      return Promise.reject(
        error
      );
    }

    /**
     * Prevent infinite retry loop.
     */
    if (originalRequest._retry) {

      authService.clearSession();

      window.location.href =
        "/login";

      return Promise.reject(
        error
      );
    }

    originalRequest._retry = true;

    const refreshToken =
      authService.getRefreshToken();

    if (!refreshToken) {

      authService.clearSession();

      window.location.href =
        "/login";

      return Promise.reject(
        error
      );
    }

    try {

      /**
       * If another request is already
       * refreshing the token, wait for it.
       */
      if (!refreshPromise) {

        refreshPromise =
          authService
            .refreshAccessToken()
            .then(
              (auth) =>
                auth.token
            )
            .finally(() => {

              refreshPromise =
                null;
            });
      }

      const newAccessToken =
        await refreshPromise;

      /**
       * Update original request
       * with new JWT.
       */
      originalRequest.headers =
        originalRequest.headers ?? {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      /**
       * Retry original request.
       */
      return api(
        originalRequest
      );

    } catch (refreshError) {

      console.warn(
        "Access token refresh failed. Redirecting to login.",
        refreshError
      );

      authService.clearSession();

      window.location.href =
        "/login";

      return Promise.reject(
        refreshError
      );
    }
  }
);

export default api;