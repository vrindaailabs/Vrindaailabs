"use client";

import { useState } from "react";

import type { Media } from "@/types/media";

interface DeleteMediaDialogProps {
  open: boolean;
  media: Media | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteMediaDialog({
  open,
  media,
  onClose,
  onConfirm,
}: DeleteMediaDialogProps) {
  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!open || !media) {
    return null;
  }

  async function handleConfirm() {
    setError("");
    setDeleting(true);

    try {
      await onConfirm();
    } catch (deleteError) {
      console.error(deleteError);

      setError(
        "Failed to delete the media file. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  }

  function handleClose() {
    if (deleting) {
      return;
    }

    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">

        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-bold text-red-600">
            Delete Media
          </h2>
        </div>

        <div className="space-y-4 p-6">

          {media.contentType.startsWith("image/") && (
            <div className="flex justify-center">
              <img
                src={media.fileUrl}
                alt={
                  media.altText ||
                  media.originalFileName
                }
                className="h-32 w-32 rounded-lg border object-cover"
              />
            </div>
          )}

          <p className="text-gray-700">
            Are you sure you want to delete
            {" "}
            <span className="font-semibold text-slate-900">
              {media.originalFileName}
            </span>
            ?
          </p>

          <p className="text-sm text-red-500">
            The database record and the physical
            uploaded file will both be deleted.
            This action cannot be undone.
          </p>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            type="button"
            onClick={handleClose}
            disabled={deleting}
            className="rounded-lg border px-5 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting
              ? "Deleting..."
              : "Delete Media"}
          </button>

        </div>

      </div>
    </div>
  );
}