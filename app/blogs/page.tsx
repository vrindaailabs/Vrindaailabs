"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { blogService } from "@/services/blog.service";

import type { Blog } from "@/types/blog";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBlogs() {
      try {
        setLoading(true);
        setError("");

        const response =
          await blogService.getPublished();

        if (!cancelled) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error(
          "Failed to load published blogs:",
          error
        );

        if (!cancelled) {
          setError(
            "Unable to load blogs. Please try again later."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex justify-center">
            <p className="text-gray-500">
              Loading blogs...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="text-xl font-semibold text-red-700">
              Blogs
            </h1>

            <p className="mt-2 text-red-600">
              {error}
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Vrinda AI Labs
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Insights &amp; Ideas
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Explore our latest insights, ideas and perspectives
            on technology, AI, automation and digital transformation.
          </p>

        </div>

      </section>

      {/* Blog List */}

      <section className="mx-auto max-w-7xl px-6 py-14">

        {blogs.length === 0 ? (

          <div className="rounded-xl border bg-white p-12 text-center shadow-sm">

            <h2 className="text-2xl font-semibold text-gray-900">
              No Blogs Available
            </h2>

            <p className="mt-3 text-gray-500">
              Check back soon for new articles.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {blogs.map((blog) => (

              <article
                key={blog.id}
                className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Image */}

                {blog.imageUrl ? (

                  <Link href={`/blogs/${blog.id}`}>

                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">

                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                    </div>

                  </Link>

                ) : (

                  <Link href={`/blogs/${blog.id}`}>

                    <div className="flex aspect-[16/9] items-center justify-center bg-slate-100">

                      <span className="text-sm text-gray-400">
                        Vrinda AI Labs
                      </span>

                    </div>

                  </Link>

                )}

                {/* Content */}

                <div className="p-6">

                  <p className="text-sm text-gray-500">

                    {new Date(
                      blog.createdAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}

                  </p>

                  <h2 className="mt-2 text-xl font-bold text-gray-900">

                    <Link
                      href={`/blogs/${blog.id}`}
                      className="transition hover:text-blue-600"
                    >
                      {blog.title}
                    </Link>

                  </h2>

                  <p className="mt-3 line-clamp-3 text-gray-600">
                    {blog.shortDescription}
                  </p>

                  <div className="mt-5">

                    <Link
                      href={`/blogs/${blog.id}`}
                      className="font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Read More →
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}