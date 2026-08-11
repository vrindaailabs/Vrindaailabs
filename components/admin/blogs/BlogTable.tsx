"use client";

import type { Blog } from "@/types/blog";

import BlogRow from "./BlogRow";

interface BlogTableProps {

  blogs: Blog[];

  onEdit: (blog: Blog) => void;

  onDelete: (blog: Blog) => void;

}

export default function BlogTable({

  blogs,

  onEdit,

  onDelete,

}: BlogTableProps) {

  if (blogs.length === 0) {

    return (

      <div className="rounded-xl border bg-white p-12 text-center shadow">

        <h2 className="text-xl font-semibold">

          No Blogs Found

        </h2>

        <p className="mt-3 text-gray-500">

          Create your first blog.

        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-xl border bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">

              Title

            </th>

            <th className="p-4 text-left">

              Description

            </th>

            <th className="p-4 text-left">

              Status

            </th>

            <th className="p-4 text-left">

              Created

            </th>

            <th className="p-4 text-center">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {blogs.map((blog) => (

            <BlogRow

              key={blog.id}

              blog={blog}

              onEdit={onEdit}

              onDelete={onDelete}

            />

          ))}

        </tbody>

      </table>

    </div>

  );

}