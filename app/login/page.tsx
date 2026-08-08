"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import authService from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await authService.login({
        email,
        password,
      });

      alert("Login Successful");

      console.log(response);

      router.push("/dashboard");

    } catch (err: unknown) {

      if (axios.isAxiosError(err)) {

        setError(
          err.response?.data?.message ??
            "Login Failed"
        );

      } else {

        setError("Unexpected Error");
      }

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="mb-1 block">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded border p-3"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="mb-1 block">
              Password
            </label>

            <input
              type="password"
              className="w-full rounded border p-3"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}