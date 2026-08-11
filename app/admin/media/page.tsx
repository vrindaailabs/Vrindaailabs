"use client";

import { useEffect, useState } from "react";

import MediaTable from "@/components/admin/media/MediaTable";
import MediaForm from "@/components/admin/media/MediaForm";
import MediaUploadDialog from "@/components/admin/media/MediaUploadDialog";
import DeleteMediaDialog from "@/components/admin/media/DeleteMediaDialog";

import { mediaService } from "@/services/media.service";

import type {
  Media,
  MediaUpdateRequest,
} from "@/types/media";

export default function MediaPage() {

  const [media, setMedia] =
    useState<Media[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [uploadOpen, setUploadOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedMedia, setSelectedMedia] =
    useState<Media | null>(null);

  const [folder, setFolder] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {

    let cancelled = false;

    async function fetchMedia() {

      try {

        const response =
          await mediaService.getAll();

        if (!cancelled) {

          setMedia(response.data);

        }

      } catch (fetchError) {

        console.error(fetchError);

        if (!cancelled) {

          setError(
            "Failed to load media."
          );

        }

      } finally {

        if (!cancelled) {

          setLoading(false);

        }

      }

    }

    fetchMedia();

    return () => {

      cancelled = true;

    };

  }, []);

  async function loadMedia(
    selectedFolder?: string
  ) {

    setRefreshing(true);

    setError("");

    try {

      const response =
        await mediaService.getAll(
          selectedFolder?.trim() || undefined
        );

      setMedia(response.data);

    } catch (fetchError) {

      console.error(fetchError);

      setError(
        "Failed to load media."
      );

    } finally {

      setRefreshing(false);

    }

  }

  async function handleUpload(
    file: File,
    uploadFolder: string,
    altText: string,
    description: string
  ) {

    setError("");

    await mediaService.upload(
      file,
      uploadFolder,
      altText,
      description
    );

    setUploadOpen(false);

    await loadMedia(folder);

  }

  function handleEdit(
    item: Media
  ) {

    setSelectedMedia(item);

    setEditOpen(true);

  }

  async function handleUpdate(
    request: MediaUpdateRequest
  ) {

    if (!selectedMedia) {

      return;

    }

    setError("");

    await mediaService.update(
      selectedMedia.id,
      request
    );

    setEditOpen(false);

    setSelectedMedia(null);

    await loadMedia(folder);

  }

  function handleDelete(
    item: Media
  ) {

    setSelectedMedia(item);

    setDeleteOpen(true);

  }

  async function handleConfirmDelete() {

    if (!selectedMedia) {

      return;

    }

    setError("");

    await mediaService.delete(
      selectedMedia.id
    );

    setDeleteOpen(false);

    setSelectedMedia(null);

    await loadMedia(folder);

  }

  function handleFolderChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {

    const selectedFolder =
      event.target.value;

    setFolder(selectedFolder);

    void loadMedia(selectedFolder);

  }

  if (loading) {

    return (

      <div className="flex min-h-[300px] items-center justify-center">

        <div className="text-gray-500">

          Loading Media Library...

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-8 p-8">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">

            Media Library

          </h1>

          <p className="mt-2 text-gray-500">

            Upload and manage images and documents
            used across the website.

          </p>

        </div>

        <button

          type="button"

          onClick={() => {

            setError("");

            setUploadOpen(true);

          }}

          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"

        >

          + Upload Media

        </button>

      </div>

      {/* Error */}

      {error && (

        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >

          {error}

        </div>

      )}

      {/* Toolbar */}

      <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <label
            htmlFor="media-folder-filter"
            className="text-sm font-medium text-gray-700"
          >

            Folder

          </label>

          <select

            id="media-folder-filter"

            value={folder}

            onChange={handleFolderChange}

            className="rounded-lg border px-4 py-2 text-sm outline-none focus:border-blue-500"

          >

            <option value="">
              All Media
            </option>

            <option value="blogs">
              Blogs
            </option>

            <option value="products">
              Products
            </option>

            <option value="services">
              Services
            </option>

            <option value="industries">
              Industries
            </option>

            <option value="logos">
              Logos
            </option>

          </select>

        </div>

        <button

          type="button"

          onClick={() => void loadMedia(folder)}

          disabled={refreshing}

          className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"

        >

          {refreshing
            ? "Refreshing..."
            : "Refresh"}

        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">

            Total Media

          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">

            {media.length}

          </p>

        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">

            Images

          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">

            {
              media.filter(
                (item) =>
                  item.contentType.startsWith(
                    "image/"
                  )
              ).length
            }

          </p>

        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">

            Documents

          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">

            {
              media.filter(
                (item) =>
                  !item.contentType.startsWith(
                    "image/"
                  )
              ).length
            }

          </p>

        </div>

      </div>

      {/* Table */}

      <MediaTable

        media={media}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      {/* Upload */}

      <MediaUploadDialog

        open={uploadOpen}

        onClose={() =>
          setUploadOpen(false)
        }

        onSubmit={handleUpload}

      />

      {/* Edit */}

      {editOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">

            <div className="border-b px-6 py-5">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">

                    Edit Media

                  </h2>

                  <p className="mt-1 text-sm text-gray-500">

                    Update media metadata.

                  </p>

                </div>

                <button

                  type="button"

                  onClick={() => {

                    if (!refreshing) {

                      setEditOpen(false);

                      setSelectedMedia(null);

                    }

                  }}

                  className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-100"

                >

                  ×

                </button>

              </div>

            </div>

            <div className="p-6">

              <MediaForm

                media={selectedMedia}

                onSubmit={handleUpdate}

                onCancel={() => {

                  setEditOpen(false);

                  setSelectedMedia(null);

                }}

              />

            </div>

          </div>

        </div>

      )}

      {/* Delete */}

      <DeleteMediaDialog

        open={deleteOpen}

        media={selectedMedia}

        onClose={() => {

          setDeleteOpen(false);

          setSelectedMedia(null);

        }}

        onConfirm={handleConfirmDelete}

      />

    </div>

  );

}