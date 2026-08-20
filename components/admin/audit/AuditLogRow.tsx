"use client";

import type { AuditLog } from "@/types/audit-log";

interface AuditLogRowProps {
  log: AuditLog;
  onView: (log: AuditLog) => void;
}

function getActionClass(action: string): string {
  switch (action) {
    case "LOGIN":
    case "REGISTER":
      return "bg-green-100 text-green-700";

    case "LOGOUT":
      return "bg-gray-100 text-gray-700";

    case "DELETE":
      return "bg-red-100 text-red-700";

    case "UPDATE":
    case "UPDATE_STATUS":
      return "bg-yellow-100 text-yellow-700";

    case "CREATE":
    case "APPLY":
      return "bg-blue-100 text-blue-700";

    case "DOWNLOAD_RESUME":
      return "bg-purple-100 text-purple-700";

    case "ACCOUNT_LOCKED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getModuleClass(module: string): string {
  switch (module) {
    case "AUTH":
      return "bg-indigo-100 text-indigo-700";

    case "CAREER":
      return "bg-blue-100 text-blue-700";

    case "HR":
      return "bg-purple-100 text-purple-700";

    case "USER":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function AuditLogRow({
  log,
  onView,
}: AuditLogRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="whitespace-nowrap p-4">
        <div className="font-medium text-slate-900">
          {log.username}
        </div>

        <div className="mt-1 text-xs text-gray-500">
          {log.role}
        </div>
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getActionClass(
            log.action
          )}`}
        >
          {log.action}
        </span>
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getModuleClass(
            log.module
          )}`}
        >
          {log.module}
        </span>
      </td>

      <td className="max-w-md p-4">
        <p className="truncate text-sm text-slate-700">
          {log.description || "-"}
        </p>
      </td>

      <td className="whitespace-nowrap p-4 text-sm text-slate-600">
        {log.ipAddress || "-"}
      </td>

      <td className="whitespace-nowrap p-4 text-sm text-slate-600">
        {new Date(log.createdAt).toLocaleString()}
      </td>

      <td className="p-4">
        <button
          type="button"
          onClick={() => onView(log)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          View
        </button>
      </td>
    </tr>
  );
}