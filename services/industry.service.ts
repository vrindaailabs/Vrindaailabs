import api from "@/lib/api/axios";

import type {
  IndustryRequest,
  IndustryResponse,
  IndustryListResponse,
} from "@/types/industry";

class IndustryService {
  /**
   * Get all industries.
   *
   * Public endpoint.
   */
  async getAll(): Promise<IndustryListResponse> {
    const response =
      await api.get<IndustryListResponse>(
        "/industries"
      );

    return response.data;
  }

  /**
   * Get industry by ID.
   *
   * Public endpoint.
   */
  async getById(
    id: number
  ): Promise<IndustryResponse> {
    const response =
      await api.get<IndustryResponse>(
        `/industries/${id}`
      );

    return response.data;
  }

  /**
   * Create industry.
   *
   * ADMIN only.
   */
  async create(
    request: IndustryRequest
  ): Promise<IndustryResponse> {
    const response =
      await api.post<IndustryResponse>(
        "/industries",
        request
      );

    return response.data;
  }

  /**
   * Update industry.
   *
   * ADMIN only.
   */
  async update(
    id: number,
    request: IndustryRequest
  ): Promise<IndustryResponse> {
    const response =
      await api.put<IndustryResponse>(
        `/industries/${id}`,
        request
      );

    return response.data;
  }

  /**
   * Delete industry.
   *
   * ADMIN only.
   */
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