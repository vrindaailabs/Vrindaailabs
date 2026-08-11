"use client";

import { useState } from "react";

import type {
  Product,
  ProductRequest,
} from "@/types/product";

interface ProductFormProps {

  initialData?: Product | null;

  onSubmit: (
    request: ProductRequest
  ) => Promise<void>;

  onCancel: () => void;

}

export default function ProductForm({

  initialData,

  onSubmit,

  onCancel,

}: ProductFormProps) {

  const [form, setForm] =
    useState<ProductRequest>({

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

          Product Name

        </label>

        <input

          name="name"

          value={form.name}

          onChange={handleChange}

          className="w-full rounded-lg border px-4 py-3"

          required

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

          className="w-full rounded-lg border px-4 py-3"

          required

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

          className="w-full rounded-lg border px-4 py-3"

          required

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
            ? "Update Product"
            : "Create Product"}

        </button>

      </div>

    </form>

  );

}