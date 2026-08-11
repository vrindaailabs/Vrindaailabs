"use client";

import type { Service } from "@/types/service";

import ServiceRow from "./ServiceRow";

interface ServiceTableProps {

  services: Service[];

  onEdit: (service: Service) => void;

  onDelete: (service: Service) => void;

}

export default function ServiceTable({

  services,

  onEdit,

  onDelete,

}: ServiceTableProps) {

  if (services.length === 0) {

    return (

      <div className="rounded-xl border bg-white p-12 text-center shadow">

        <h2 className="text-xl font-semibold">

          No Services Found

        </h2>

        <p className="mt-3 text-gray-500">

          Create your first service.

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

              Title

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

          {services.map((service) => (

            <ServiceRow

              key={service.id}

              service={service}

              onEdit={onEdit}

              onDelete={onDelete}

            />

          ))}

        </tbody>

      </table>

    </div>

  );

}