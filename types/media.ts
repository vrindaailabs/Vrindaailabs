export type MediaStorageType =
  | "LOCAL"
  | "S3";

export interface Media {

  id: number;

  originalFileName: string;

  storageFileName: string;

  fileUrl: string;

  contentType: string;

  fileSize: number;

  storageType: MediaStorageType;

  folder: string | null;

  altText: string | null;

  description: string | null;

  active: boolean;

  createdAt: string;

}

export interface MediaUpdateRequest {

  folder?: string;

  altText?: string;

  description?: string;

  active?: boolean;

}

export interface MediaResponse {

  success: boolean;

  message: string;

  data: Media;

}

export interface MediaListResponse {

  success: boolean;

  message: string;

  data: Media[];

}