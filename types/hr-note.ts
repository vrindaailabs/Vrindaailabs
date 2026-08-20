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
  message: string;
  data: HrNote;
}

export interface HrNoteListResponse {
  success: boolean;
  message: string;
  data: HrNote[];
}