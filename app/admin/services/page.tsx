"use client";

import { useEffect, useState } from "react";

import ServiceTable from "@/components/admin/services/ServiceTable";
import ServiceDialog from "@/components/admin/services/ServiceDialog";
import DeleteServiceDialog from "@/components/admin/services/DeleteServiceDialog";

import { serviceService } from "@/services/service.service";

import type {
  Service,
  ServiceRequest,
} from "@/types/service";

export default function ServicesPage() {

  const [services, setServices] =
    useState<Service[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  async function loadServices() {

    try {

      const response =
        await serviceService.getAll();

      setServices(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    const timer = setTimeout(() => {

      loadServices();

    }, 0);

    return () => clearTimeout(timer);

  }, []);

  function handleCreate() {

    setSelectedService(null);

    setDialogOpen(true);

  }

  function handleEdit(service: Service) {

    setSelectedService(service);

    setDialogOpen(true);

  }

  function handleDelete(service: Service) {

    setSelectedService(service);

    setDeleteOpen(true);

  }

  async function handleSubmit(
    request: ServiceRequest
  ) {

    if (selectedService) {

      await serviceService.update(
        selectedService.id,
        request
      );

    } else {

      await serviceService.create(request);

    }

    setDialogOpen(false);

    await loadServices();

  }

  async function confirmDelete() {

    if (!selectedService) return;

    await serviceService.delete(
      selectedService.id
    );

    setDeleteOpen(false);

    await loadServices();

  }

  if (loading) {

    return (

      <div className="flex justify-center p-10">

        Loading...

      </div>

    );

  }

  return (

    <div className="space-y-8 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Services Management

          </h1>

          <p className="mt-2 text-gray-500">

            Create, update and manage company services.

          </p>

        </div>

        <button

          onClick={handleCreate}

          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"

        >

          + Add Service

        </button>

      </div>

      <ServiceTable

        services={services}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      <ServiceDialog

        open={dialogOpen}

        service={selectedService}

        onClose={() => setDialogOpen(false)}

        onSubmit={handleSubmit}

      />

      <DeleteServiceDialog

        open={deleteOpen}

        service={selectedService}

        onClose={() => setDeleteOpen(false)}

        onConfirm={confirmDelete}

      />

    </div>

  );

}