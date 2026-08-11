"use client";

import { useEffect, useState } from "react";

import UserTable from "@/components/admin/users/UserTable";
import UserDialog from "@/components/admin/users/UserDialog";
import DeleteUserDialog from "@/components/admin/users/DeleteUserDialog";

import { userService } from "@/services/user.service";

import type {
  User,
  UserRequest,
  UpdateUserRequest,
} from "@/types/user";

export default function UsersPage() {

  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  useEffect(() => {

    let cancelled = false;

    async function fetchUsers() {

      try {

        const response =
          await userService.getAll();

        if (!cancelled) {

          setUsers(response.data);

        }

      } catch (error) {

        console.error(error);

      } finally {

        if (!cancelled) {

          setLoading(false);

        }

      }

    }

    fetchUsers();

    return () => {

      cancelled = true;

    };

  }, []);

  async function loadUsers() {

    const response =
      await userService.getAll();

    setUsers(response.data);

  }

  function handleCreate() {

    setSelectedUser(null);

    setDialogOpen(true);

  }

  function handleEdit(user: User) {

    setSelectedUser(user);

    setDialogOpen(true);

  }

  function handleDelete(user: User) {

    setSelectedUser(user);

    setDeleteOpen(true);

  }

  async function handleSubmit(
    request: UserRequest
  ) {

    if (selectedUser) {

      const updateRequest: UpdateUserRequest = {

        fullName: request.fullName,

        email: request.email,

        role: request.role,

        active: request.active,

      };

      await userService.update(
        selectedUser.id,
        updateRequest
      );

    } else {

      await userService.create(request);

    }

    setDialogOpen(false);

    await loadUsers();

  }

  async function confirmDelete() {

    if (!selectedUser) return;

    await userService.delete(
      selectedUser.id
    );

    setDeleteOpen(false);

    await loadUsers();

  }

  if (loading) {

    return (

      <div className="flex justify-center p-10">

        Loading Users...

      </div>

    );

  }

  return (

    <div className="space-y-8 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            User Management

          </h1>

          <p className="mt-2 text-gray-500">

            Manage administrators and users.

          </p>

        </div>

        <button

          onClick={handleCreate}

          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"

        >

          + Add User

        </button>

      </div>

      <UserTable

        users={users}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      <UserDialog

        open={dialogOpen}

        user={selectedUser}

        onClose={() => setDialogOpen(false)}

        onSubmit={handleSubmit}

      />

      <DeleteUserDialog

        open={deleteOpen}

        user={selectedUser}

        onClose={() => setDeleteOpen(false)}

        onConfirm={confirmDelete}

      />

    </div>

  );

}