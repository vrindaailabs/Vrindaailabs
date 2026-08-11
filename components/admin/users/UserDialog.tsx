"use client";

import UserForm from "./UserForm";

import type {
  User,
  UserRequest,
} from "@/types/user";

interface UserDialogProps {

  open: boolean;

  user?: User | null;

  onClose: () => void;

  onSubmit: (
    request: UserRequest
  ) => Promise<void>;

}

export default function UserDialog({

  open,

  user,

  onClose,

  onSubmit,

}: UserDialogProps) {

  if (!open) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">

            {user
              ? "Edit User"
              : "Create User"}

          </h2>

          <button

            onClick={onClose}

            className="text-3xl leading-none"

          >

            ×

          </button>

        </div>

        <div className="p-6">

          <UserForm

            key={user?.id ?? "new"}

            initialData={user}

            onSubmit={onSubmit}

            onCancel={onClose}

          />

        </div>

      </div>

    </div>

  );

}