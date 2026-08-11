"use client";

interface DeleteDialogProps {

  open: boolean;

  onClose: () => void;

  onDelete: () => void;

}

export default function DeleteDialog({

  open,

  onClose,

  onDelete,

}: DeleteDialogProps) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="text-xl font-bold">

          Delete Candidate

        </h2>

        <p className="mt-4 text-gray-600">

          Are you sure you want to delete this application?

        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}