"use client";

import type { Service } from "@/types/service";

interface ServiceRowProps {

  service: Service;

  onEdit: (service: Service) => void;

  onDelete: (service: Service) => void;

}

export default function ServiceRow({

  service,

  onEdit,

  onDelete,

}: ServiceRowProps) {

  return (

    <tr className="border-b hover:bg-gray-50 transition">

      <td className="p-4">

        {service.title}

      </td>

      <td className="p-4">

        {service.shortDescription}

      </td>

      <td className="p-4">

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            service.active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {service.active ? "Active" : "Inactive"}
        </span>

      </td>

      <td className="p-4">

        {new Date(service.createdAt).toLocaleDateString()}

      </td>

      <td className="space-x-2 p-4">

        <button
          onClick={() => onEdit(service)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(service)}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Delete
        </button>

      </td>

    </tr>

  );

}