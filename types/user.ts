export type UserRole =
  | "ADMIN"
  | "HR"
  | "USER";

export interface User {
  id: number;

  fullName: string;

  email: string;

  role: UserRole;

  enabled: boolean;

  failedLoginAttempts: number;

  accountLocked: boolean;

  createdAt: string;
}

export interface UserRequest {
  fullName: string;

  email: string;

  password: string;

  role: UserRole;

  enabled: boolean;
}

export interface UpdateUserRequest {
  fullName: string;

  email: string;

  role: UserRole;

  enabled: boolean;
}

export interface UserResponse {
  success: boolean;

  message: string;

  data: User;
}

export interface UserListResponse {
  success: boolean;

  message: string;

  data: User[];
}