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

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">

            {blog
              ? "Edit Blog"
              : "Create Blog"}

          </h2>

          <button

            onClick={onClose}

            className="text-3xl"

          >

            ×

          </button>

        </div>

        <div className="p-6">

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