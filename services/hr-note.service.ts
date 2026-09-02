import api from "@/lib/api/axios";

import type {
  HrNoteRequest,
  HrNoteResponse,
  HrNoteListResponse,
} from "@/types/hr-note";

class HrNoteService {
  async getAll(
    applicationId: number
  ): Promise<HrNoteListResponse> {
    const response = await api.get(
      `/careers/${applicationId}/notes`
    );

    return response.data;
  }

  async create(
    applicationId: number,
    request: HrNoteRequest
  ): Promise<HrNoteResponse> {
    const response = await api.post(
      `/careers/${applicationId}/notes`,
      request
    );

    return response.data;
  }

  async update(
    noteId: number,
    request: HrNoteRequest
  ): Promise<HrNoteResponse> {
    const response = await api.put(
      `/careers/notes/${noteId}`,
      request
    );

    return response.data;
  }

  async delete(
    noteId: number
  ): Promise<void> {
    await api.delete(
      `/careers/notes/${noteId}`
    );
  }
}

export const hrNoteService =
  new HrNoteService();

export default hrNoteService;