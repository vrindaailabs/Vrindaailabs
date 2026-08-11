export interface User {

  id: number;

  fullName: string;

  email: string;

  role: string;

  active: boolean;

  createdAt: string;

}

export interface UserRequest {

  fullName: string;

  email: string;

  password: string;

  role: string;

  active: boolean;

}

export interface UpdateUserRequest {

  fullName: string;

  email: string;

  role: string;

  active: boolean;

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