"use client";

import authService from "@/services/auth.service";

export default function Header() {

  return (

    <header className="flex items-center justify-between border-b bg-white p-6">

      <h1 className="text-2xl font-bold">

        Admin Panel

      </h1>

      <button

        onClick={() => authService.logout()}

        className="rounded bg-red-600 px-4 py-2 text-white"

      >

        Logout

      </button>

    </header>

  );

}