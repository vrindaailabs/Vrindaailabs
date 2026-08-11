import api from "@/lib/api/axios";

import type {
  Media,
  MediaListResponse,
  MediaResponse,
  MediaUpdateRequest,
} from "@/types/media";

class MediaService {

  async getAll(
    folder?: string
  ): Promise<MediaListResponse> {

    const response =
      await api.get("/media", {
        params: folder
          ? { folder }
          : undefined,
      });

    return response.data;
  }

  async getById(
    id: number
  ): Promise<MediaResponse> {

    const response =
      await api.get(`/media/${id}`);

    return response.data;
  }

  async upload(
    file: File,
    folder?: string,
    altText?: string,
    description?: string
  ): Promise<MediaResponse> {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    if (folder?.trim()) {

      formData.append(
        "folder",
        folder.trim()
      );

    }

    if (altText?.trim()) {

      formData.append(
        "altText",
        altText.trim()
      );

    }

    if (description?.trim()) {

      formData.append(
        "description",
        description.trim()
      );

    }

    const response =
      await api.post(
        "/media",
        formData
      );

    return response.data;
  }

  async update(
    id: number,
    request: MediaUpdateRequest
  ): Promise<MediaResponse> {

    const response =
      await api.put(
        `/media/${id}`,
        request
      );

    return response.data;
  }

  async delete(
    id: number
  ): Promise<void> {

    await api.delete(
      `/media/${id}`
    );

  }

  getFileUrl(
    media: Media
  ): string {

    if (!media.fileUrl) {

      return "";

    }

    if (
      media.fileUrl.startsWith("http://") ||
      media.fileUrl.startsWith("https://")
    ) {

      return media.fileUrl;

    }

    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ??
      "http://localhost:8080";

    return `${baseUrl.replace(/\/$/, "")}/${media.fileUrl.replace(/^\//, "")}`;

  }

}

export const mediaService =
  new MediaService();