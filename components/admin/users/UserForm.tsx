"use client";

import { useState } from "react";

import type {
  User,
  UserRequest,
} from "@/types/user";

interface UserFormProps {

  initialData?: User | null;

  onSubmit: (
    request: UserRequest
  ) => Promise<void>;

  onCancel: () => void;

}

export default function UserForm({

  initialData,

  onSubmit,

  onCancel,

}: UserFormProps) {

  const [form, setForm] =
    useState<UserRequest>({
      fullName: initialData?.fullName ?? "",
      email: initialData?.email ?? "",
      password: "",
      role: initialData?.role ?? "USER",
      active: initialData?.active ?? true,
    });

  const [saving, setSaving] =
    useState(false);

  function handleChange(

    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >

  ) {

    const { name, value } =
      e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value,

    }));

  }

  function handleCheckbox(

    e: React.ChangeEvent<HTMLInputElement>

  ) {

    setForm((prev) => ({

      ...prev,

      active: e.target.checked,

    }));

  }

  async function handleSubmit(

    e: React.FormEvent

  ) {

    e.preventDefault();

    setSaving(true);

    try {

      await onSubmit(form);

    } finally {

      setSaving(false);

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>

        <label className="mb-2 block font-medium">

          Full Name

        </label>

        <input

          name="fullName"

          value={form.fullName}

          onChange={handleChange}

          required

          className="w-full rounded-lg border px-4 py-3"

        />

      </div>

      <div>

        <label className="mb-2 block font-medium">

          Email

        </label>

        <input

          type="email"

          name="email"

          value={form.email}

          onChange={handleChange}

          required

          className="w-full rounded-lg border px-4 py-3"

        />

      </div>

      <div>

        <label className="mb-2 block font-medium">

          Password

        </label>

        <input

          type="password"

          name="password"

          value={form.password}

          onChange={handleChange}

          placeholder={
            initialData
              ? "Leave blank to keep existing password"
              : "Enter password"
          }

          required={!initialData}

          className="w-full rounded-lg border px-4 py-3"

        />

      </div>

      <div>

        <label className="mb-2 block font-medium">

          Role

        </label>

        <select

          name="role"

          value={form.role}

          onChange={handleChange}

          className="w-full rounded-lg border px-4 py-3"

        >

          <option value="ADMIN">

            ADMIN

          </option>

          <option value="USER">

            USER

          </option>

        </select>

      </div>

      <div className="flex items-center gap-3">

        <input

          id="active"

          type="checkbox"

          checked={form.active}

          onChange={handleCheckbox}

        />

        <label htmlFor="active">

          Active User

        </label>

      </div>

      <div className="flex justify-end gap-4">

        <button

          type="button"

          onClick={onCancel}

          className="rounded-lg border px-6 py-3"

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