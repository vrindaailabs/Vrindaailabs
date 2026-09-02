export interface CareerPosition {
  id: number;

  title: string;

  department: string;

  employmentType:
    | "Full Time"
    | "Part Time"
    | "Internship"
    | "Contract";

  location: string;

  experience: string;

  description: string;

  skills: string[];

  isActive: boolean;
}

export type CandidateStatus =
  | "APPLIED"
  | "SHORTLISTED"
  | "INTERVIEW"
  | "SELECTED"
  | "HIRED"
  | "REJECTED";

export interface CareerApplication {
  id: number;

  fullName: string;

  email: string;

  phoneNumber: string;

  jobTitle: string;

  experience: string;

  currentCompany: string;

  currentCTC: string;

  expectedCTC: string;

  noticePeriod: string;

  resumeFileName: string;

  coverLetter: string | null;

  candidateStatus: CandidateStatus;

  appliedAt: string;
}

export interface UpdateCandidateStatusRequest {
  candidateStatus: CandidateStatus;
}

export interface ApiResponse<T> {
  success: boolean;

  status: number;

  message: string;

  data: T;

  timestamp: string;
}

export type CareerApplicationResponse =
  ApiResponse<CareerApplication>;

export type CareerApplicationListResponse =
  ApiResponse<CareerApplication[]>;