"use client";

import { useEffect, useState } from "react";

import BlogTable from "@/components/admin/blogs/BlogTable";
import BlogDialog from "@/components/admin/blogs/BlogDialog";
import DeleteBlogDialog from "@/components/admin/blogs/DeleteBlogDialog";

import { blogService } from "@/services/blog.service";

import type {
  Blog,
  BlogRequest,
} from "@/types/blog";

export default function BlogsPage() {

  const [blogs, setBlogs] =
    useState<Blog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedBlog, setSelectedBlog] =
    useState<Blog | null>(null);

  useEffect(() => {

    let cancelled = false;

    async function fetchBlogs() {

      try {

        const response =
          await blogService.getAll();

        if (!cancelled) {
          setBlogs(response.data);
        }

      } catch (error) {

        console.error(
          "Failed to load blogs:",
          error
        );

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }
    }

    void fetchBlogs();

    return () => {
      cancelled = true;
    };

  }, []);

  async function refreshBlogs() {

    const response =
      await blogService.getAll();

    setBlogs(response.data);
  }

  function handleCreate() {

    setSelectedBlog(null);
    setDialogOpen(true);
  }

  function handleEdit(blog: Blog) {

    setSelectedBlog(blog);
    setDialogOpen(true);
  }

  function handleDelete(blog: Blog) {

    setSelectedBlog(blog);
    setDeleteOpen(true);
  }

  async function handleSubmit(
    request: BlogRequest
  ) {

    try {

      if (selectedBlog) {

        await blogService.update(
          selectedBlog.id,
          request
        );

      } else {

        await blogService.create(
          request
        );
      }

      setDialogOpen(false);

      setSelectedBlog(null);

      await refreshBlogs();

    } catch (error) {

      console.error(
        "Failed to save blog:",
        error
      );
    }
  }

  async function confirmDelete() {

    if (!selectedBlog) {
      return;
    }

    try {

      await blogService.delete(
        selectedBlog.id
      );

      setDeleteOpen(false);

      setSelectedBlog(null);

      await refreshBlogs();

    } catch (error) {

      console.error(
        "Failed to delete blog:",
        error
      );
    }
  }

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Blogs...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Blog Management
          </h1>

          <p className="mt-2 text-gray-500">
            Create, edit and delete blog posts.
          </p>

        </div>

        <button
          onClick={handleCreate}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Add Blog
        </button>

      </div>

      <BlogTable
        blogs={blogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BlogDialog
        open={dialogOpen}
        blog={selectedBlog}
        onClose={() => {
          setDialogOpen(false);
          setSelectedBlog(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteBlogDialog
        open={deleteOpen}
        blog={selectedBlog}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedBlog(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>
  );
}