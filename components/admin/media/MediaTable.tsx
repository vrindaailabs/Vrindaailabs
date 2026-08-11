"use client";

import type { Media } from "@/types/media";
import { mediaService } from "@/services/media.service";

interface MediaTableProps {
  media: Media[];
  onEdit: (media: Media) => void;
  onDelete: (media: Media) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function isImage(contentType: string): boolean {
  return contentType.startsWith("image/");
}

function getMediaUrl(media: Media): string {
  return mediaService.getFileUrl(media);
}

export default function MediaTable({
  media,
  onEdit,
  onDelete,
}: MediaTableProps) {
  if (media.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          No media found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Upload your first image or file to the media library.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Preview
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                File
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Size
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Folder
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {media.map((item) => {
              const fileUrl = getMediaUrl(item);

              return (
                <tr
                  key={item.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {isImage(item.contentType) ? (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={fileUrl}
                          alt={item.altText || item.originalFileName}
                          className="h-16 w-16 rounded-lg border object-cover"
                        />
                      </a>
                    ) : (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-50 text-xs font-semibold text-gray-500"
                      >
                        FILE
                      </a>
                    )}
                  </td>

                  <td className="max-w-[260px] px-6 py-4">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate font-medium text-slate-900 hover:text-blue-600"
                      title={item.originalFileName}
                    >
                      {item.originalFileName}
                    </a>

                    {item.altText && (
                      <p
                        className="mt-1 truncate text-xs text-gray-500"
                        title={item.altText}
                      >
                        Alt: {item.altText}
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {item.contentType}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatFileSize(item.fileSize)}
                  </td>

                  <td className="px-6 py-4">
                    {item.folder ? (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {item.folder}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">
                        General
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {item.active ? (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}