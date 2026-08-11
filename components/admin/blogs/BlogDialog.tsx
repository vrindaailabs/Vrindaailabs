"use client";

import BlogForm from "./BlogForm";

import type {
  Blog,
  BlogRequest,
} from "@/types/blog";

interface BlogDialogProps {
  open: boolean;

  blog?: Blog | null;

  onClose: () => void;

  onSubmit: (
    request: BlogRequest
  ) => Promise<void>;
}

export default function BlogDialog({
  open,
  blog,
  onClose,
  onSubmit,
}: BlogDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b bg-white p-6">

          <h2 className="text-2xl font-bold text-slate-900">
            {blog
              ? "Edit Blog"
              : "Create Blog"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-3xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Scrollable Form */}

        <div className="min-h-0 flex-1 overflow-y-auto p-6">

          <BlogForm
            key={blog?.id ?? "new"}
            initialData={blog}
            onSubmit={onSubmit}
            onCancel={onClose}
          />

        </div>

      </div>

    </div>
  );
}