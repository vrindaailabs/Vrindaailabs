import api from "@/lib/api/axios";

import type {
  IndustryRequest,
  IndustryResponse,
  IndustryListResponse,
} from "@/types/industry";

class IndustryService {

  async getAll(): Promise<IndustryListResponse> {

    const response =
      await api.get("/industries");

    return response.data;

  }

  async getById(
    id: number
  ): Promise<IndustryResponse> {

    const response =
      await api.get(`/industries/${id}`);

    return response.data;

  }

  async create(
    request: IndustryRequest
  ): Promise<IndustryResponse> {

    const response =
      await api.post(
        "/industries",
        request
      );

    return response.data;

  }

  async update(
    id: number,
    request: IndustryRequest
  ): Promise<IndustryResponse> {

    const response =
      await api.put(
        `/industries/${id}`,
        request
      );

    return response.data;

  }

  async delete(
    id: number
  ): Promise<void> {

    await api.delete(
      `/industries/${id}`
    );

  }

}

export const industryService =
  new IndustryService();