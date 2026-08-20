import api from "@/lib/api/axios";

import type {
  AuditLog,
  AuditApiResponse,
} from "@/types/audit";

class AuditService {

  /**
   * Get all audit logs
   */
  async getAll(): Promise<AuditLog[]> {

    const response =
      await api.get("/audit");

    return this.extractData(
      response.data
    );
  }

  /**
   * Get recent audit logs
   */
  async getRecent(): Promise<AuditLog[]> {

    const response =
      await api.get("/audit/recent");

    return this.extractData(
      response.data
    );
  }

  /**
   * Get logs by username
   */
  async getByUsername(
    username: string
  ): Promise<AuditLog[]> {

    const response =
      await api.get(
        `/audit/user/${encodeURIComponent(username)}`
      );

    return this.extractData(
      response.data
    );
  }

  /**
   * Get logs by action
   */
  async getByAction(
    action: string
  ): Promise<AuditLog[]> {

    const response =
      await api.get(
        `/audit/action/${encodeURIComponent(action)}`
      );

    return this.extractData(
      response.data
    );
  }

  /**
   * Get logs by module
   */
  async getByModule(
    module: string
  ): Promise<AuditLog[]> {

    const response =
      await api.get(
        `/audit/module/${encodeURIComponent(module)}`
      );

    return this.extractData(
      response.data
    );
  }

  /**
   * Get logs between dates
   */
  async getByDateRange(
    startDate: string,
    endDate: string
  ): Promise<AuditLog[]> {

    const response =
      await api.get(
        "/audit/date-range",
        {
          params: {
            startDate,
            endDate,
          },
        }
      );

    return this.extractData(
      response.data
    );
  }

  /**
   * Normalize API response.
   *
   * Supports both:
   *
   * [
   *   {...}
   * ]
   *
   * and:
   *
   * {
   *   data: [...]
   * }
   */
  private extractData(
    response: AuditLog[] | AuditApiResponse
  ): AuditLog[] {

    if (Array.isArray(response)) {
      return response;
    }

    return response.data ?? [];
  }
}

export const auditService =
  new AuditService();