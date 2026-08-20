"use client";

import type { AuditLog } from "@/types/audit-log";

interface AuditLogDetailsDialogProps {
  open: boolean;
  log: AuditLog | null;
  onClose: () => void;
}

interface DetailFieldProps {
  label: string;
  value: string;
}

function DetailField({
  label,
  value,
}: DetailFieldProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words font-semibold text-slate-900">
        {value || "-"}
      </p>
    </div>
  );
}

export default function AuditLogDetailsDialog({
  open,
  log,
  onClose,
}: AuditLogDetailsDialogProps) {
  if (!open || !log) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Audit Log Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Activity ID: {log.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg px-3 py-1 text-3xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <DetailField
              label="Username"
              value={log.username}
            />

            <DetailField
              label="Role"
              value={log.role}
            />

            <DetailField
              label="Action"
              value={log.action}
            />

            <DetailField
              label="Module"
              value={log.module}
            />

            <DetailField
              label="IP Address"
              value={log.ipAddress ?? "-"}
            />

            <DetailField
              label="Created At"
              value={new Date(
                log.createdAt
              ).toLocaleString()}
            />
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Description
            </p>

            <div className="mt-2 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-800">
              {log.description || "-"}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              User Agent
            </p>

            <div className="mt-2 max-h-32 overflow-y-auto rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-800">
              {log.userAgent || "-"}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 justify-end border-t p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}