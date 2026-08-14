"use client";

import { useState } from "react";

import type { User } from "@/types/user";

interface DeleteUserDialogProps {
  open: boolean;

  user: User | null;

  onClose: () => void;

  onConfirm: () => Promise<void>;
}

export default function DeleteUserDialog({
  open,
  user,
  onClose,
  onConfirm,
}: DeleteUserDialogProps) {
  const [deleting, setDeleting] =
    useState(false);

  if (!open || !user) {
    return null;
  }

  async function handleConfirm() {
    setDeleting(true);

    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-red-600">
            Delete User
          </h2>

        </div>

        {/* Content */}

        <div className="p-6">

          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">
              {user.fullName}
            </span>
            ?
          </p>

          <p className="mt-4 text-sm text-red-500">
            This action cannot be undone.
          </p>

        </div>

        {/* Actions */}

        <div className="flex justify-end gap-4 border-t p-6">

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-lg border px-5 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}