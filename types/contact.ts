import { ApiResponse } from "./auth";

export type ContactStatus =
  | "NEW"
  | "IN_PROGRESS"
  | "RESOLVED";

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
  status: ContactStatus;
  createdAt: string;
}

export interface UpdateContactStatusRequest {
  status: ContactStatus;
}

export type ContactApiResponse =
  ApiResponse<ContactResponse>;

export type ContactListApiResponse =
  ApiResponse<ContactResponse[]>;