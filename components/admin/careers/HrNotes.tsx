"use client";

import { useEffect, useState } from "react";

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
  const [notes, setNotes] = useState<HrNote[]>(
    []
  );

  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  async function loadNotes() {
    try {
      setError(null);

      const response =
        await hrNoteService.getAll(
          applicationId
        );

      setNotes(response.data);
    } catch (error) {
      console.error(
        "Failed to load HR notes:",
        error
      );

      setError(
        "Unable to load HR notes."
      );
    } finally {
      setLoading(false);
    }
  }

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

    fetchNotes();

    return () => {
      cancelled = true;
    };
  }, [applicationId]);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const trimmedNote = note.trim();

    if (!trimmedNote) {
      setError("HR note is required.");
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
        "Unable to save HR note."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(
    hrNote: HrNote
  ) {
    setEditingId(hrNote.id);
    setNote(hrNote.note);
    setError(null);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setNote("");
    setError(null);
  }

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
    }
  }

  return (
    <div className="border-t p-6">

      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          HR Notes
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Add interview feedback and internal
          recruitment notes for this candidate.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <textarea
          value={note}
          onChange={(event) =>
            setNote(event.target.value)
          }
          placeholder="Enter HR note..."
          maxLength={3000}
          rows={5}
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="flex items-center justify-between">

          <span className="text-xs text-gray-500">
            {note.length}/3000
          </span>

          <div className="flex gap-3">

            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
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
                ? "Saving..."
                : editingId !== null
                  ? "Update Note"
                  : "Add Note"}
            </button>

          </div>
        </div>
      </form>

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

            {notes.map((hrNote) => (
              <div
                key={hrNote.id}
                className="rounded-lg border bg-gray-50 p-4"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0 flex-1">

                    <p className="whitespace-pre-wrap text-sm text-slate-800">
                      {hrNote.note}
                    </p>

                    <div className="mt-3 text-xs text-gray-500">
                      <span className="font-medium">
                        {hrNote.createdBy}
                      </span>

                      <span className="mx-2">
                        •
                      </span>

                      <span>
                        {new Date(
                          hrNote.createdAt
                        ).toLocaleString()}
                      </span>

                      {hrNote.updatedAt !==
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
                      onClick={() =>
                        handleEdit(hrNote)
                      }
                      className="rounded border px-3 py-1 text-sm hover:bg-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          hrNote.id
                        )
                      }
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}