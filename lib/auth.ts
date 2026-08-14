export const TOKEN_KEY = "accessToken";

export const REFRESH_TOKEN_KEY = "refreshToken";

export function isAuthenticated(): boolean {

  if (typeof window === "undefined") return false;

  return !!localStorage.getItem("accessToken");
}

export function logout() {

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

}