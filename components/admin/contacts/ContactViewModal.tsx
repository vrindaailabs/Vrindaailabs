"use client";

import ContactStatusBadge from "./ContactStatusBadge";

import type { ContactResponse } from "@/types/contact";

interface ContactViewModalProps {
  open: boolean;

  contact:
    ContactResponse | null;

  onClose: () => void;
}

export default function ContactViewModal({
  open,
  contact,
  onClose,
}: ContactViewModalProps) {

  if (!open || !contact) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Contact Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Contact enquiry #{contact.id}
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-3xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Scrollable content */}

        <div className="min-h-0 overflow-y-auto p-6">

          <div className="grid gap-6 md:grid-cols-2">

            <Field
              label="Full Name"
              value={contact.fullName}
            />

            <Field
              label="Email"
              value={contact.email}
            />

            <Field
              label="Phone"
              value={contact.phoneNumber}
            />

            <Field
              label="Subject"
              value={contact.subject}
            />

            <div>

              <p className="text-sm text-gray-500">
                Status
              </p>

              <div className="mt-2">
                <ContactStatusBadge
                  status={contact.status}
                />
              </div>

            </div>

            <Field
              label="Submitted Date"
              value={new Date(
                contact.createdAt
              ).toLocaleString()}
            />

          </div>

          {/* Full Message */}

          <div className="mt-8">

            <p className="text-sm font-medium text-gray-500">
              Full Message
            </p>

            <div className="mt-2 whitespace-pre-wrap rounded-lg border bg-gray-50 p-5 leading-7 text-slate-800">
              {contact.message}
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex shrink-0 justify-end border-t p-6">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
}

function Field({
  label,
  value,
}: FieldProps) {

  return (
    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words font-semibold text-slate-900">
        {value}
      </p>

    </div>
  );
}