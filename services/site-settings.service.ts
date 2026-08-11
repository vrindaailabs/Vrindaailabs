import api from "@/lib/api/axios";

import type {
  SiteSettingsRequest,
  SiteSettingsResponse,
} from "@/types/site-settings";

class SiteSettingsService {

  async get(): Promise<SiteSettingsResponse> {

    const response =
      await api.get("/settings");

    return response.data;

  }

  async create(
    request: SiteSettingsRequest
  ): Promise<SiteSettingsResponse> {

    const response =
      await api.post(
        "/settings",
        request
      );

    return response.data;

  }

  async update(
    id: number,
    request: SiteSettingsRequest
  ): Promise<SiteSettingsResponse> {

    const response =
      await api.put(
        `/settings/${id}`,
        request
      );

    return response.data;

  }

  async delete(
    id: number
  ): Promise<void> {

    await api.delete(
      `/settings/${id}`
    );

  }

}

export const siteSettingsService =
  new SiteSettingsService();