"use client";

import { useState } from "react";

import type {
  Product,
  ProductRequest,
} from "@/types/product";

import type { Media } from "@/types/media";

import { mediaService } from "@/services/media.service";

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

  const [media, setMedia] =
    useState<Media[]>([]);

  const [mediaOpen, setMediaOpen] =
    useState(false);

  const [mediaLoading, setMediaLoading] =
    useState(false);

  const [mediaError, setMediaError] =
    useState("");

  async function loadMedia() {
    setMediaLoading(true);
    setMediaError("");

    try {
      const response =
        await mediaService.getAll();

      const images =
        response.data.filter(
          (item) =>
            item.active &&
            item.contentType.startsWith(
              "image/"
            )
        );

      setMedia(images);
    } catch (error) {
      console.error(error);

      setMediaError(
        "Failed to load media library."
      );
    } finally {
      setMediaLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleOpenMedia() {
    setMediaOpen(true);

    if (media.length === 0) {
      void loadMedia();
    }
  }

  function handleSelectMedia(
    selectedMedia: Media
  ) {
    setForm((previous) => ({
      ...previous,
      imageUrl:
        selectedMedia.fileUrl,
    }));

    setMediaOpen(false);
  }

  function removeImage() {
    setForm((previous) => ({
      ...previous,
      imageUrl: "",
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
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
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Product Name */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-medium"
          >
            Product Name
          </label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        {/* Short Description */}

        <div>
          <label
            htmlFor="shortDescription"
            className="mb-2 block font-medium"
          >
            Short Description
          </label>

          <textarea
            id="shortDescription"
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            rows={3}
            required
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        {/* Description */}

        <div>
          <label
            htmlFor="description"
            className="mb-2 block font-medium"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={8}
            required
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        {/* Product Image */}

        <div>
          <label className="mb-2 block font-medium">
            Product Image
          </label>

          {form.imageUrl ? (
            <div className="rounded-lg border p-4">

              <div className="flex items-start gap-4">

                <img
                  src={form.imageUrl}
                  alt="Product"
                  className="h-32 w-32 rounded-lg border object-cover"
                />

                <div className="min-w-0 flex-1">

                  <p className="font-medium text-gray-700">
                    Selected Image
                  </p>

                  <p className="mt-1 break-all text-xs text-gray-500">
                    {form.imageUrl}
                  </p>

                  <div className="mt-4 flex gap-3">

                    <button
                      type="button"
                      onClick={handleOpenMedia}
                      className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                      Change Image
                    </button>

                    <button
                      type="button"
                      onClick={removeImage}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            </div>
          ) : (
            <button
              type="button"
              onClick={handleOpenMedia}
              className="flex w-full items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition hover:border-blue-500 hover:bg-blue-50"
            >
              <div>

                <p className="font-medium text-gray-700">
                  Choose from Media Library
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Select an uploaded product image
                </p>

              </div>
            </button>
          )}
        </div>

        {/* Actions */}

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg border px-6 py-3 disabled:opacity-50"
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
                ? "Update Product"
                : "Create Product"}
          </button>

        </div>

      </form>

      {/* Media Library Dialog */}

      {mediaOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b p-6">

              <div>

                <h2 className="text-xl font-bold">
                  Select Product Image
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose an image from the Media Library.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setMediaOpen(false)
                }
                className="rounded-lg px-3 py-2 text-2xl text-gray-500 hover:bg-gray-100"
              >
                ×
              </button>

            </div>

            {/* Media */}

            <div className="max-h-[65vh] overflow-y-auto p-6">

              {mediaLoading && (
                <div className="flex justify-center p-10">
                  <p className="text-gray-500">
                    Loading images...
                  </p>
                </div>
              )}

              {mediaError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {mediaError}
                </div>
              )}

              {!mediaLoading &&
                !mediaError &&
                media.length === 0 && (
                  <div className="rounded-lg border bg-gray-50 p-10 text-center">

                    <p className="font-medium text-gray-700">
                      No images available
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Upload images in the Media Library first.
                    </p>

                  </div>
                )}

              {!mediaLoading &&
                media.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                    {media.map((item) => (

                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          handleSelectMedia(item)
                        }
                        className={`group overflow-hidden rounded-lg border text-left transition hover:border-blue-500 hover:ring-2 hover:ring-blue-200 ${
                          form.imageUrl ===
                          item.fileUrl
                            ? "border-blue-600 ring-2 ring-blue-200"
                            : ""
                        }`}
                      >

                        <div className="aspect-square overflow-hidden bg-gray-100">

                          <img
                            src={
                              mediaService.getFileUrl(
                                item
                              )
                            }
                            alt={
                              item.altText ||
                              item.originalFileName
                            }
                            className="h-full w-full object-cover transition group-hover:scale-105"
                          />

                        </div>

                        <div className="p-3">

                          <p
                            className="truncate text-sm font-medium text-gray-800"
                            title={
                              item.originalFileName
                            }
                          >
                            {item.originalFileName}
                          </p>

                          {item.folder && (
                            <p className="mt-1 truncate text-xs text-gray-500">
                              {item.folder}
                            </p>
                          )}

                        </div>

                      </button>

                    ))}

                  </div>
                )}

            </div>

            {/* Footer */}

            <div className="flex justify-end border-t p-4">

              <button
                type="button"
                onClick={() =>
                  setMediaOpen(false)
                }
                className="rounded-lg border px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}