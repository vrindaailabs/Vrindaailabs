import api from "@/lib/api/axios";

import type {
  ServiceRequest,
  ServiceResponse,
  ServiceListResponse,
} from "@/types/service";

class ServiceService {

  /**
   * Get all services.
   *
   * Public endpoint.
   *
   * Admin uses this to manage all services.
   * Public website filters active services.
   */
  async getAll(): Promise<ServiceListResponse> {
    const response =
      await api.get<ServiceListResponse>(
        "/services"
      );

    return response.data;
  }

  /**
   * Get single service by ID.
   *
   * Public endpoint.
   */
  async getById(
    id: number
  ): Promise<ServiceResponse> {

    const response =
      await api.get<ServiceResponse>(
        `/services/${id}`
      );

    return response.data;
  }

  /**
   * Create service.
   *
   * ADMIN only.
   */
  async create(
    request: ServiceRequest
  ): Promise<ServiceResponse> {

    const response =
      await api.post<ServiceResponse>(
        "/services",
        request
      );

    return response.data;
  }

  /**
   * Update service.
   *
   * ADMIN only.
   */
  async update(
    id: number,
    request: ServiceRequest
  ): Promise<ServiceResponse> {

    const response =
      await api.put<ServiceResponse>(
        `/services/${id}`,
        request
      );

    return response.data;
  }

  /**
   * Delete service.
   *
   * ADMIN only.
   */
  async delete(
    id: number
  ): Promise<void> {

    await api.delete(
      `/services/${id}`
    );
  }
}

export const serviceService =
  new ServiceService();