"use client";

import type { Service } from "@/types/service";

interface DeleteServiceDialogProps {

  open: boolean;

  service: Service | null;

  onClose: () => void;

  onConfirm: () => Promise<void>;

}

export default function DeleteServiceDialog({

  open,

  service,

  onClose,

  onConfirm,

}: DeleteServiceDialogProps) {

  if (!open || !service) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-red-600">

            Delete Service

          </h2>

        </div>

        <div className="p-6">

          <p className="text-gray-700">

            Are you sure you want to delete

            <span className="font-semibold">

              {" "}{service.title}

            </span>

            ?

          </p>

          <p className="mt-3 text-sm text-red-500">

            This action cannot be undone.

          </p>

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button

            onClick={onClose}

            className="rounded-lg border px-5 py-2"

          >

            Cancel

          </button>

          <button

            onClick={onConfirm}

            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"

          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}