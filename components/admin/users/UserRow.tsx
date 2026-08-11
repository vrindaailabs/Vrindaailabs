"use client";

import type { User } from "@/types/user";

interface UserRowProps {

  user: User;

  onEdit: (user: User) => void;

  onDelete: (user: User) => void;

}

export default function UserRow({

  user,

  onEdit,

  onDelete,

}: UserRowProps) {

  return (

    <tr className="border-b hover:bg-gray-50">

      <td className="p-4">

        {user.fullName}

      </td>

      <td className="p-4">

        {user.email}

      </td>

      <td className="p-4">

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

          {user.role}

        </span>

      </td>

      <td className="p-4">

        {user.active ? (

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

            Active

          </span>

        ) : (

          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

            Inactive

          </span>

        )}

      </td>

      <td className="p-4">

        {new Date(user.createdAt).toLocaleDateString()}

      </td>

      <td className="space-x-2 p-4">

        <button

          onClick={() => onEdit(user)}

          className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"

        >

          Edit

        </button>

        <button

          onClick={() => onDelete(user)}

          className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"

        >

          Delete

        </button>

      </td>

    </tr>

  );

}