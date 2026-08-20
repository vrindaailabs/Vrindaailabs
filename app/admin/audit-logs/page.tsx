"use client";

import { useState } from "react";

import AuditLogTable from "@/components/admin/audit/AuditLogTable";
import AuditLogDetailsDialog from "@/components/admin/audit/AuditLogDetailsDialog";

import { auditLogService } from "@/services/audit-log.service";

import type {
  AuditLog,
  AuditLogFilters,
} from "@/types/audit-log";

const ACTIONS = [
  "LOGIN",
  "LOGOUT",
  "REGISTER",
  "FORGOT_PASSWORD",
  "RESET_PASSWORD",
  "REFRESH_TOKEN",
  "ACCOUNT_LOCKED",
  "ACCOUNT_UNLOCKED",
  "APPLY",
  "DELETE",
  "UPDATE_STATUS",
  "DOWNLOAD_RESUME",
  "CREATE",
  "UPDATE",
];

const MODULES = [
  "AUTH",
  "CAREER",
  "HR",
  "DASHBOARD",
  "USER",
  "BLOG",
  "PRODUCT",
  "SERVICE",
  "INDUSTRY",
  "CONTACT",
  "NEWSLETTER",
  "MEDIA",
];

const initialFilters: AuditLogFilters = {
  username: "",
  action: "",
  module: "",
  startDate: "",
  endDate: "",
};

function startOfDay(date: string): string {
  return `${date}T00:00:00`;
}

function endOfDay(date: string): string {
  return `${date}T23:59:59.999`;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const [filters, setFilters] =
    useState<AuditLogFilters>(
      initialFilters
    );

  const [loading, setLoading] =
    useState(false);

  const [searching, setSearching] =
    useState(false);

  const [loaded, setLoaded] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [selectedLog, setSelectedLog] =
    useState<AuditLog | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  async function loadRecentLogs() {
    try {
      setLoading(true);
      setError(null);

      const response =
        await auditLogService.getRecent();

      setLogs(response);
      setLoaded(true);
    } catch (error) {
      console.error(
        "Failed to load audit logs:",
        error
      );

      setError(
        "Unable to load audit logs."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    try {
      setSearching(true);
      setError(null);

      /*
       * DATE RANGE
       */
      if (
        filters.startDate &&
        filters.endDate
      ) {
        const response =
          await auditLogService.getByDateRange(
            startOfDay(filters.startDate),
            endOfDay(filters.endDate)
          );

        let filtered = response;

        if (filters.username.trim()) {
          const username =
            filters.username
              .trim()
              .toLowerCase();

          filtered = filtered.filter(
            (log) =>
              log.username
                .toLowerCase()
                .includes(username)
          );
        }

        if (filters.action) {
          filtered = filtered.filter(
            (log) =>
              log.action ===
              filters.action
          );
        }

        if (filters.module) {
          filtered = filtered.filter(
            (log) =>
              log.module ===
              filters.module
          );
        }

        setLogs(filtered);
        setLoaded(true);

        return;
      }

      if (
        filters.startDate &&
        !filters.endDate
      ) {
        setError(
          "Please select an end date."
        );

        return;
      }

      if (
        !filters.startDate &&
        filters.endDate
      ) {
        setError(
          "Please select a start date."
        );

        return;
      }

      /*
       * USERNAME
       */
      if (filters.username.trim()) {
        const response =
          await auditLogService.getByUsername(
            filters.username.trim()
          );

        let filtered = response;

        if (filters.action) {
          filtered = filtered.filter(
            (log) =>
              log.action ===
              filters.action
          );
        }

        if (filters.module) {
          filtered = filtered.filter(
            (log) =>
              log.module ===
              filters.module
          );
        }

        setLogs(filtered);
        setLoaded(true);

        return;
      }

      /*
       * ACTION
       */
      if (filters.action) {
        const response =
          await auditLogService.getByAction(
            filters.action
          );

        let filtered = response;

        if (filters.module) {
          filtered = filtered.filter(
            (log) =>
              log.module ===
              filters.module
          );
        }

        setLogs(filtered);
        setLoaded(true);

        return;
      }

      /*
       * MODULE
       */
      if (filters.module) {
        const response =
          await auditLogService.getByModule(
            filters.module
          );

        setLogs(response);
        setLoaded(true);

        return;
      }

      /*
       * NO FILTER
       */
      const response =
        await auditLogService.getRecent();

      setLogs(response);
      setLoaded(true);
    } catch (error) {
      console.error(
        "Audit log search failed:",
        error
      );

      setError(
        "Unable to search audit logs."
      );
    } finally {
      setSearching(false);
    }
  }

  function handleClearFilters() {
    setFilters(initialFilters);
    setError(null);
    setLoaded(false);
    setLogs([]);
  }

  function handleView(log: AuditLog) {
    setSelectedLog(log);
    setDetailsOpen(true);
  }

  function handleCloseDetails() {
    setDetailsOpen(false);
    setSelectedLog(null);
  }

  return (
    <div className="space-y-8 p-8">
      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Audit Logs
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor administrator and HR
            activities across the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={loadRecentLogs}
          disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Refreshing..."
            : "Load Recent Logs"}
        </button>
      </div>

      {/* FILTERS */}

      <div className="rounded-xl border bg-white p-6 shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          {/* USERNAME */}

          <div>
            <label
              htmlFor="audit-username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Username
            </label>

            <input
              id="audit-username"
              type="text"
              value={filters.username}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  username:
                    event.target.value,
                }))
              }
              placeholder="admin@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* ACTION */}

          <div>
            <label
              htmlFor="audit-action"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Action
            </label>

            <select
              id="audit-action"
              value={filters.action}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  action:
                    event.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                All Actions
              </option>

              {ACTIONS.map((action) => (
                <option
                  key={action}
                  value={action}
                >
                  {action}
                </option>
              ))}
            </select>
          </div>

          {/* MODULE */}

          <div>
            <label
              htmlFor="audit-module"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Module
            </label>

            <select
              id="audit-module"
              value={filters.module}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  module:
                    event.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                All Modules
              </option>

              {MODULES.map((module) => (
                <option
                  key={module}
                  value={module}
                >
                  {module}
                </option>
              ))}
            </select>
          </div>

          {/* START DATE */}

          <div>
            <label
              htmlFor="audit-start-date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Start Date
            </label>

            <input
              id="audit-start-date"
              type="date"
              value={filters.startDate}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  startDate:
                    event.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* END DATE */}

          <div>
            <label
              htmlFor="audit-end-date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              End Date
            </label>

            <input
              id="audit-end-date"
              type="date"
              value={filters.endDate}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  endDate:
                    event.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* BUTTONS */}

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {searching
                ? "Searching..."
                : "Search"}
            </button>

            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* RESULTS */}

      {!loaded ? (
        <div className="rounded-xl border bg-white p-12 text-center shadow">
          <h2 className="text-xl font-semibold text-slate-900">
            Audit Logs
          </h2>

          <p className="mt-3 text-gray-500">
            Click{" "}
            <span className="font-semibold">
              Load Recent Logs
            </span>{" "}
            to view the latest audit activities.
          </p>

          <button
            type="button"
            onClick={loadRecentLogs}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Load Audit Logs
          </button>
        </div>
      ) : loading ? (
        <div className="rounded-xl border bg-white p-12 text-center shadow">
          <p className="text-lg font-medium text-slate-700">
            Loading Audit Logs...
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Activity History
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Showing{" "}
                {logs.length} audit log
                {logs.length === 1
                  ? ""
                  : "s"}
                .
              </p>
            </div>
          </div>

          <AuditLogTable
            logs={logs}
            onView={handleView}
          />
        </>
      )}

      {/* DETAILS */}

      <AuditLogDetailsDialog
        open={detailsOpen}
        log={selectedLog}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
