"use client";

interface AuditFiltersProps {
  username: string;
  action: string;
  module: string;
  startDate: string;
  endDate: string;

  onUsernameChange: (value: string) => void;
  onActionChange: (value: string) => void;
  onModuleChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;

  onSearch: () => void;
  onClear: () => void;
  onRefresh: () => void;

  loading: boolean;
}

export default function AuditFilters({
  username,
  action,
  module,
  startDate,
  endDate,

  onUsernameChange,
  onActionChange,
  onModuleChange,
  onStartDateChange,
  onEndDateChange,

  onSearch,
  onClear,
  onRefresh,

  loading,
}: AuditFiltersProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">

        {/* Username */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              onUsernameChange(e.target.value)
            }
            placeholder="Search username"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Action */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Action
          </label>

          <select
            value={action}
            onChange={(e) =>
              onActionChange(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Actions</option>
            <option value="LOGIN">LOGIN</option>
            <option value="LOGOUT">LOGOUT</option>
            <option value="REGISTER">REGISTER</option>
            <option value="FORGOT_PASSWORD">
              FORGOT_PASSWORD
            </option>
            <option value="RESET_PASSWORD">
              RESET_PASSWORD
            </option>
            <option value="APPLY">APPLY</option>
            <option value="UPDATE_STATUS">
              UPDATE_STATUS
            </option>
            <option value="DOWNLOAD_RESUME">
              DOWNLOAD_RESUME
            </option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        {/* Module */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Module
          </label>

          <select
            value={module}
            onChange={(e) =>
              onModuleChange(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Modules</option>
            <option value="AUTH">AUTH</option>
            <option value="CAREER">CAREER</option>
            <option value="HR">HR</option>
            <option value="DASHBOARD">DASHBOARD</option>
            <option value="CONTACT">CONTACT</option>
            <option value="NEWSLETTER">NEWSLETTER</option>
            <option value="BLOG">BLOG</option>
            <option value="SERVICE">SERVICE</option>
            <option value="PRODUCT">PRODUCT</option>
            <option value="INDUSTRY">INDUSTRY</option>
            <option value="MEDIA">MEDIA</option>
            <option value="USER">USER</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              onStartDateChange(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            End Date
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              onEndDateChange(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2">

          <button
            type="button"
            onClick={onSearch}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Search"}
          </button>

          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            ↻
          </button>

        </div>

      </div>

    </div>
  );
}