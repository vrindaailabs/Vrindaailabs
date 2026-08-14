"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// import { logout } from "@/lib/auth";
import authService from "@/services/auth.service";
import { dashboardService } from "@/services/dashboard.service";

import type {
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

    async function fetchDashboard() {

      try {

        const [statsResponse, recentResponse] =
          await Promise.all([
            dashboardService.getStatistics(),
            dashboardService.getRecentApplications(),
          ]);

        setStatistics(statsResponse.data);

        setRecentApplications(recentResponse.data);

      } catch (error) {

        console.error("Dashboard Error:", error);

      } finally {

        setLoading(false);

      }

    }

    fetchDashboard();

  }, []);

  async function handleLogout() {

    try {

      await authService.logout();

    } finally {

      router.replace("/login");

      router.refresh();

    }
  }

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <h2 className="text-2xl font-semibold">

          Loading Dashboard...

        </h2>

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

      <div className="mx-10 mb-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-semibold">

          Recent Applications

        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">Name</th>

              <th className="py-3 text-left">Email</th>

              <th className="py-3 text-left">Job</th>

              <th className="py-3 text-left">Status</th>

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

  value: number;

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

        {value}

      </h2>

    </div>

  );

}