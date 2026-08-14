"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import authService from "@/services/auth.service";

export default function Header() {

  const router = useRouter();

  const [loggingOut, setLoggingOut] =
    useState(false);

  async function handleLogout() {

    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {

      await authService.logout();

    } finally {

      router.replace("/login");

      router.refresh();

    }
  }

  return (
    <header className="flex items-center justify-between border-b bg-white p-6">

      <h1 className="text-2xl font-bold">
        Admin Panel
      </h1>

      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loggingOut
          ? "Logging out..."
          : "Logout"}
      </button>

    </header>
  );
}