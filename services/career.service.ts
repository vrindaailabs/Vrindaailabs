import api from "@/lib/api/axios";

import type {
  ApiResponse,
  CareerApplication,
  CandidateStatus,
  UpdateCandidateStatusRequest,
} from "@/types/career";

export const careerService = {
  async getAllApplications(): Promise<
    ApiResponse<CareerApplication[]>
  > {
    const response = await api.get<
      ApiResponse<CareerApplication[]>
    >("/careers");

    return response.data;
  },

  async getApplication(
    id: number
  ): Promise<ApiResponse<CareerApplication>> {
    const response = await api.get<
      ApiResponse<CareerApplication>
    >(`/careers/${id}`);

    return response.data;
  },

  async deleteApplication(
    id: number
  ): Promise<ApiResponse<void>> {
    const response = await api.delete<
      ApiResponse<void>
    >(`/careers/${id}`);

    return response.data;
  },

  async downloadResume(id: number): Promise<Blob> {
    const response = await api.get(
      `/careers/resume/${id}`,
      {
        responseType: "blob",
      }
    );

    return response.data;
  },

  async updateStatus(
    id: number,
    status: CandidateStatus
  ): Promise<ApiResponse<CareerApplication>> {
    const request: UpdateCandidateStatusRequest = {
      candidateStatus: status,
    };

    const response = await api.put<
      ApiResponse<CareerApplication>
    >(
      `/careers/${id}/status`,
      request
    );

    return response.data;
  },
};