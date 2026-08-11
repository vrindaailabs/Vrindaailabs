"use client";

import type { Industry } from "@/types/industry";

interface DeleteIndustryDialogProps {

  open: boolean;

  industry: Industry | null;

  onClose: () => void;

  onConfirm: () => Promise<void>;

}

export default function DeleteIndustryDialog({

  open,

  industry,

  onClose,

  onConfirm,

}: DeleteIndustryDialogProps) {

  if (!open || !industry) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-red-600">

            Delete Industry

          </h2>

        </div>

        <div className="p-6">

          <p>

            Are you sure you want to delete

            <span className="font-semibold">

              {" "}

              {industry.name}

            </span>

            ?

          </p>

          <p className="mt-4 text-sm text-red-500">

            This action cannot be undone.

          </p>

        </div>

        <div className="flex justify-end gap-4 border-t p-6">

          <button

            onClick={onClose}

            className="rounded-lg border px-5 py-2"

          >

            Cancel

          </button>

          <button

            onClick={onConfirm}

            className="rounded-lg bg-red-600 px-5 py-2 text-white"

          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}