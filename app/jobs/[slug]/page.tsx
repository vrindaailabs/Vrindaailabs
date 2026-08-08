import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { jobs } from "@/data/jobs";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const job = jobs.find((job) => job.slug === slug);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: job.title,
    description: job.description,
  };
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export default async function JobDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const job = jobs.find((job) => job.slug === slug);

  if (!job) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            {job.department}
          </span>

          <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
            {job.employmentType}
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-bold text-slate-900">
          {job.title}
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          {job.description}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Experience
            </h3>

            <p className="mt-2 text-slate-600">
              {job.experience}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Location
            </h3>

            <p className="mt-2 text-slate-600">
              {job.location}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Employment
            </h3>

            <p className="mt-2 text-slate-600">
              {job.employmentType}
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Required Skills
          </h2>

          <ul className="mt-5 grid list-disc gap-3 pl-6 text-slate-700 md:grid-cols-2">
            {job.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Responsibilities
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-700">
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Qualifications
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-700">
            {job.qualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <Link
            href={`/careers/apply/${job.slug}`}
            className="inline-flex rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
}