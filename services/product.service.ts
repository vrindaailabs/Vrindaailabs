import api from "@/lib/api/axios";

import type {
  ProductRequest,
  ProductResponse,
  ProductListResponse,
} from "@/types/product";

class ProductService {
  async getAll(): Promise<ProductListResponse> {
    const response = await api.get("/products");
    return response.data;
  }

  async getById(
    id: number
  ): Promise<ProductResponse> {
    const response =
      await api.get(`/products/${id}`);

    return response.data;
  }

  async create(
    request: ProductRequest
  ): Promise<ProductResponse> {
    const response =
      await api.post("/products", request);

    return response.data;
  }

  async update(
    id: number,
    request: ProductRequest
  ): Promise<ProductResponse> {
    const response =
      await api.put(`/products/${id}`, request);

    return response.data;
  }

  async delete(
    id: number
  ): Promise<void> {
    await api.delete(`/products/${id}`);
  }
}

export const productService =
  new ProductService();