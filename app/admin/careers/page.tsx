"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/axios";

interface CareerApplication {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  experience: string;
  candidateStatus: string;
  appliedAt: string;
}

export default function CareersPage() {

  const [applications, setApplications] =
    useState<CareerApplication[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadApplications() {

    try {

      const response =
        await api.get("/careers");

      setApplications(response.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

//   useEffect(() => {

//     const fetchData = async () => {
//       await loadApplications();
//     };

//     fetchData();

//   }, []);
    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await api.get("/careers");

                setApplications(response.data.data);

            } catch (error) {

              console.error(error);

            } finally {

              setLoading(false);

            }

        };

        fetchData();

    }, []);


  if (loading) {

    return <p className="p-6">Loading...</p>;

  }

  return (

    <div className="p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Career Applications
      </h1>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-3">Name</th>

            <th className="border p-3">Email</th>

            <th className="border p-3">Phone</th>

            <th className="border p-3">Job</th>

            <th className="border p-3">Experience</th>

            <th className="border p-3">Status</th>

            <th className="border p-3">Applied</th>

            <th className="border p-3">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {applications.map((app) => (

            <tr key={app.id}>

              <td className="border p-3">
                {app.fullName}
              </td>

              <td className="border p-3">
                {app.email}
              </td>

              <td className="border p-3">
                {app.phoneNumber}
              </td>

              <td className="border p-3">
                {app.jobTitle}
              </td>

              <td className="border p-3">
                {app.experience}
              </td>

              <td className="border p-3">
                {app.candidateStatus}
              </td>

              <td className="border p-3">
                {new Date(app.appliedAt)
                  .toLocaleDateString()}
              </td>

              <td className="border p-3 space-x-2">

                <button
                  className="rounded bg-blue-600 px-3 py-1 text-white"
                >
                  View
                </button>

                <button
                  className="rounded bg-green-600 px-3 py-1 text-white"
                >
                  Resume
                </button>

                <button
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Status
                </button>

                <button
                  className="rounded bg-red-600 px-3 py-1 text-white"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}