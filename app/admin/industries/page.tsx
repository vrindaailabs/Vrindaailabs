"use client";

import { useEffect, useState } from "react";

import IndustryTable from "@/components/admin/industries/IndustryTable";
import IndustryDialog from "@/components/admin/industries/IndustryDialog";
import DeleteIndustryDialog from "@/components/admin/industries/DeleteIndustryDialog";

import { industryService } from "@/services/industry.service";

import type {
  Industry,
  IndustryRequest,
} from "@/types/industry";

export default function IndustriesPage() {

  const [industries, setIndustries] =
    useState<Industry[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedIndustry, setSelectedIndustry] =
    useState<Industry | null>(null);

  async function loadIndustries() {

    try {

      const response =
        await industryService.getAll();

      setIndustries(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    let cancelled = false;

    async function fetchIndustries() {

        try {

        const response =
            await industryService.getAll();

        if (!cancelled) {

            setIndustries(response.data);

        }

        } catch (error) {

        console.error(error);

        } finally {

        if (!cancelled) {

            setLoading(false);

        }

        }

    }

    fetchIndustries();

    return () => {

        cancelled = true;

    };

    
  }, []);

  function handleCreate() {

    setSelectedIndustry(null);

    setDialogOpen(true);

  }

  function handleEdit(industry: Industry) {

    setSelectedIndustry(industry);

    setDialogOpen(true);

  }

  function handleDelete(industry: Industry) {

    setSelectedIndustry(industry);

    setDeleteOpen(true);

  }

  async function handleSubmit(
    request: IndustryRequest
  ) {

    if (selectedIndustry) {

      await industryService.update(
        selectedIndustry.id,
        request
      );

    } else {

      await industryService.create(
        request
      );

    }

    setDialogOpen(false);

    await loadIndustries();

  }

  async function confirmDelete() {

    if (!selectedIndustry) return;

    await industryService.delete(
      selectedIndustry.id
    );

    setDeleteOpen(false);

    await loadIndustries();

  }

  if (loading) {

    return (

      <div className="flex justify-center p-10">

        Loading Industries...

      </div>

    );

  }

  return (

    <div className="space-y-8 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Industry Management

          </h1>

          <p className="mt-2 text-gray-500">

            Create, edit and delete industries.

          </p>

        </div>

        <button

          onClick={handleCreate}

          className="rounded-lg bg-blue-600 px-5 py-3 text-white"

        >

          + Add Industry

        </button>

      </div>

      <IndustryTable

        industries={industries}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      <IndustryDialog

        open={dialogOpen}

        industry={selectedIndustry}

        onClose={() => setDialogOpen(false)}

        onSubmit={handleSubmit}

      />

      <DeleteIndustryDialog

        open={deleteOpen}

        industry={selectedIndustry}

        onClose={() => setDeleteOpen(false)}

        onConfirm={confirmDelete}

      />

    </div>

  );

}