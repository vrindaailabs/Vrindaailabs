"use client";

import { useState } from "react";

import type {
  Media,
  MediaUpdateRequest,
} from "@/types/media";

interface MediaFormProps {
  media?: Media | null;

  onSubmit: (
    request: MediaUpdateRequest
  ) => Promise<void>;

  onCancel: () => void;
}

function createFormData(
  media?: Media | null
): MediaUpdateRequest {
  return {
    folder: media?.folder ?? "",
    altText: media?.altText ?? "",
    description: media?.description ?? "",
    active: media?.active ?? true,
  };
}

export default function MediaForm({
  media,
  onSubmit,
  onCancel,
}: MediaFormProps) {
  const [form, setForm] =
    useState<MediaUpdateRequest>(() =>
      createFormData(media)
    );

  const [saving, setSaving] =
    useState(false);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleActiveChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((previous) => ({
      ...previous,
      active: event.target.checked,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);

    try {
      await onSubmit({
        folder:
          form.folder?.trim() || undefined,

        altText:
          form.altText?.trim() || undefined,

        description:
          form.description?.trim() || undefined,

        active:
          form.active ?? true,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {media && (
        <div className="rounded-lg border bg-gray-50 p-4">
          <div className="flex items-center gap-4">

            {media.contentType.startsWith(
              "image/"
            ) ? (
              <img
                src={media.fileUrl}
                alt={
                  media.altText ||
                  media.originalFileName
                }
                className="h-20 w-20 rounded-lg border object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-white text-xs font-semibold text-gray-500">
                FILE
              </div>
            )}

            <div className="min-w-0">

              <p
                className="truncate font-semibold text-slate-900"
                title={media.originalFileName}
              >
                {media.originalFileName}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {media.contentType}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {media.fileSize.toLocaleString()} bytes
              </p>

            </div>

          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="folder"
          className="mb-2 block font-medium text-slate-900"
        >
          Folder
        </label>

        <input
          id="folder"
          name="folder"
          value={form.folder ?? ""}
          onChange={handleChange}
          placeholder="blogs, products, services..."
          maxLength={100}
          className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <p className="mt-1 text-xs text-gray-500">
          Use letters, numbers, hyphens,
          underscores and / for subfolders.
        </p>
      </div>

      <div>
        <label
          htmlFor="altText"
          className="mb-2 block font-medium text-slate-900"
        >
          Alt Text
        </label>

        <input
          id="altText"
          name="altText"
          value={form.altText ?? ""}
          onChange={handleChange}
          placeholder="Describe the image for accessibility"
          maxLength={500}
          className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block font-medium text-slate-900"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description ?? ""}
          onChange={handleChange}
          placeholder="Optional description"
          maxLength={1000}
          rows={5}
          className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="flex items-center gap-3">

        <input
          id="active"
          type="checkbox"
          checked={form.active ?? true}
          onChange={handleActiveChange}
          className="h-4 w-4"
        />

        <label
          htmlFor="active"
          className="font-medium text-slate-900"
        >
          Active
        </label>

      </div>

      <div className="flex justify-end gap-3 border-t pt-6">

        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border px-5 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>
    </form>
  );
}