import { ApiResponse } from "./auth";

/**
 * Dashboard Statistics
 */
export interface DashboardStatisticsResponse {
  totalApplications: number;
  applied: number;
  shortlisted: number;
  interview: number;
  selected: number;
  hired: number;
  rejected: number;
}

/**
 * Candidate Status Count
 */
export interface StatusCountResponse {
  status:
    | "APPLIED"
    | "SHORTLISTED"
    | "INTERVIEW"
    | "SELECTED"
    | "HIRED"
    | "REJECTED";

  count: number;
}

/**
 * Monthly Applications
 */
export interface MonthlyApplicationResponse {
  month: string;
  totalApplications: number;
}

/**
 * Recent Applications
 */
export interface RecentApplicationResponse {
  id: number;
  fullName: string;
  email: string;
  jobTitle: string;
  candidateStatus:
    | "APPLIED"
    | "SHORTLISTED"
    | "INTERVIEW"
    | "SELECTED"
    | "HIRED"
    | "REJECTED";

  resumeFileName: string;

  appliedAt: string;
}

/**
 * API Response Types
 */

export type DashboardStatisticsApiResponse =
  ApiResponse<DashboardStatisticsResponse>;

export type StatusCountApiResponse =
  ApiResponse<StatusCountResponse[]>;

export type MonthlyApplicationApiResponse =
  ApiResponse<MonthlyApplicationResponse[]>;

export type RecentApplicationApiResponse =
  ApiResponse<RecentApplicationResponse[]>;