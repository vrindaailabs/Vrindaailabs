import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080/api";

/**
 * Main API client.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Separate client for refresh requests.
 *
 * Do not add the main API interceptors here.
 */
const refreshApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Public authentication endpoints.
 */
const PUBLIC_AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/refresh-token",
  "/auth/logout",
];

interface RefreshResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken?: string;
  };
}

interface RetryRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Check whether URL is an authentication endpoint.
 */
function isPublicAuthEndpoint(
  url?: string
): boolean {
  if (!url) {
    return false;
  }

  return PUBLIC_AUTH_ENDPOINTS.some(
    (endpoint) => url.includes(endpoint)
  );
}

/**
 * Get token safely.
 */
function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("accessToken");
}

/**
 * Get refresh token safely.
 */
function getRefreshToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("refreshToken");
}

/**
 * Clear authentication data.
 */
function clearSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

/**
 * Redirect user to login.
 */
function redirectToLogin(): void {
  if (typeof window === "undefined") {
    return;
  }

  clearSession();

  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
}

/**
 * Shared refresh promise.
 *
 * Prevents multiple simultaneous refresh requests.
 */
let refreshPromise: Promise<string> | null =
  null;

/**
 * Request interceptor.
 *
 * Adds Authorization header to protected API requests.
 */
api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    if (typeof window === "undefined") {
      return config;
    }

    if (isPublicAuthEndpoint(config.url)) {
      return config;
    }

    const token = getAccessToken();

    if (token) {
      const headers =
        AxiosHeaders.from(config.headers);

      headers.set(
        "Authorization",
        `Bearer ${token}`
      );

      config.headers = headers;
    }

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor.
 *
 * Refreshes access token only when backend returns 401.
 *
 * 403 is deliberately not refreshed because:
 * - Token may be valid
 * - User may not have required permissions
 */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | RetryRequestConfig
        | undefined;

    if (
      error.response?.status !== 401 ||
      typeof window === "undefined" ||
      !originalRequest
    ) {
      return Promise.reject(error);
    }

    if (
      isPublicAuthEndpoint(
        originalRequest.url
      )
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      redirectToLogin();

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      redirectToLogin();

      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        refreshPromise = refreshApi
          .post<RefreshResponse>(
            "/auth/refresh-token",
            {
              refreshToken,
            }
          )
          .then((response) => {
            const auth = response.data.data;

            if (!auth?.token) {
              throw new Error(
                "Refresh endpoint did not return an access token."
              );
            }

            localStorage.setItem(
              "accessToken",
              auth.token
            );

            if (auth.refreshToken) {
              localStorage.setItem(
                "refreshToken",
                auth.refreshToken
              );
            }

            return auth.token;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken =
        await refreshPromise;

      const headers =
        AxiosHeaders.from(
          originalRequest.headers
        );

      headers.set(
        "Authorization",
        `Bearer ${newAccessToken}`
      );

      originalRequest.headers = headers;

      return api(originalRequest);
    } catch (refreshError) {
      console.error(
        "Access token refresh failed:",
        refreshError
      );

      redirectToLogin();

      return Promise.reject(refreshError);
    }
  }
);

export default api;