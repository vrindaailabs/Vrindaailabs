"use client";

import ContactRow from "./ContactRow";

import type { ContactResponse } from "@/types/contact";

interface ContactTableProps {
  contacts: ContactResponse[];

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

export default function ContactTable({
  contacts,
  onView,
  onStatus,
  onDelete,
}: ContactTableProps) {

  if (contacts.length === 0) {

    return (
      <div className="rounded-xl border bg-white p-12 text-center shadow">

        <h2 className="text-xl font-semibold text-slate-900">
          No Contact Enquiries Found
        </h2>

        <p className="mt-3 text-gray-500">
          Contact enquiries submitted from the website
          will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow">

      <table className="min-w-[1200px] w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">
              Full Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Subject
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Submitted
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {contacts.map(
            (contact) => (

              <ContactRow
                key={contact.id}
                contact={contact}
                onView={onView}
                onStatus={onStatus}
                onDelete={onDelete}
              />

            )
          )}

        </tbody>

      </table>

    </div>
  );
}