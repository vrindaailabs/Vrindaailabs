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
export async function login(
  request: LoginRequest
): Promise<ApiResponse<AuthenticationResponse>> {
  const response =
    await api.post<ApiResponse<AuthenticationResponse>>(
      "/auth/login",
      request
    );

  return response.data;
}

/**
 * Register User
 */
export async function register(
  request: RegisterRequest
): Promise<ApiResponse<AuthenticationResponse>> {
  const response =
    await api.post<ApiResponse<AuthenticationResponse>>(
      "/auth/register",
      request
    );

  return response.data;
}

/**
 * Logout User
 *
 * Backend:
 * POST /api/auth/logout?refreshToken=...
 */
export async function logout(
  refreshToken: string
): Promise<ApiResponse<null>> {
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
}

/**
 * Refresh Access Token
 *
 * Backend:
 * POST /api/auth/refresh-token?refreshToken=...
 */
export async function refreshToken(
  refreshTokenValue: string
): Promise<ApiResponse<AuthenticationResponse>> {
  const response =
    await api.post<ApiResponse<AuthenticationResponse>>(
      "/auth/refresh-token",
      null,
      {
        params: {
          refreshToken: refreshTokenValue,
        },
      }
    );

  return response.data;
}

/**
 * Forgot Password
 */
export async function forgotPassword(
  request: ForgotPasswordRequest
): Promise<ApiResponse<null>> {
  const response =
    await api.post<ApiResponse<null>>(
      "/auth/forgot-password",
      request
    );

  return response.data;
}

/**
 * Reset Password
 */
export async function resetPassword(
  request: ResetPasswordRequest
): Promise<ApiResponse<null>> {
  const response =
    await api.post<ApiResponse<null>>(
      "/auth/reset-password",
      request
    );

  return response.data;
}