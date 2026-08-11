import api from "@/lib/api/axios";

import type {
  ContactRequest,
  ContactApiResponse,
  ContactListApiResponse,
} from "@/types/contact";

export const contactService = {

  async submit(
    request: ContactRequest
  ): Promise<ContactApiResponse> {

    const response =
      await api.post(
        "/contact",
        request
      );

    return response.data;
  },

  async getAll(): Promise<ContactListApiResponse> {

    const response =
      await api.get("/contact");

    return response.data;
  },

  async getById(id: number): Promise<ContactApiResponse> {

    const response =
      await api.get(
        `/contact/${id}`
      );

    return response.data;
  },

  async delete(id: number) {

    return api.delete(
      `/contact/${id}`
    );
  },

};