"use client";

import type { ContactStatus } from "@/types/contact";

interface ContactStatusBadgeProps {
  status: ContactStatus;
}

const statusStyles: Record<
  ContactStatus,
  string
> = {
  NEW:
    "bg-blue-100 text-blue-700",

  IN_PROGRESS:
    "bg-yellow-100 text-yellow-700",

  RESOLVED:
    "bg-green-100 text-green-700",
};

export default function ContactStatusBadge({
  status,
}: ContactStatusBadgeProps) {

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}