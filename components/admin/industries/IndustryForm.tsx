"use client";

import { useState } from "react";

import type {
  Industry,
  IndustryRequest,
} from "@/types/industry";

interface IndustryFormProps {

  initialData?: Industry | null;

  onSubmit: (
    request: IndustryRequest
  ) => Promise<void>;

  onCancel: () => void;

}

export default function IndustryForm({

  initialData,

  onSubmit,

  onCancel,

}: IndustryFormProps) {

  const [form, setForm] =
    useState<IndustryRequest>({

      name:
        initialData?.name ?? "",

      shortDescription:
        initialData?.shortDescription ?? "",

      description:
        initialData?.description ?? "",

      imageUrl:
        initialData?.imageUrl ?? "",

    });

  const [saving, setSaving] =
    useState(false);

  function handleChange(

    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
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

          Industry Name

        </label>

        <input

          name="name"

          value={form.name}

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

          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"

        >

          {saving

            ? "Saving..."

            : initialData

            ? "Update Industry"

            : "Create Industry"}

        </button>

      </div>

    </form>

  );

}