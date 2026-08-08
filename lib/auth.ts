export const TOKEN_KEY = "accessToken";

export const REFRESH_TOKEN_KEY = "refreshToken";

export function isAuthenticated(): boolean {

  if (typeof window === "undefined") {
    return false;
  }

  return !!localStorage.getItem(TOKEN_KEY);

}

export function logout() {

  localStorage.removeItem(TOKEN_KEY);

  localStorage.removeItem(REFRESH_TOKEN_KEY);

}