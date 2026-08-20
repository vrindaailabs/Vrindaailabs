import api from "@/lib/api/axios";

import type {
  ContactRequest,
  ContactApiResponse,
  ContactListApiResponse,
  UpdateContactStatusRequest,
} from "@/types/contact";

export const contactService = {
  /**
   * Public website
   * Submit contact enquiry
   */
  async submit(
    request: ContactRequest
  ): Promise<ContactApiResponse> {
    const response = await api.post(
      "/contact",
      request
    );

    return response.data;
  },

  /**
   * Admin / HR
   * Get all contacts
   */
  async getAll(): Promise<ContactListApiResponse> {
    const response = await api.get("/contact");

    return response.data;
  },

  /**
   * Admin / HR
   * Get contact by ID
   */
  async getById(
    id: number
  ): Promise<ContactApiResponse> {
    const response = await api.get(
      `/contact/${id}`
    );

    return response.data;
  },

  /**
   * Admin / HR
   * Update contact status
   *
   * Backend endpoint must be:
   * PUT /api/contact/{id}/status
   */
  async updateStatus(
    id: number,
    request: UpdateContactStatusRequest
  ): Promise<ContactApiResponse> {
    const response = await api.put(
      `/contact/${id}/status`,
      request
    );

    return response.data;
  },

  /**
   * Admin
   * Delete contact
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/contact/${id}`);
  },
};

export default contactService;