"use client";

import type { AuditLog } from "@/types/audit-log";

import AuditLogRow from "./AuditLogRow";

interface AuditLogTableProps {
  logs: AuditLog[];
  onView: (log: AuditLog) => void;
}

export default function AuditLogTable({
  logs,
  onView,
}: AuditLogTableProps) {
  if (logs.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center shadow">
        <h2 className="text-xl font-semibold text-slate-900">
          No Audit Logs Found
        </h2>

        <p className="mt-3 text-gray-500">
          There are no audit activities matching the selected filters.
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
              User
            </th>

            <th className="p-4 text-left">
              Action
            </th>

            <th className="p-4 text-left">
              Module
            </th>

            <th className="p-4 text-left">
              Description
            </th>

            <th className="p-4 text-left">
              IP Address
            </th>

            <th className="p-4 text-left">
              Created
            </th>

            <th className="p-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <AuditLogRow
              key={log.id}
              log={log}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}