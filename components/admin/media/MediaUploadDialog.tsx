"use client";

import { useState } from "react";

interface MediaUploadDialogProps {
  open: boolean;

  onClose: () => void;

  onSubmit: (
    file: File,
    folder: string,
    altText: string,
    description: string
  ) => Promise<void>;
}

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
];

export default function MediaUploadDialog({
  open,
  onClose,
  onSubmit,
}: MediaUploadDialogProps) {

  const [file, setFile] =
    useState<File | null>(null);

  const [folder, setFolder] =
    useState("");

  const [altText, setAltText] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!open) {
    return null;
  }

  function validateFile(
    selectedFile: File
  ): string | null {

    if (selectedFile.size === 0) {

      return "The selected file is empty.";

    }

    if (
      selectedFile.size >
      MAX_FILE_SIZE
    ) {

      return "File size cannot exceed 10 MB.";

    }

    if (
      !ALLOWED_TYPES.includes(
        selectedFile.type
      )
    ) {

      return (
        "Unsupported file type. " +
        "Allowed types: JPEG, PNG, WEBP, GIF, SVG and PDF."
      );

    }

    return null;
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    setError("");

    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {

      setFile(null);

      return;

    }

    const validationError =
      validateFile(selectedFile);

    if (validationError) {

      setFile(null);

      setError(validationError);

      event.target.value = "";

      return;

    }

    setFile(selectedFile);

    if (
      selectedFile.type.startsWith(
        "image/"
      ) &&
      !altText
    ) {

      setAltText(
        selectedFile.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ")
      );

    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setError("");

    if (!file) {

      setError(
        "Please select a file."
      );

      return;

    }

    const validationError =
      validateFile(file);

    if (validationError) {

      setError(validationError);

      return;

    }

    setSaving(true);

    try {

      await onSubmit(
        file,
        folder.trim(),
        altText.trim(),
        description.trim()
      );

      handleReset();

      onClose();

    } catch (submitError) {

      console.error(submitError);

      setError(
        "Failed to upload the file. Please try again."
      );

    } finally {

      setSaving(false);

    }
  }

  function handleReset() {

    setFile(null);

    setFolder("");

    setAltText("");

    setDescription("");

    setError("");

    setSaving(false);

  }

  function handleClose() {

    if (saving) {
      return;
    }

    handleReset();

    onClose();

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">

        <div className="border-b px-6 py-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Upload Media
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload an image or document to the media library.
              </p>

            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              aria-label="Close"
              className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ×
            </button>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div>

            <label
              htmlFor="media-file"
              className="mb-2 block font-medium text-slate-900"
            >
              File
            </label>

            <input
              id="media-file"
              type="file"
              accept={ALLOWED_TYPES.join(",")}
              onChange={handleFileChange}
              disabled={saving}
              className="w-full rounded-lg border px-4 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100"
            />

            <p className="mt-2 text-xs text-gray-500">
              Maximum 10 MB. Supported:
              JPEG, PNG, WEBP, GIF, SVG and PDF.
            </p>

            {file && (

              <div className="mt-3 rounded-lg bg-gray-50 p-3">

                <p className="truncate text-sm font-medium text-slate-900">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)}
                  {" MB • "}
                  {file.type || "Unknown type"}
                </p>

              </div>

            )}

          </div>

          <div>

            <label
              htmlFor="media-folder"
              className="mb-2 block font-medium text-slate-900"
            >
              Folder
            </label>

            <input
              id="media-folder"
              value={folder}
              onChange={(event) =>
                setFolder(event.target.value)
              }
              disabled={saving}
              maxLength={100}
              placeholder="blogs, products, services..."
              className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-gray-500">
              Example: blogs or products/catalog
            </p>

          </div>

          <div>

            <label
              htmlFor="media-alt-text"
              className="mb-2 block font-medium text-slate-900"
            >
              Alt Text
            </label>

            <input
              id="media-alt-text"
              value={altText}
              onChange={(event) =>
                setAltText(event.target.value)
              }
              disabled={saving}
              maxLength={500}
              placeholder="Describe the image for accessibility"
              className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <div>

            <label
              htmlFor="media-description"
              className="mb-2 block font-medium text-slate-900"
            >
              Description
            </label>

            <textarea
              id="media-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              disabled={saving}
              maxLength={1000}
              rows={4}
              placeholder="Optional description"
              className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <div className="flex justify-end gap-3 border-t pt-6">

            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="rounded-lg border px-5 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || !file}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Uploading..."
                : "Upload Media"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}