"use client";

import type { Industry } from "@/types/industry";

interface IndustryRowProps {

  industry: Industry;

  onEdit: (industry: Industry) => void;

  onDelete: (industry: Industry) => void;

}

export default function IndustryRow({

  industry,

  onEdit,

  onDelete,

}: IndustryRowProps) {

  return (

    <tr className="border-b hover:bg-gray-50">

      <td className="p-4">

        {industry.name}

      </td>

      <td className="p-4">

        {industry.shortDescription}

      </td>

      <td className="p-4">

        <span
          className={`rounded-full px-3 py-1 text-sm ${
            industry.active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {industry.active
            ? "Active"
            : "Inactive"}

        </span>

      </td>

      <td className="p-4">

        {new Date(industry.createdAt)
          .toLocaleDateString()}

      </td>

      <td className="space-x-2 p-4">

        <button
          onClick={() => onEdit(industry)}
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(industry)}
          className="rounded bg-red-600 px-3 py-2 text-white"
        >
          Delete
        </button>

      </td>

    </tr>

  );

}