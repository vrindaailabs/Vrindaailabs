"use client";

import { useEffect, useState } from "react";

import CareerTable from "@/components/admin/careers/CareerTable";
import CareerViewModal from "@/components/admin/careers/CareerViewModal";
import DeleteDialog from "@/components/admin/careers/DeleteDialog";
import StatusDialog from "@/components/admin/careers/StatusDialog";

import { careerService } from "@/services/career.service";

import type {
  CareerApplication,
  CandidateStatus,
} from "@/types/career-application";

export default function CareersPage() {
  const [applications, setApplications] = useState<
    CareerApplication[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [selectedApplication, setSelectedApplication] =
    useState<CareerApplication | null>(null);

  const [viewOpen, setViewOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);

  const [statusApplicationId, setStatusApplicationId] =
    useState<number | null>(null);

  const [statusCurrent, setStatusCurrent] =
    useState<CandidateStatus>("APPLIED");

  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] = useState<string | null>(null);

  /**
   * Load all career applications
   */
  async function loadApplications() {
    try {
      setError(null);

      const response =
        await careerService.getAllApplications();

      setApplications(response.data);
    } catch (error) {
      console.error(
        "Failed to load career applications:",
        error
      );

      setError(
        "Unable to load career applications."
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * Initial load
   */
  useEffect(() => {
    let cancelled = false;

    async function fetchApplications() {
      try {
        const response =
          await careerService.getAllApplications();

        if (!cancelled) {
          setApplications(response.data);
          setError(null);
        }
      } catch (error) {
        console.error(
          "Failed to load career applications:",
          error
        );

        if (!cancelled) {
          setError(
            "Unable to load career applications."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchApplications();

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * View application
   */
  async function handleView(id: number) {
    try {
      setActionLoading(true);
      setError(null);

      const response =
        await careerService.getApplication(id);

      setSelectedApplication(response.data);
      setViewOpen(true);
    } catch (error) {
      console.error(
        "Failed to load application:",
        error
      );

      setError(
        "Unable to load candidate details."
      );
    } finally {
      setActionLoading(false);
    }
  }

  /**
   * Download resume
   */
  async function handleResume(id: number) {
    try {
      setActionLoading(true);
      setError(null);

      const blob =
        await careerService.downloadResume(id);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      const application =
        applications.find(
          (item) => item.id === id
        );

      link.download =
        application?.resumeFileName ||
        "resume";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Failed to download resume:",
        error
      );

      setError(
        "Unable to download resume."
      );
    } finally {
      setActionLoading(false);
    }
  }

  /**
   * Open status dialog
   */
  function handleStatus(id: number) {
    const application =
      applications.find(
        (item) => item.id === id
      );

    if (!application) {
      return;
    }

    setStatusApplicationId(id);

    setStatusCurrent(
      application.candidateStatus
    );

    setStatusOpen(true);
  }

  /**
   * Refresh after status update
   */
  async function handleStatusSuccess() {
    await loadApplications();
  }

  /**
   * Open delete confirmation
   */
  function handleDelete(id: number) {
    const application =
      applications.find(
        (item) => item.id === id
      );

    if (!application) {
      return;
    }

    setSelectedApplication(application);

    setDeleteOpen(true);
  }

  /**
   * Confirm delete
   */
  async function confirmDelete() {
    if (!selectedApplication) {
      return;
    }

    try {
      setActionLoading(true);
      setError(null);

      await careerService.deleteApplication(
        selectedApplication.id
      );

      setDeleteOpen(false);

      setSelectedApplication(null);

      await loadApplications();
    } catch (error) {
      console.error(
        "Failed to delete application:",
        error
      );

      setError(
        "Unable to delete application."
      );
    } finally {
      setActionLoading(false);
    }
  }

  /**
   * Loading state
   */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-gray-500">
          Loading Career Applications...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Career Applications
          </h1>

          <p className="mt-2 text-gray-500">
            Manage candidates, resumes and
            recruitment status.
          </p>
        </div>

        <div className="rounded-lg bg-slate-100 px-4 py-2">
          <span className="text-sm text-gray-500">
            Total Applications
          </span>

          <span className="ml-2 font-bold text-slate-900">
            {applications.length}
          </span>
        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Global action loading */}

      {actionLoading && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
          Processing request...
        </div>
      )}

      {/* Applications */}

      <CareerTable
        applications={applications}
        onView={handleView}
        onResume={handleResume}
        onStatus={handleStatus}
        onDelete={handleDelete}
      />

      {/* View */}

      <CareerViewModal
        open={viewOpen}
        application={selectedApplication}
        onClose={() => {
          setViewOpen(false);
          setSelectedApplication(null);
        }}
      />

      {/* Status */}

      <StatusDialog
        open={statusOpen}
        applicationId={statusApplicationId}
        currentStatus={statusCurrent}
        onClose={() => {
          setStatusOpen(false);
          setStatusApplicationId(null);
        }}
        onSuccess={handleStatusSuccess}
      />

      {/* Delete */}

      <DeleteDialog
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedApplication(null);
        }}
        onDelete={confirmDelete}
      />

    </div>
  );
}