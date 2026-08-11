"use client";

import UserRow from "./UserRow";

import type { User } from "@/types/user";

interface UserTableProps {

  users: User[];

  onEdit: (user: User) => void;

  onDelete: (user: User) => void;

}

export default function UserTable({

  users,

  onEdit,

  onDelete,

}: UserTableProps) {

  if (users.length === 0) {

    return (

      <div className="rounded-lg border bg-white p-10 text-center">

        No Users Found

      </div>

    );

  }

  return (

    <div className="overflow-x-auto rounded-lg border bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">

              Full Name

            </th>

            <th className="p-4 text-left">

              Email

            </th>

            <th className="p-4 text-left">

              Role

            </th>

            <th className="p-4 text-left">

              Status

            </th>

            <th className="p-4 text-left">

              Created

            </th>

            <th className="p-4 text-left">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <UserRow

              key={user.id}

              user={user}

              onEdit={onEdit}

              onDelete={onDelete}

            />

          ))}

        </tbody>

      </table>

    </div>

  );

}