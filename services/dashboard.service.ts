import api from "@/lib/api/axios";

import {
  DashboardStatisticsApiResponse,
  MonthlyApplicationApiResponse,
  RecentApplicationApiResponse,
  StatusCountApiResponse,
} from "@/types/dashboard";

export const dashboardService = {

  /**
   * Dashboard Cards
   */
  async getStatistics() {
    const response =
      await api.get<DashboardStatisticsApiResponse>(
        "/dashboard/statistics"
      );

    return response.data;
  },

  /**
   * Candidate Status Count
   */
  async getStatusCounts() {
    const response =
      await api.get<StatusCountApiResponse>(
        "/dashboard/status-count"
      );

    return response.data;
  },

  /**
   * Monthly Applications
   */
  async getMonthlyApplications() {
    const response =
      await api.get<MonthlyApplicationApiResponse>(
        "/dashboard/monthly-applications"
      );

    return response.data;
  },

  /**
   * Recent Applications
   */
  async getRecentApplications() {
    const response =
      await api.get<RecentApplicationApiResponse>(
        "/dashboard/recent-applications"
      );

    return response.data;
  },

};