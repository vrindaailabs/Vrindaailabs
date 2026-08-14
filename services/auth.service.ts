import * as authApi from "@/lib/api/auth";

import type {
  LoginRequest,
  RegisterRequest,
  AuthenticationResponse,
} from "@/types/auth";

class AuthService {

  /**
   * Login User
   */
  async login(
    request: LoginRequest
  ): Promise<AuthenticationResponse> {

    const response =
      await authApi.login(request);

    const auth = response.data;

    localStorage.setItem(
      "accessToken",
      auth.token
    );

    localStorage.setItem(
      "refreshToken",
      auth.refreshToken
    );

    return auth;
  }

  /**
   * Register User
   */
  async register(
    request: RegisterRequest
  ): Promise<AuthenticationResponse> {

    const response =
      await authApi.register(request);

    const auth = response.data;

    localStorage.setItem(
      "accessToken",
      auth.token
    );

    localStorage.setItem(
      "refreshToken",
      auth.refreshToken
    );

    return auth;
  }

  /**
   * Logout User
   *
   * Even if backend logout fails,
   * local authentication must always be cleared.
   */
  async logout(): Promise<void> {

    const refreshToken =
      localStorage.getItem(
        "refreshToken"
      );

    try {

      if (refreshToken) {

        await authApi.logout(
          refreshToken
        );

      }

    } catch (error) {

      console.warn(
        "Backend logout failed. Clearing local session anyway.",
        error
      );

    } finally {

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );
    }
  }

  /**
   * Check Authentication
   */
  isAuthenticated(): boolean {

    if (
      typeof window === "undefined"
    ) {
      return false;
    }

    return !!localStorage.getItem(
      "accessToken"
    );
  }

  /**
   * Get Access Token
   */
  getToken(): string | null {

    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    return localStorage.getItem(
      "accessToken"
    );
  }

  /**
   * Get Refresh Token
   */
  getRefreshToken(): string | null {

    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    return localStorage.getItem(
      "refreshToken"
    );
  }
}

const authService =
  new AuthService();

export default authService;