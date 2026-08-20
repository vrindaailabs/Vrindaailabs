"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { blogService } from "@/services/blog.service";

import type { Blog } from "@/types/blog";

export default function BlogDetailsPage() {
  const params = useParams();

  const idParam = params?.id;

  const id =
    typeof idParam === "string"
      ? Number(idParam)
      : NaN;

  const [blog, setBlog] =
    useState<Blog | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBlog() {
      if (!Number.isFinite(id)) {
        if (!cancelled) {
          setError("Invalid blog.");
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await blogService.getById(id);

        if (!cancelled) {
          const loadedBlog =
            response.data;

          /*
           * Public users should not be able
           * to view unpublished blogs.
           */
          if (!loadedBlog.published) {
            setBlog(null);
            setError(
              "This blog is not available."
            );
          } else {
            setBlog(loadedBlog);
          }
        }
      } catch (error) {
        console.error(
          "Failed to load blog:",
          error
        );

        if (!cancelled) {
          setError(
            "Blog not found."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadBlog();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">

        <section className="mx-auto max-w-4xl px-6 py-20">

          <p className="text-center text-gray-500">
            Loading blog...
          </p>

        </section>

      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-gray-50">

        <section className="mx-auto max-w-3xl px-6 py-20">

          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">

            <h1 className="text-2xl font-bold text-gray-900">
              Blog Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              {error ||
                "The requested blog could not be found."}
            </p>

            <Link
              href="/blogs"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              ← Back to Blogs
            </Link>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Article Header */}

      <article>

        <header className="border-b bg-gray-50">

          <div className="mx-auto max-w-4xl px-6 py-14">

            <Link
              href="/blogs"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              ← Back to Blogs
            </Link>

            <p className="mt-8 text-sm text-gray-500">

              {new Date(
                blog.createdAt
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}

            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              {blog.title}
            </h1>

            <p className="mt-5 text-xl leading-8 text-gray-600">
              {blog.shortDescription}
            </p>

          </div>

        </header>

        {/* Featured Image */}

        {blog.imageUrl && (

          <div className="mx-auto max-w-5xl px-6 py-10">

            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="max-h-[550px] w-full rounded-2xl object-cover shadow"
            />

          </div>

        )}

        {/* Article Content */}

        <div className="mx-auto max-w-4xl px-6 pb-20">

          <div className="whitespace-pre-wrap text-lg leading-8 text-gray-700">

            {blog.content}

          </div>

        </div>

      </article>

    </main>
  );
}