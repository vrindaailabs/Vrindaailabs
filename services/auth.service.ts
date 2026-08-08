import * as authApi from "@/lib/api/auth";

import type {
  LoginRequest,
  RegisterRequest,
  AuthenticationResponse,
} from "@/types/auth";

class AuthService {

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

  async logout() {

    const refreshToken =
      localStorage.getItem(
        "refreshToken"
      );

    if (refreshToken) {
      await authApi.logout(
        refreshToken
      );
    }

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );
  }

  isAuthenticated() {

    return !!localStorage.getItem(
      "accessToken"
    );
  }

  getToken() {

    return localStorage.getItem(
      "accessToken"
    );
  }
}

const authService =
  new AuthService();

export default authService;