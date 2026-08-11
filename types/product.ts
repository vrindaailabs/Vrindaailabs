export interface Product {

  id: number;

  name: string;

  shortDescription: string;

  description: string;

  imageUrl: string;

  active: boolean;

  createdAt: string;

}

export interface ProductRequest {

  name: string;

  shortDescription: string;

  description: string;

  imageUrl: string;

}

export interface ApiResponse<T> {

  success: boolean;

  message: string;

  data: T;

}

export type ProductResponse =
  ApiResponse<Product>;

export type ProductListResponse =
  ApiResponse<Product[]>;