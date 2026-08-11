"use client";

import CareerStatusBadge from "./CareerStatusBadge";
import { CareerApplication } from "@/types/career-application";

interface CareerRowProps {
  application: CareerApplication;

  onView: (id: number) => void;

  onResume: (id: number) => void;

  onStatus: (id: number) => void;

  onDelete: (id: number) => void;
}

export default function CareerRow({

  application,

  onView,

  onResume,

  onStatus,

  onDelete,

}: CareerRowProps) {

  return (

    <tr className="border-b hover:bg-gray-50">

      <td className="p-3">
        {application.fullName}
      </td>

      <td className="p-3">
        {application.email}
      </td>

      <td className="p-3">
        {application.phoneNumber}
      </td>

      <td className="p-3">
        {application.jobTitle}
      </td>

      <td className="p-3">
        {application.experience}
      </td>

      <td className="p-3">

        <CareerStatusBadge
          status={application.candidateStatus}
        />

      </td>

      <td className="p-3">
        {new Date(application.appliedAt)
          .toLocaleDateString()}
      </td>

      <td className="space-x-2 p-3">

        <button
          onClick={() => onView(application.id)}
          className="rounded bg-blue-600 px-3 py-1 text-white"
        >
          View
        </button>

        <button
          onClick={() => onResume(application.id)}
          className="rounded bg-green-600 px-3 py-1 text-white"
        >
          Resume
        </button>

        <button
          onClick={() => onStatus(application.id)}
          className="rounded bg-yellow-500 px-3 py-1 text-white"
        >
          Status
        </button>

        <button
          onClick={() => onDelete(application.id)}
          className="rounded bg-red-600 px-3 py-1 text-white"
        >
          Delete
        </button>

      </td>

    </tr>

  );

}