"use client";

import type { Blog } from "@/types/blog";

interface BlogRowProps {

  blog: Blog;

  onEdit: (blog: Blog) => void;

  onDelete: (blog: Blog) => void;

}

export default function BlogRow({

  blog,

  onEdit,

  onDelete,

}: BlogRowProps) {

  return (

    <tr className="border-b hover:bg-gray-50">

      <td className="p-4">

        {blog.title}

      </td>

      <td className="p-4">

        {blog.shortDescription}

      </td>

      <td className="p-4">

        <span
          className={`rounded-full px-3 py-1 text-sm ${
            blog.published
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {blog.published
            ? "Published"
            : "Draft"}

        </span>

      </td>

      <td className="p-4">

        {new Date(blog.createdAt)
          .toLocaleDateString()}

      </td>

      <td className="space-x-2 p-4">

        <button

          onClick={() => onEdit(blog)}

          className="rounded bg-blue-600 px-3 py-2 text-white"

        >

          Edit

        </button>

        <button

          onClick={() => onDelete(blog)}

          className="rounded bg-red-600 px-3 py-2 text-white"

        >

          Delete

        </button>

      </td>

    </tr>

  );

}