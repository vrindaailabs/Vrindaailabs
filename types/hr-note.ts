export interface HrNote {
  id: number;

  applicationId: number;

  note: string;

  createdBy: string;

  createdAt: string;

  updatedAt: string;
}

export interface HrNoteRequest {
  note: string;
}

export interface HrNoteResponse {
  success: boolean;

  status: number;

  message: string;

  data: HrNote;

  timestamp: string;
}

export interface HrNoteListResponse {
  success: boolean;

  status: number;

  message: string;

  data: HrNote[];

  timestamp: string;
}