"use client";

import {
  Suspense,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import axios from "axios";

import authService from "@/services/auth.service";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tokenFromUrl =
    searchParams.get("token") ?? "";

  const [token, setToken] =
    useState(tokenFromUrl);

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    /**
     * Validate reset token
     */
    if (!token.trim()) {
      setError(
        "Reset token is required."
      );
      return;
    }

    /**
     * Validate new password
     */
    if (!newPassword) {
      setError(
        "New password is required."
      );
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    /**
     * Validate confirmation
     */
    if (!confirmPassword) {
      setError(
        "Please confirm your password."
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const message =
        await authService.resetPassword({
          token: token.trim(),
          newPassword,
          confirmPassword,
        });

      setSuccess(
        message ||
          "Password has been reset successfully."
      );

      /**
       * Clear password fields.
       */
      setNewPassword("");
      setConfirmPassword("");

      /**
       * Redirect after successful reset.
       */
      window.setTimeout(() => {
        router.replace("/login");
      }, 1500);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ??
            "Unable to reset password."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unexpected error occurred."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Enter your reset token and choose a new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Reset Token */}
          <div>

            <label
              htmlFor="token"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Reset Token
            </label>

            <input
              id="token"
              type="text"
              placeholder="Enter reset token"
              value={token}
              onChange={(event) =>
                setToken(
                  event.target.value
                )
              }
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* New Password */}
          <div>

            <label
              htmlFor="newPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-gray-500">
              Password must contain at least 8 characters.
            </p>

          </div>

          {/* Confirm Password */}
          <div>

            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={() =>
              router.push("/login")
            }
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 transition hover:bg-gray-50"
          >
            Back to Login
          </button>

        </form>

      </div>

    </div>
  );
}

/**
 * Next.js requires a Suspense boundary
 * when useSearchParams() is used in a statically
 * rendered route.
 */
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <p className="text-gray-600">
            Loading...
          </p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}