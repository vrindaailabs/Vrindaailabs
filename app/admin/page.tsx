"use client";

import { useEffect, useState } from "react";

import { dashboardService } from "@/services/dashboard.service";

import type {
  DashboardStatisticsResponse,
  RecentApplicationResponse,
} from "@/types/dashboard";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  const [statistics, setStatistics] =
    useState<DashboardStatisticsResponse | null>(null);

  const [recentApplications, setRecentApplications] =
    useState<RecentApplicationResponse[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      try {
        const [
          statisticsResponse,
          recentApplicationsResponse,
        ] = await Promise.all([
          dashboardService.getStatistics(),
          dashboardService.getRecentApplications(),
        ]);

        if (!cancelled) {
          setStatistics(statisticsResponse.data);
          setRecentApplications(
            recentApplicationsResponse.data
          );
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      {/* Dashboard Heading */}

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Overview of your Vrinda AI Labs administration.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <DashboardCard
          title="Applications"
          value={statistics?.totalApplications ?? 0}
        />

        <DashboardCard
          title="Applied"
          value={statistics?.applied ?? 0}
        />

        <DashboardCard
          title="Shortlisted"
          value={statistics?.shortlisted ?? 0}
        />

        <DashboardCard
          title="Interview"
          value={statistics?.interview ?? 0}
        />

        <DashboardCard
          title="Selected"
          value={statistics?.selected ?? 0}
        />

        <DashboardCard
          title="Hired"
          value={statistics?.hired ?? 0}
        />

        <DashboardCard
          title="Rejected"
          value={statistics?.rejected ?? 0}
        />

      </div>

      {/* Recent Applications */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-2xl font-semibold">
            Recent Applications
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest candidate applications.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b">

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Job
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Applied
                </th>

              </tr>

            </thead>

            <tbody>

              {recentApplications.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No applications found.
                  </td>

                </tr>

              ) : (

                recentApplications.map(
                  (application) => (

                    <tr
                      key={application.id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >

                      <td className="px-4 py-4">
                        {application.fullName}
                      </td>

                      <td className="px-4 py-4">
                        {application.email}
                      </td>

                      <td className="px-4 py-4">
                        {application.jobTitle}
                      </td>

                      <td className="px-4 py-4">

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {application.candidateStatus}
                        </span>

                      </td>

                      <td className="px-4 py-4">
                        {new Date(
                          application.appliedAt
                        ).toLocaleDateString()}
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: number;
}

function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </h2>

    </div>
  );
}