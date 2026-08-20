"use client";

import { useEffect, useMemo, useState } from "react";

import { auditService } from "@/services/audit.service";

import type { AuditLog } from "@/types/audit";

import AuditFilters from "@/components/admin/audit/AuditFilters";
import AuditTable from "@/components/admin/audit/AuditTable";
import AuditDetailsModal from "@/components/admin/audit/AuditDetailsModal";

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [action, setAction] =
    useState("");

  const [module, setModule] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [searchApplied, setSearchApplied] =
    useState(false);

  const [selectedLog, setSelectedLog] =
    useState<AuditLog | null>(null);

  async function loadLogs() {
    try {
      setLoading(true);
      setError("");

      const data =
        await auditService.getRecent();

      setLogs(data);
      setSearchApplied(false);

    } catch (error) {
      console.error(
        "Audit logs error:",
        error
      );

      setError(
        "Unable to load audit logs."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchInitialLogs() {
      try {
        const data =
          await auditService.getRecent();

        if (!cancelled) {
          setLogs(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Audit logs error:",
          error
        );

        if (!cancelled) {
          setError(
            "Unable to load audit logs."
          );

          setLoading(false);
        }
      }
    }

    fetchInitialLogs();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleSearch() {
    setSearchApplied(true);
  }

  function handleClear() {
    setUsername("");
    setAction("");
    setModule("");
    setStartDate("");
    setEndDate("");
    setSearchApplied(false);
  }

  async function handleRefresh() {
    await loadLogs();
  }

  const filteredLogs = useMemo(() => {
    if (!searchApplied) {
      return logs;
    }

    return logs.filter((log) => {
      const usernameMatch =
        !username ||
        log.username
          .toLowerCase()
          .includes(
            username.toLowerCase()
          );

      const actionMatch =
        !action ||
        log.action === action;

      const moduleMatch =
        !module ||
        log.module === module;

      let startMatch = true;
      let endMatch = true;

      if (startDate) {
        const start =
          new Date(
            `${startDate}T00:00:00`
          );

        const created =
          new Date(log.createdAt);

        startMatch =
          created >= start;
      }

      if (endDate) {
        const end =
          new Date(
            `${endDate}T23:59:59`
          );

        const created =
          new Date(log.createdAt);

        endMatch =
          created <= end;
      }

      return (
        usernameMatch &&
        actionMatch &&
        moduleMatch &&
        startMatch &&
        endMatch
      );
    });
  }, [
    logs,
    searchApplied,
    username,
    action,
    module,
    startDate,
    endDate,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-gray-500">
          Loading Audit Logs...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Audit Logs
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor administrator and HR activities.
          </p>
        </div>

        <div className="rounded-lg bg-white px-5 py-3 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Logs
          </p>

          <p className="text-2xl font-bold">
            {filteredLogs.length}
          </p>
        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Filters */}
      <AuditFilters
        username={username}
        action={action}
        module={module}
        startDate={startDate}
        endDate={endDate}
        onUsernameChange={setUsername}
        onActionChange={setAction}
        onModuleChange={setModule}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSearch={handleSearch}
        onClear={handleClear}
        onRefresh={handleRefresh}
        loading={loading}
      />

      {/* Result information */}
      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {filteredLogs.length}
          </span>{" "}
          audit logs
        </p>

        {searchApplied && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
            Filters Applied
          </span>
        )}

      </div>

      {/* Table */}
      <AuditTable
        logs={filteredLogs}
        onView={setSelectedLog}
      />

      {/* Details Modal */}
      <AuditDetailsModal
        log={selectedLog}
        onClose={() =>
          setSelectedLog(null)
        }
      />

    </div>
  );
}