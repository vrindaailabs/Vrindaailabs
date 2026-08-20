export type AuditLog = {
  id: number;

  username: string;

  role: string;

  action: string;

  module: string;
  description: string | null;

  ipAddress: string | null;

  userAgent: string | null;

  createdAt: string;
};

export type AuditAction =
  | "LOGIN"
  | "LOGOUT"
  | "REGISTER"
  | "FORGOT_PASSWORD"
  | "RESET_PASSWORD"
  | "REFRESH_TOKEN"
  | "ACCOUNT_LOCKED"
  | "ACCOUNT_UNLOCKED"
  | "APPLY"
  | "DELETE"
  | "UPDATE_STATUS"
  | "DOWNLOAD_RESUME"
  | "CREATE"
  | "UPDATE";

export type AuditModule =
  | "AUTH"
  | "CAREER"
  | "HR"
  | "DASHBOARD"
  | "USER"
  | "BLOG"
  | "PRODUCT"
  | "SERVICE"
  | "INDUSTRY"
  | "CONTACT"
  | "NEWSLETTER"
  | "MEDIA";

export type AuditLogFilters = {
  username: string;
  action: string;
  module: string;
  startDate: string;
  endDate: string;
};