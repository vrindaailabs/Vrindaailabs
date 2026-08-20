/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Register Request
 */
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "HR";
}

/**
 * Forgot Password Request
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Reset Password Request
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Authentication Response
 */
export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
  message: string;
}

/**
 * Generic API Response
 */
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}