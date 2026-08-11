"use client";

import ServiceForm from "./ServiceForm";

import type {
  Service,
  ServiceRequest,
} from "@/types/service";

interface ServiceDialogProps {

  open: boolean;

  service?: Service | null;

  onClose: () => void;

  onSubmit: (
    request: ServiceRequest
  ) => Promise<void>;

}

export default function ServiceDialog({

  open,

  service,

  onClose,

  onSubmit,

}: ServiceDialogProps) {

  if (!open) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">

            {service
              ? "Edit Service"
              : "Create Service"}

          </h2>

          <button

            onClick={onClose}

            className="text-3xl leading-none"

          >

            ×

          </button>

        </div>

        <div className="p-6">

          <ServiceForm

            key={service?.id ?? "new"}

            initialData={service ?? undefined}

            onSubmit={onSubmit}

            onCancel={onClose}

          />

        </div>

      </div>

    </div>

  );

}