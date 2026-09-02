"use client";

import CareerRow from "./CareerRow";

import type {
  CareerApplication,
} from "@/types/career";

interface CareerTableProps {
  applications: CareerApplication[];

  onView: (id: number) => void;

  onResume: (id: number) => void;

  onStatus: (id: number) => void;

  onDelete: (id: number) => void;
}

export default function CareerTable({
  applications,
  onView,
  onResume,
  onStatus,
  onDelete,
}: CareerTableProps) {
  if (applications.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-10 text-center text-gray-500">
        No Career Applications Found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Phone
            </th>

            <th className="p-3 text-left">
              Job
            </th>

            <th className="p-3 text-left">
              Experience
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Applied
            </th>

            <th className="p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <CareerRow
              key={application.id}
              application={application}
              onView={onView}
              onResume={onResume}
              onStatus={onStatus}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}