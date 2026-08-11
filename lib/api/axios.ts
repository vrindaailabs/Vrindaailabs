import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8080/api",

  timeout: 10000,
});

/**
 * Automatically attach JWT
 */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    /*
     * Do not force Content-Type globally.
     *
     * Axios/browser will automatically set:
     *
     * multipart/form-data; boundary=...
     *
     * when the request body is FormData.
     *
     * JSON requests will also receive the
     * appropriate content type automatically.
     */
    return config;
  },
  (error) =>
    Promise.reject(error)
);

/**
 * Handle Unauthorized
 */
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;