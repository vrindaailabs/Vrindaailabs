"use client";

import type { Industry } from "@/types/industry";

import IndustryRow from "./IndustryRow";

interface IndustryTableProps {

  industries: Industry[];

  onEdit: (industry: Industry) => void;

  onDelete: (industry: Industry) => void;

}

export default function IndustryTable({

  industries,

  onEdit,

  onDelete,

}: IndustryTableProps) {

  if (industries.length === 0) {

    return (

      <div className="rounded-xl border bg-white p-12 text-center shadow">

        <h2 className="text-xl font-semibold">

          No Industries Found

        </h2>

        <p className="mt-3 text-gray-500">

          Create your first industry.

        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-xl border bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">

              Name

            </th>

            <th className="p-4 text-left">

              Short Description

            </th>

            <th className="p-4 text-left">

              Status

            </th>

            <th className="p-4 text-left">

              Created

            </th>

            <th className="p-4 text-center">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {industries.map((industry) => (

            <IndustryRow

              key={industry.id}

              industry={industry}

              onEdit={onEdit}

              onDelete={onDelete}

            />

          ))}

        </tbody>

      </table>

    </div>

  );

}