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
   * Save authentication tokens.
   */
  private saveSession(
    auth: AuthenticationResponse
  ): void {
    if (typeof window === "undefined") {
      return;
    }

    if (!auth.token) {
      throw new Error(
        "Access token was not returned by the server."
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
  }

  /**
   * Login.
   */
  async login(
    request: LoginRequest
  ): Promise<AuthenticationResponse> {
    const response =
      await authApi.login(request);

    if (!response.success) {
      throw new Error(
        response.message ||
          "Login failed."
      );
    }

    const auth = response.data;

    if (!auth?.token) {
      throw new Error(
        "Authentication token was not returned by the server."
      );
    }

    this.saveSession(auth);

    return auth;
  }

  /**
   * Register.
   */
  async register(
    request: RegisterRequest
  ): Promise<AuthenticationResponse> {
    const response =
      await authApi.register(request);

    if (!response.success) {
      throw new Error(
        response.message ||
          "Registration failed."
      );
    }

    const auth = response.data;

    if (!auth?.token) {
      throw new Error(
        "Authentication token was not returned by the server."
      );
    }

    this.saveSession(auth);

    return auth;
  }

  /**
   * Forgot password.
   */
  async forgotPassword(
    request: ForgotPasswordRequest
  ): Promise<string> {
    const response =
      await authApi.forgotPassword(request);

    if (!response.success) {
      throw new Error(
        response.message ||
          "Unable to process forgot password request."
      );
    }

    return response.message;
  }

  /**
   * Reset password.
   */
  async resetPassword(
    request: ResetPasswordRequest
  ): Promise<string> {
    const response =
      await authApi.resetPassword(request);

    if (!response.success) {
      throw new Error(
        response.message ||
          "Unable to reset password."
      );
    }

    return response.message;
  }

  /**
   * Refresh token manually.
   */
  async refreshAccessToken(): Promise<AuthenticationResponse> {
    if (typeof window === "undefined") {
      throw new Error(
        "Token refresh is only available in the browser."
      );
    }

    const refreshToken =
      this.getRefreshToken();

    if (!refreshToken) {
      throw new Error(
        "Refresh token not found."
      );
    }

    const response =
      await authApi.refreshToken(
        refreshToken
      );

    if (!response.success) {
      throw new Error(
        response.message ||
          "Unable to refresh access token."
      );
    }

    const auth = response.data;

    if (!auth?.token) {
      throw new Error(
        "New access token was not returned."
      );
    }

    this.saveSession(auth);

    return auth;
  }

  /**
   * Logout.
   */
  async logout(): Promise<void> {
    if (typeof window === "undefined") {
      return;
    }

    const refreshToken =
      this.getRefreshToken();

    try {
      if (refreshToken) {
        await authApi.logout(
          refreshToken
        );
      }
    } catch (error) {
      console.warn(
        "Backend logout failed:",
        error
      );
    } finally {
      this.clearSession();
    }
  }

  /**
   * Clear session.
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
   * Check whether authenticated.
   */
  isAuthenticated(): boolean {
    return Boolean(
      this.getToken()
    );
  }

  /**
   * Get access token.
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
   * Get refresh token.
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