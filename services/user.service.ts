import api from "@/lib/api/axios";

import type {
  UserRequest,
  UpdateUserRequest,
  UserResponse,
  UserListResponse,
} from "@/types/user";

class UserService {

  async getAll(): Promise<UserListResponse> {

    const response =
      await api.get("/users");

    return response.data;

  }

  async getById(
    id: number
  ): Promise<UserResponse> {

    const response =
      await api.get(`/users/${id}`);

    return response.data;

  }

  async create(
    request: UserRequest
  ): Promise<UserResponse> {

    const response =
      await api.post(
        "/users",
        request
      );

    return response.data;

  }

  async update(
    id: number,
    request: UpdateUserRequest
  ): Promise<UserResponse> {

    const response =
      await api.put(
        `/users/${id}`,
        request
      );

    return response.data;

  }

  async delete(
    id: number
  ): Promise<void> {

    await api.delete(
      `/users/${id}`
    );

  }

}

export const userService =
  new UserService();