"use client";

interface DeleteDialogProps {
  open: boolean;

  loading?: boolean;

  onClose: () => void;

  onDelete: () => void;
}

export default function DeleteDialog({
  open,
  loading = false,
  onClose,
  onDelete,
}: DeleteDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="text-xl font-bold">
          Delete Candidate
        </h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to permanently delete
          this application? This action cannot be undone.
        </p>

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
            onClick={onDelete}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}