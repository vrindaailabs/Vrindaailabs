import api from "./axios";

import type {
  LoginRequest,
  RegisterRequest,
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
    await api.post<
      ApiResponse<AuthenticationResponse>
    >(
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
    await api.post<
      ApiResponse<AuthenticationResponse>
    >(
      "/auth/register",
      request
    );

  return response.data;
};

/**
 * Logout User
 */
export const logout = async (
  refreshToken: string
) => {

  const response =
    await api.post(
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
 * Refresh Token
 */
export const refreshToken = async (
  refreshToken: string
): Promise<
  ApiResponse<AuthenticationResponse>
> => {

  const response =
    await api.post<
      ApiResponse<AuthenticationResponse>
    >(
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