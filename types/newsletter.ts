import { ApiResponse } from "./auth";

export interface NewsletterRequest {
  email: string;
}

export interface NewsletterResponse {
  id: number;
  email: string;
  active: boolean;
  subscribedAt: string;
  message: string;
}

export type NewsletterApiResponse =
  ApiResponse<NewsletterResponse>;

export type NewsletterListApiResponse =
  ApiResponse<NewsletterResponse[]>;