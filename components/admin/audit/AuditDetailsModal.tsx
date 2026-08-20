"use client";

import type { AuditLog } from "@/types/audit";

interface AuditDetailsModalProps {
  log: AuditLog | null;
  onClose: () => void;
}

export default function AuditDetailsModal({
  log,
  onClose,
}: AuditDetailsModalProps) {
  if (!log) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              Audit Log Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Activity ID: {log.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Details */}
        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">
              Username
            </p>

            <p className="mt-1 font-semibold">
              {log.username}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Role
            </p>

            <p className="mt-1 font-semibold">
              {log.role}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Action
            </p>

            <p className="mt-1 font-semibold">
              {log.action}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Module
            </p>

            <p className="mt-1 font-semibold">
              {log.module}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              IP Address
            </p>

            <p className="mt-1 font-semibold">
              {log.ipAddress || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Created At
            </p>

            <p className="mt-1 font-semibold">
              {new Date(
                log.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <div className="md:col-span-2">

            <p className="text-sm text-gray-500">
              Description
            </p>

            <div className="mt-2 rounded-lg bg-gray-50 p-4 text-sm">
              {log.description || "-"}
            </div>

          </div>

          <div className="md:col-span-2">

            <p className="text-sm text-gray-500">
              User Agent
            </p>

            <div className="mt-2 break-all rounded-lg bg-gray-50 p-4 text-sm">
              {log.userAgent || "-"}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t p-5">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}