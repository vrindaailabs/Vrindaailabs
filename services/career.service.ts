import api from "@/lib/api/axios";

export const careerService = {

  async getAllApplications() {
    const response = await api.get("/careers");
    return response.data;
  },

  async getApplication(id: number) {
    const response = await api.get(`/careers/${id}`);
    return response.data;
  },

  async deleteApplication(id: number) {
    const response = await api.delete(`/careers/${id}`);
    return response.data;
  },

  async downloadResume(id: number) {
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
    status: string
  ) {
    const response = await api.put(
      `/careers/${id}/status`,
      {
        candidateStatus: status,
      }
    );

    return response.data;
  },

};