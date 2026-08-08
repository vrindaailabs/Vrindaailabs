import Link from "next/link";

import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

import { jobs } from "@/data/jobs";

export default function OpenPositions() {
  return (
    <section
      id="open-positions"
      className="bg-white py-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Open Positions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Join Our Growing Team
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Explore exciting career opportunities and become part of a team
            building intelligent software solutions that make a real business
            impact.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {job.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {job.department}
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {job.employmentType}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                      📍 {job.location}
                    </span>

                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                      💼 {job.experience}
                    </span>
                  </div>

                  <p className="mt-6 leading-7 text-gray-600">
                    {job.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:items-start">
                  <Link href={`/jobs/${job.slug}`}>
                    <Button variant="primary">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}