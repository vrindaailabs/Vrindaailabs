export interface AuditLog {
  id: number;

  username: string;

  role: string;

  action: string;

  module: string;

  description: string | null;

  ipAddress: string | null;

  userAgent: string | null;

  createdAt: string;
}

export interface AuditApiResponse {
  success?: boolean;
  message?: string;
  data?: AuditLog[];
}