"use client";

import { useState } from "react";

import type {
  User,
  UserRequest,
  UpdateUserRequest,
  UserRole,
} from "@/types/user";

interface UserFormProps {
  initialData?: User | null;

  onSubmit: (
    request: UserRequest | UpdateUserRequest
  ) => Promise<void>;

  onCancel: () => void;
}

export default function UserForm({
  initialData,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [fullName, setFullName] = useState(
    initialData?.fullName ?? ""
  );

  const [email, setEmail] = useState(
    initialData?.email ?? ""
  );

  const [password, setPassword] = useState("");

  const [role, setRole] =
    useState<UserRole>(
      initialData?.role ?? "USER"
    );

  const [enabled, setEnabled] =
    useState(
      initialData?.enabled ?? true
    );

  const [saving, setSaving] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSaving(true);

    try {
      if (initialData) {
        const request: UpdateUserRequest = {
          fullName,
          email,
          role,
          enabled,
        };

        await onSubmit(request);
      } else {
        const request: UserRequest = {
          fullName,
          email,
          password,
          role,
          enabled,
        };

        await onSubmit(request);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Full Name */}

      <div>
        <label className="mb-2 block font-medium">
          Full Name
        </label>

        <input
          type="text"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          required
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Email */}

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Password */}

      {!initialData && (
        <div>
          <label className="mb-2 block font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            minLength={8}
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <p className="mt-1 text-sm text-gray-500">
            Password must be at least 8 characters.
          </p>
        </div>
      )}

      {/* Role */}

      <div>
        <label className="mb-2 block font-medium">
          Role
        </label>

        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value as UserRole
            )
          }
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="ADMIN">
            ADMIN
          </option>

          <option value="HR">
            HR
          </option>

          <option value="USER">
            USER
          </option>
        </select>
      </div>

      {/* Enabled */}

      <div className="flex items-center gap-3">
        <input
          id="enabled"
          type="checkbox"
          checked={enabled}
          onChange={(e) =>
            setEnabled(e.target.checked)
          }
          className="h-4 w-4"
        />

        <label
          htmlFor="enabled"
          className="font-medium"
        >
          Active User
        </label>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border px-6 py-3 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : initialData
              ? "Update User"
              : "Create User"}
        </button>

      </div>
    </form>
  );
}