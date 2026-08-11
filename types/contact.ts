import { ApiResponse } from "./auth";

export interface ContactRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  createdAt: string;
}

export type ContactApiResponse =
  ApiResponse<ContactResponse>;

export type ContactListApiResponse =
  ApiResponse<ContactResponse[]>;