// export default function NewsletterPage() {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold">
//         Newsletter Management
//       </h1>

//       <p className="mt-4 text-gray-600">
//         Manage newsletter subscribers.
//       </p>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

import { newsletterService } from "@/services/newsletter.service";

import type { NewsletterResponse } from "@/types/newsletter";

export default function NewsletterPage() {
  const [subscribers, setSubscribers] =
    useState<NewsletterResponse[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchSubscribers() {
      try {
        const response =
          await newsletterService.getAll();

        if (!cancelled) {
          setSubscribers(
            response.data ?? []
          );
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Failed to load newsletter subscribers:",
          error
        );

        if (!cancelled) {
          setError(
            "Failed to load newsletter subscribers."
          );
          setLoading(false);
        }
      }
    }

    fetchSubscribers();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(id: number) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this subscriber?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await newsletterService.delete(id);

      setSubscribers((previous) =>
        previous.filter(
          (subscriber) =>
            subscriber.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete subscriber:",
        error
      );

      setError(
        "Failed to delete subscriber."
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        Loading Newsletter Subscribers...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Newsletter Management
        </h1>

        <p className="mt-2 text-gray-500">
          Manage newsletter subscribers.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Subscribers
          </p>

          <p className="mt-2 text-3xl font-bold">
            {subscribers.length}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Subscribers
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {
              subscribers.filter(
                (subscriber) =>
                  subscriber.active
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Inactive Subscribers
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {
              subscribers.filter(
                (subscriber) =>
                  !subscriber.active
              ).length
            }
          </p>
        </div>

      </div>

      {/* Subscribers Table */}

      <div className="overflow-x-auto rounded-lg border bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Subscribed
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {subscribers.length === 0 ? (

              <tr>
                <td
                  colSpan={4}
                  className="p-10 text-center text-gray-500"
                >
                  No newsletter subscribers found.
                </td>
              </tr>

            ) : (

              subscribers.map(
                (subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium">
                      {subscriber.email}
                    </td>

                    <td className="p-4">

                      {subscriber.active ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Inactive
                        </span>
                      )}

                    </td>

                    <td className="p-4 text-gray-600">
                      {new Date(
                        subscriber.subscribedAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          handleDelete(
                            subscriber.id
                          )
                        }
                        disabled={
                          deletingId ===
                          subscriber.id
                        }
                        className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId ===
                        subscriber.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </td>

                  </tr>
                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}