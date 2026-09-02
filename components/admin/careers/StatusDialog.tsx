"use client";

import { useState } from "react";

import { careerService } from "@/services/career.service";

import type {
  CandidateStatus,
} from "@/types/career";

interface StatusDialogProps {
  open: boolean;

  applicationId: number | null;

  currentStatus: CandidateStatus;

  onClose: () => void;

  onSuccess: () => Promise<void> | void;
}

const statuses: CandidateStatus[] = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW",
  "SELECTED",
  "HIRED",
  "REJECTED",
];

export default function StatusDialog({
  open,
  applicationId,
  currentStatus,
  onClose,
  onSuccess,
}: StatusDialogProps) {
  const [status, setStatus] =
    useState<CandidateStatus>(currentStatus);

  const [loading, setLoading] =
    useState(false);

  if (!open || applicationId === null) {
    return null;
  }

  async function handleUpdate() {
    const id = applicationId;

    if (id === null) {
      return;
    }

    try {
      setLoading(true);

      await careerService.updateStatus(
        id,
        status
      );

      await onSuccess();

      onClose();
    } catch (error) {
      console.error(
        "Failed to update candidate status:",
        error
      );

      alert("Unable to update status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Update Candidate Status
        </h2>

        <select
          className="w-full rounded-lg border p-3"
          value={status}
          disabled={loading}
          onChange={(e) =>
            setStatus(
              e.target.value as CandidateStatus
            )
          }
        >
          {statuses.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleUpdate}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update"}
          </button>
        </div>

      </div>
    </div>
  );
}