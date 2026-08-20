"use client";

import { useState } from "react";

import { contactService } from "@/services/contact.service";

import type {
  ContactResponse,
  ContactStatus,
} from "@/types/contact";

interface ContactStatusDialogProps {
  open: boolean;
  contact: ContactResponse | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

const statuses: ContactStatus[] = [
  "NEW",
  "IN_PROGRESS",
  "RESOLVED",
];

export default function ContactStatusDialog({
  open,
  contact,
  onClose,
  onSuccess,
}: ContactStatusDialogProps) {

  const [status, setStatus] =
    useState<ContactStatus>("NEW");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!open || contact === null) {
    return null;
  }

  // After this point TypeScript knows contact is not null.
  const selectedContact = contact;

  async function handleUpdate() {

    setLoading(true);
    setError("");

    try {

      await contactService.updateStatus(
        selectedContact.id,
        {
          status,
        }
      );

      await onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

      setError(
        "Unable to update contact status."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-slate-900">
            Update Contact Status
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {selectedContact.fullName}
          </p>

        </div>

        {/* Content */}

        <div className="p-6">

          <label
            htmlFor="contact-status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="contact-status"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as ContactStatus
              )
            }
            disabled={loading}
            className="mt-2 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          >

            {statuses.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item.replace("_", " ")}
              </option>

            ))}

          </select>

          {error && (
            <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-5 py-2 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update"}
          </button>

        </div>

      </div>

    </div>
  );
}