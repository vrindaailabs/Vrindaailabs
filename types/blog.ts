export interface Blog {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: string;
}

export interface BlogRequest {
  title: string;
  shortDescription: string;
  content: string;
  imageUrl: string;
  published: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type BlogResponse =
  ApiResponse<Blog>;

export type BlogListResponse =
  ApiResponse<Blog[]>;