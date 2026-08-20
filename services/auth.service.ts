import * as authApi from "@/lib/api/auth";

import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
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

    if (!auth?.token || !auth?.refreshToken) {
      throw new Error(
        "Authentication tokens were not returned by the server."
      );
    }

    if (typeof window !== "undefined") {

      localStorage.setItem(
        "accessToken",
        auth.token
      );

      localStorage.setItem(
        "refreshToken",
        auth.refreshToken
      );
    }

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

    if (!auth?.token || !auth?.refreshToken) {
      throw new Error(
        "Authentication tokens were not returned by the server."
      );
    }

    if (typeof window !== "undefined") {

      localStorage.setItem(
        "accessToken",
        auth.token
      );

      localStorage.setItem(
        "refreshToken",
        auth.refreshToken
      );
    }

    return auth;
  }

  /**
   * Forgot Password
   */
  async forgotPassword(
    request: ForgotPasswordRequest
  ): Promise<string> {

    const response =
      await authApi.forgotPassword(request);

    return response.message;
  }

  /**
   * Reset Password
   */
  async resetPassword(
    request: ResetPasswordRequest
  ): Promise<string> {

    const response =
      await authApi.resetPassword(request);

    return response.message;
  }

  /**
   * Refresh Access Token
   */
  async refreshAccessToken(): Promise<AuthenticationResponse> {

    if (typeof window === "undefined") {
      throw new Error(
        "Token refresh is only available in the browser."
      );
    }

    const refreshToken =
      localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error(
        "Refresh token not found."
      );
    }

    const response =
      await authApi.refreshToken(
        refreshToken
      );

    const auth = response.data;

    if (!auth?.token) {
      throw new Error(
        "New access token was not returned."
      );
    }

    localStorage.setItem(
      "accessToken",
      auth.token
    );

    /*
     * Backend currently returns the existing
     * refresh token as well.
     *
     * Store it again so the client remains
     * synchronized with the backend response.
     */
    if (auth.refreshToken) {
      localStorage.setItem(
        "refreshToken",
        auth.refreshToken
      );
    }

    return auth;
  }

  /**
   * Logout User
   *
   * Backend logout is attempted first.
   * Local tokens are always removed.
   */
  async logout(): Promise<void> {

    if (typeof window === "undefined") {
      return;
    }

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

      this.clearSession();
    }
  }

  /**
   * Clear Local Authentication
   */
  clearSession(): void {

    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );
  }

  /**
   * Check Authentication
   */
  isAuthenticated(): boolean {

    if (typeof window === "undefined") {
      return false;
    }

    return Boolean(
      localStorage.getItem(
        "accessToken"
      )
    );
  }

  /**
   * Get Access Token
   */
  getToken(): string | null {

    if (typeof window === "undefined") {
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

    if (typeof window === "undefined") {
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