import api from "@/lib/api/axios";

import type {
  AuditLog,
} from "@/types/audit-log";

class AuditLogService {

  async getRecent(): Promise<AuditLog[]> {

    const response =
      await api.get<AuditLog[]>(
        "/audit/recent"
      );

    return response.data;
  }

  async getAll(): Promise<AuditLog[]> {

    const response =
      await api.get<AuditLog[]>(
        "/audit"
      );

    return response.data;
  }

  async getByUsername(
    username: string
  ): Promise<AuditLog[]> {

    const response =
      await api.get<AuditLog[]>(
        `/audit/user/${encodeURIComponent(username)}`
      );

    return response.data;
  }

  async getByAction(
    action: string
  ): Promise<AuditLog[]> {

    const response =
      await api.get<AuditLog[]>(
        `/audit/action/${encodeURIComponent(action)}`
      );

    return response.data;
  }

  async getByModule(
    module: string
  ): Promise<AuditLog[]> {

    const response =
      await api.get<AuditLog[]>(
        `/audit/module/${encodeURIComponent(module)}`
      );

    return response.data;
  }

  async getByDateRange(
    startDate: string,
    endDate: string
  ): Promise<AuditLog[]> {

    const response =
      await api.get<AuditLog[]>(
        "/audit/date-range",
        {
          params: {
            startDate,
            endDate,
          },
        }
      );

    return response.data;
  }
}

export const auditLogService =
  new AuditLogService();