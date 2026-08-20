"use client";

import type { AuditLog } from "@/types/audit";

interface AuditTableProps {
  logs: AuditLog[];
  onView: (log: AuditLog) => void;
}

function getActionClass(action: string) {
  switch (action) {
    case "LOGIN":
      return "bg-green-100 text-green-700";

    case "LOGOUT":
      return "bg-gray-100 text-gray-700";

    case "DELETE":
      return "bg-red-100 text-red-700";

    case "UPDATE_STATUS":
      return "bg-yellow-100 text-yellow-700";

    case "DOWNLOAD_RESUME":
      return "bg-purple-100 text-purple-700";

    case "FORGOT_PASSWORD":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-blue-100 text-blue-700";
  }
}

function getModuleClass(module: string) {
  switch (module) {
    case "AUTH":
      return "bg-purple-100 text-purple-700";

    case "CAREER":
      return "bg-blue-100 text-blue-700";

    case "HR":
      return "bg-yellow-100 text-yellow-700";

    case "DASHBOARD":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function AuditTable({
  logs,
  onView,
}: AuditTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left text-sm font-semibold">
              User
            </th>

            <th className="p-4 text-left text-sm font-semibold">
              Action
            </th>

            <th className="p-4 text-left text-sm font-semibold">
              Module
            </th>

            <th className="p-4 text-left text-sm font-semibold">
              Description
            </th>

            <th className="p-4 text-left text-sm font-semibold">
              IP Address
            </th>

            <th className="p-4 text-left text-sm font-semibold">
              Created
            </th>

            <th className="p-4 text-center text-sm font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {logs.length === 0 ? (

            <tr>

              <td
                colSpan={7}
                className="p-12 text-center text-gray-500"
              >
                No audit logs found.
              </td>

            </tr>

          ) : (

            logs.map((log) => (

              <tr
                key={log.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">

                  <div className="font-medium">
                    {log.username}
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    {log.role}
                  </div>

                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getActionClass(
                      log.action
                    )}`}
                  >
                    {log.action}
                  </span>

                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getModuleClass(
                      log.module
                    )}`}
                  >
                    {log.module}
                  </span>

                </td>

                <td className="max-w-md p-4 text-sm">
                  {log.description || "-"}
                </td>

                <td className="p-4 text-sm">
                  {log.ipAddress || "-"}
                </td>

                <td className="whitespace-nowrap p-4 text-sm">
                  {new Date(
                    log.createdAt
                  ).toLocaleString()}
                </td>

                <td className="p-4 text-center">

                  <button
                    type="button"
                    onClick={() => onView(log)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}