"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/lib/auth";
import { dashboardService } from "@/services/dashboard.service";

import {
  DashboardStatisticsResponse,
  RecentApplicationResponse,
} from "@/types/dashboard";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [statistics, setStatistics] =
    useState<DashboardStatisticsResponse | null>(null);

  const [recentApplications, setRecentApplications] =
    useState<RecentApplicationResponse[]>([]);

  useEffect(() => {
    let mounted = true;

    async function fetchDashboard() {
      try {
        const [stats, recent] = await Promise.all([
          dashboardService.getStatistics(),
          dashboardService.getRecentApplications(),
        ]);

        if (!mounted) return;

        setStatistics(stats.data);
        setRecentApplications(recent.data);
      } catch (error) {
        console.error("Dashboard Error", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="flex items-center justify-between border-b bg-white px-10 py-6 shadow">

        <h1 className="text-3xl font-bold">
          Vrinda AI Labs Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>

      </header>

      <div className="grid grid-cols-1 gap-6 p-10 md:grid-cols-2 lg:grid-cols-4">

        <DashboardCard
          title="Applications"
          value={statistics?.totalApplications}
        />

        <DashboardCard
          title="Applied"
          value={statistics?.applied}
        />

        <DashboardCard
          title="Shortlisted"
          value={statistics?.shortlisted}
        />

        <DashboardCard
          title="Interview"
          value={statistics?.interview}
        />

        <DashboardCard
          title="Selected"
          value={statistics?.selected}
        />

        <DashboardCard
          title="Hired"
          value={statistics?.hired}
        />

        <DashboardCard
          title="Rejected"
          value={statistics?.rejected}
        />

      </div>

      <div className="mx-10 mb-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-semibold">
          Recent Applications
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Name
              </th>

              <th className="text-left">
                Email
              </th>

              <th className="text-left">
                Job
              </th>

              <th className="text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {recentApplications.length === 0 ? (
              <tr>

                <td
                  colSpan={4}
                  className="py-8 text-center text-gray-500"
                >
                  No Applications Found
                </td>

              </tr>
            ) : (
              recentApplications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {application.fullName}
                  </td>

                  <td>
                    {application.email}
                  </td>

                  <td>
                    {application.jobTitle}
                  </td>

                  <td>
                    {application.candidateStatus}
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value?: number;
}

function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        {value ?? 0}
      </h2>

    </div>
  );
}