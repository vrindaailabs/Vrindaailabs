import api from "../lib/api/axios";

import type {
  ServiceRequest,
  ServiceResponse,
  ServiceListResponse,
} from "../types/service";

class ServiceService {

  async getAll(): Promise<ServiceListResponse> {

    const response =
      await api.get("/services");

    return response.data;

  }

  async getById(
    id: number
  ): Promise<ServiceResponse> {

    const response =
      await api.get(`/services/${id}`);

    return response.data;

  }

  async create(
    request: ServiceRequest
  ): Promise<ServiceResponse> {

    const response =
      await api.post(
        "/services",
        request
      );

    return response.data;

  }

  async update(
    id: number,
    request: ServiceRequest
  ): Promise<ServiceResponse> {

    const response =
      await api.put(
        `/services/${id}`,
        request
      );

    return response.data;

  }

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