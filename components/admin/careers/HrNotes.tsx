"use client";

import {
  useEffect,
  useState,
} from "react";

import { hrNoteService } from "@/services/hr-note.service";

import type {
  HrNote,
  HrNoteRequest,
} from "@/types/hr-note";

interface HrNotesProps {
  applicationId: number;
}

export default function HrNotes({
  applicationId,
}: HrNotesProps) {
  const [notes, setNotes] =
    useState<HrNote[]>([]);

  const [note, setNote] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  /**
   * Load HR notes
   */
  async function loadNotes() {
    try {
      const response =
        await hrNoteService.getAll(
          applicationId
        );

      setNotes(response.data);

      setError(null);
    } catch (error) {
      console.error(
        "Failed to load HR notes:",
        error
      );

      setError(
        "Unable to load HR notes."
      );
    }
  }

  /**
   * Load notes when candidate changes
   */
  useEffect(() => {
    let cancelled = false;

    async function fetchNotes() {
      try {
        const response =
          await hrNoteService.getAll(
            applicationId
          );

        if (!cancelled) {
          setNotes(response.data);

          setError(null);
        }
      } catch (error) {
        console.error(
          "Failed to load HR notes:",
          error
        );

        if (!cancelled) {
          setError(
            "Unable to load HR notes."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchNotes();

    return () => {
      cancelled = true;
    };
  }, [applicationId]);

  /**
   * Add or update HR note
   */
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedNote =
      note.trim();

    if (!trimmedNote) {
      setError(
        "HR note is required."
      );

      return;
    }

    if (trimmedNote.length > 3000) {
      setError(
        "HR note cannot exceed 3000 characters."
      );

      return;
    }

    try {
      setSaving(true);

      setError(null);

      const request: HrNoteRequest = {
        note: trimmedNote,
      };

      if (editingId !== null) {
        await hrNoteService.update(
          editingId,
          request
        );
      } else {
        await hrNoteService.create(
          applicationId,
          request
        );
      }

      setNote("");

      setEditingId(null);

      await loadNotes();
    } catch (error) {
      console.error(
        "Failed to save HR note:",
        error
      );

      setError(
        editingId !== null
          ? "Unable to update HR note."
          : "Unable to add HR note."
      );
    } finally {
      setSaving(false);
    }
  }

  /**
   * Start editing note
   */
  function handleEdit(
    hrNote: HrNote
  ) {
    setEditingId(hrNote.id);

    setNote(hrNote.note);

    setError(null);
  }

  /**
   * Cancel editing
   */
  function handleCancelEdit() {
    setEditingId(null);

    setNote("");

    setError(null);
  }

  /**
   * Delete HR note
   */
  async function handleDelete(
    id: number
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this HR note?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      setError(null);

      await hrNoteService.delete(id);

      if (editingId === id) {
        setEditingId(null);

        setNote("");
      }

      await loadNotes();
    } catch (error) {
      console.error(
        "Failed to delete HR note:",
        error
      );

      setError(
        "Unable to delete HR note."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="border-t p-6">

      {/* Header */}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          HR Notes
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Add interview feedback and internal
          recruitment notes for this candidate.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Add / Edit Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <textarea
          value={note}
          onChange={(event) =>
            setNote(event.target.value)
          }
          placeholder={
            editingId !== null
              ? "Update HR note..."
              : "Enter HR note..."
          }
          maxLength={3000}
          rows={5}
          disabled={saving}
          className="w-full resize-y rounded-lg border p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <span className="text-xs text-gray-500">
            {note.length}/3000
          </span>

          <div className="flex gap-3">

            {editingId !== null && (
              <button
                type="button"
                disabled={saving}
                onClick={handleCancelEdit}
                className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={
                saving ||
                note.trim().length === 0
              }
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? editingId !== null
                  ? "Updating..."
                  : "Saving..."
                : editingId !== null
                  ? "Update Note"
                  : "Add Note"}
            </button>

          </div>
        </div>
      </form>

      {/* Notes List */}

      <div className="mt-8">

        {loading ? (
          <p className="text-sm text-gray-500">
            Loading HR notes...
          </p>
        ) : notes.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-500">
            No HR notes added yet.
          </div>
        ) : (
          <div className="space-y-4">

            {notes.map((hrNote) => {
              const isDeleting =
                deletingId === hrNote.id;

              return (
                <div
                  key={hrNote.id}
                  className="rounded-lg border bg-gray-50 p-4"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="min-w-0 flex-1">

                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-800">
                        {hrNote.note}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center text-xs text-gray-500">

                        <span className="font-medium">
                          {hrNote.createdBy ||
                            "HR"}
                        </span>

                        <span className="mx-2">
                          •
                        </span>

                        <span>
                          {new Date(
                            hrNote.createdAt
                          ).toLocaleString()}
                        </span>

                        {hrNote.updatedAt &&
                          hrNote.updatedAt !==
                            hrNote.createdAt && (
                            <>
                              <span className="mx-2">
                                •
                              </span>

                              <span>
                                Updated{" "}

                                {new Date(
                                  hrNote.updatedAt
                                ).toLocaleString()}
                              </span>
                            </>
                          )}

                      </div>

                    </div>

                    <div className="flex shrink-0 gap-2">

                      <button
                        type="button"
                        disabled={
                          saving ||
                          deletingId !== null
                        }
                        onClick={() =>
                          handleEdit(hrNote)
                        }
                        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={
                          deletingId !== null
                        }
                        onClick={() =>
                          handleDelete(
                            hrNote.id
                          )
                        }
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isDeleting
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}