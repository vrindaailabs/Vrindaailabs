import api from "@/lib/api/axios";

import type {
  BlogRequest,
  BlogResponse,
  BlogListResponse,
} from "@/types/blog";

class BlogService {

  /**
   * Admin:
   * Get all blogs including drafts.
   */
  async getAll(): Promise<BlogListResponse> {

    const response =
      await api.get("/blogs");

    return response.data;
  }

  /**
   * Public:
   * Get published blogs only.
   */
  async getPublished(): Promise<BlogListResponse> {

    const response =
      await api.get("/blogs/published");

    return response.data;
  }

  async getById(
    id: number
  ): Promise<BlogResponse> {

    const response =
      await api.get(`/blogs/${id}`);

    return response.data;
  }

  async create(
    request: BlogRequest
  ): Promise<BlogResponse> {

    const response =
      await api.post(
        "/blogs",
        request
      );

    return response.data;
  }

  async update(
    id: number,
    request: BlogRequest
  ): Promise<BlogResponse> {

    const response =
      await api.put(
        `/blogs/${id}`,
        request
      );

    return response.data;
  }

  async delete(
    id: number
  ): Promise<void> {

    await api.delete(
      `/blogs/${id}`
    );
  }
}

export const blogService =
  new BlogService();