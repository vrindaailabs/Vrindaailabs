"use client";

import ContactStatusBadge from "./ContactStatusBadge";

import type { ContactResponse } from "@/types/contact";

interface ContactRowProps {
  contact: ContactResponse;

  onView: (
    contact: ContactResponse
  ) => void;

  onStatus: (
    contact: ContactResponse
  ) => void;

  onDelete: (
    contact: ContactResponse
  ) => void;
}

export default function ContactRow({
  contact,
  onView,
  onStatus,
  onDelete,
}: ContactRowProps) {

  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-4 font-medium text-slate-900">
        {contact.fullName}
      </td>

      <td className="p-4 text-gray-700">
        {contact.email}
      </td>

      <td className="p-4 text-gray-700">
        {contact.phoneNumber}
      </td>

      <td className="max-w-xs p-4">
        <div
          className="truncate"
          title={contact.subject}
        >
          {contact.subject}
        </div>
      </td>

      <td className="p-4">
        <ContactStatusBadge
          status={contact.status}
        />
      </td>

      <td className="whitespace-nowrap p-4 text-gray-700">
        {new Date(
          contact.createdAt
        ).toLocaleDateString()}
      </td>

      <td className="whitespace-nowrap p-4">

        <div className="flex gap-2">

          <button
            type="button"
            onClick={() =>
              onView(contact)
            }
            className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          >
            View
          </button>

          <button
            type="button"
            onClick={() =>
              onStatus(contact)
            }
            className="rounded bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600"
          >
            Status
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(contact)
            }
            className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
}