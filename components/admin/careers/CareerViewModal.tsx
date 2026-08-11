"use client";

import { CareerApplication } from "@/types/career-application";

interface CareerViewModalProps {

  open: boolean;

  application: CareerApplication | null;

  onClose: () => void;

}

export default function CareerViewModal({

  open,

  application,

  onClose,

}: CareerViewModalProps) {

  if (!open || !application) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">

            Candidate Details

          </h2>

          <button

            onClick={onClose}

            className="text-2xl"

          >

            ×

          </button>

        </div>

        <div className="grid grid-cols-2 gap-6 p-6">

          <Field
            label="Full Name"
            value={application.fullName}
          />

          <Field
            label="Email"
            value={application.email}
          />

          <Field
            label="Phone"
            value={application.phoneNumber}
          />

          <Field
            label="Job Title"
            value={application.jobTitle}
          />

          <Field
            label="Experience"
            value={application.experience}
          />

          <Field
            label="Status"
            value={application.candidateStatus}
          />

          <Field
            label="Applied Date"
            value={new Date(application.appliedAt).toLocaleString()}
          />

        </div>

        <div className="border-t p-6 text-right">

          <button

            onClick={onClose}

            className="rounded-lg bg-blue-600 px-6 py-2 text-white"

          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

}

interface FieldProps {

  label: string;

  value: string;

}

function Field({

  label,

  value,

}: FieldProps) {

  return (

    <div>

      <p className="text-sm text-gray-500">

        {label}

      </p>

      <p className="mt-1 font-semibold">

        {value}

      </p>

    </div>

  );

}