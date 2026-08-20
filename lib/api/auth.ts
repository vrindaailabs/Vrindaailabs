import api from "./axios";

import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthenticationResponse,
  ApiResponse,
} from "@/types/auth";

/**
 * Login User
 */
export const login = async (
  request: LoginRequest
): Promise<ApiResponse<AuthenticationResponse>> => {
  const response =
    await api.post<ApiResponse<AuthenticationResponse>>(
      "/auth/login",
      request
    );

  return response.data;
};

/**
 * Register User
 */
export const register = async (
  request: RegisterRequest
): Promise<ApiResponse<AuthenticationResponse>> => {
  const response =
    await api.post<ApiResponse<AuthenticationResponse>>(
      "/auth/register",
      request
    );

  return response.data;
};

/**
 * Logout User
 *
 * Backend:
 * POST /api/auth/logout?refreshToken=...
 */
export const logout = async (
  refreshToken: string
): Promise<ApiResponse<null>> => {
  const response =
    await api.post<ApiResponse<null>>(
      "/auth/logout",
      null,
      {
        params: {
          refreshToken,
        },
      }
    );

  return response.data;
};

/**
 * Refresh Access Token
 *
 * Backend:
 * POST /api/auth/refresh-token?refreshToken=...
 */
export const refreshToken = async (
  refreshToken: string
): Promise<ApiResponse<AuthenticationResponse>> => {
  const response =
    await api.post<ApiResponse<AuthenticationResponse>>(
      "/auth/refresh-token",
      null,
      {
        params: {
          refreshToken,
        },
      }
    );

  return response.data;
};

/**
 * Forgot Password
 *
 * Backend:
 * POST /api/auth/forgot-password
 */
export const forgotPassword = async (
  request: ForgotPasswordRequest
): Promise<ApiResponse<null>> => {
  const response =
    await api.post<ApiResponse<null>>(
      "/auth/forgot-password",
      request
    );

  return response.data;
};

/**
 * Reset Password
 *
 * Backend:
 * POST /api/auth/reset-password
 *
 * Request:
 * {
 *   token,
 *   newPassword,
 *   confirmPassword
 * }
 */
export const resetPassword = async (
  request: ResetPasswordRequest
): Promise<ApiResponse<null>> => {
  const response =
    await api.post<ApiResponse<null>>(
      "/auth/reset-password",
      request
    );

  return response.data;
};