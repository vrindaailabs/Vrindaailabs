"use client";

import IndustryForm from "./IndustryForm";

import type {
  Industry,
  IndustryRequest,
} from "@/types/industry";

interface IndustryDialogProps {

  open: boolean;

  industry?: Industry | null;

  onClose: () => void;

  onSubmit: (
    request: IndustryRequest
  ) => Promise<void>;

}

export default function IndustryDialog({

  open,

  industry,

  onClose,

  onSubmit,

}: IndustryDialogProps) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">

            {industry
              ? "Edit Industry"
              : "Create Industry"}

          </h2>

          <button

            onClick={onClose}

            className="text-3xl"

          >

            ×

          </button>

        </div>

        <div className="p-6">

          <IndustryForm

            key={industry?.id ?? "new"}

            initialData={industry}

            onSubmit={onSubmit}

            onCancel={onClose}

          />

        </div>

      </div>

    </div>

  );

}