export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "HR";
}

export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  timestamp: string;
}