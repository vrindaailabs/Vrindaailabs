export interface Industry {

  id: number;

  name: string;

  shortDescription: string;

  description: string;

  imageUrl: string;

  active: boolean;

  createdAt: string;

}

export interface IndustryRequest {

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

export type IndustryResponse =
  ApiResponse<Industry>;

export type IndustryListResponse =
  ApiResponse<Industry[]>;