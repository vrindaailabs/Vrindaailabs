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
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">

      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b bg-white p-6">

          <h2 className="text-2xl font-bold text-slate-900">
            {industry
              ? "Edit Industry"
              : "Create Industry"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-3xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Scrollable Content */}

        <div className="min-h-0 flex-1 overflow-y-auto p-6">

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