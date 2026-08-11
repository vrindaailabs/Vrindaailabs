"use client";

import { useState } from "react";

import type {
  Service,
  ServiceRequest,
} from "@/types/service";

interface ServiceFormProps {
  initialData?: Service | null;
  onSubmit: (
    request: ServiceRequest
  ) => Promise<void>;
  onCancel: () => void;
}

export default function ServiceForm({
  initialData,
  onSubmit,
  onCancel,
}: ServiceFormProps) {

  const [form, setForm] =
    useState<ServiceRequest>({
      title: initialData?.title ?? "",
      shortDescription:
        initialData?.shortDescription ?? "",
      description:
        initialData?.description ?? "",
      icon:
        initialData?.icon ?? "",
      imageUrl:
        initialData?.imageUrl ?? "",
    });

  const [saving, setSaving] =
    useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
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
          Title
        </label>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Short Description
        </label>

        <textarea
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          rows={3}
          required
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={8}
          required
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block font-medium">
            Icon
          </label>

          <input
            name="icon"
            value={form.icon}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Image URL
          </label>

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

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
              ? "Update Service"
              : "Create Service"}
        </button>

      </div>

    </form>
  );
}