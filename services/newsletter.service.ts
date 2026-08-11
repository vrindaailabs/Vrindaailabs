import api from "@/lib/api/axios";

import type {
  NewsletterRequest,
  NewsletterApiResponse,
  NewsletterListApiResponse,
} from "@/types/newsletter";

export const newsletterService = {

  async subscribe(
    request: NewsletterRequest
  ): Promise<NewsletterApiResponse> {

    const response =
      await api.post(
        "/newsletter",
        request
      );

    return response.data;
  },

  async getAll(): Promise<NewsletterListApiResponse> {

    const response =
      await api.get("/newsletter");

    return response.data;
  },

  async delete(id: number) {

    return api.delete(
      `/newsletter/${id}`
    );
  },

};