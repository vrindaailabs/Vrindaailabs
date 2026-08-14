"use client";

import { FormEvent, useState } from "react";
import axios from "axios";

import { newsletterService } from "@/services/newsletter.service";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await newsletterService.subscribe({
        email: trimmedEmail,
      });

      setMessage(
        response.data?.message ||
          "Subscribed successfully!"
      );

      setEmail("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const backendMessage =
          error.response?.data?.message;

        setError(
          backendMessage ||
            "Unable to subscribe. Please try again."
        );
      } else {
        setError(
          "Unable to subscribe. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8 max-w-md">
      <h3 className="text-lg font-semibold text-white">
        Stay Updated
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        Get the latest updates from Vrinda AI Labs.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          disabled={submitting}
          required
          className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Subscribing..."
            : "Subscribe"}
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-green-400">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}