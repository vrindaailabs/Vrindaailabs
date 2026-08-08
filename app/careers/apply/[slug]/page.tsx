import { Metadata } from "next";
import { notFound } from "next/navigation";

import ApplyForm from "@/components/careers/ApplyForm";
import { jobs } from "@/data/jobs";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

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
    title: `Apply for ${job.title} | Vrinda AI Labs`,
    description: `Apply for the ${job.title} position at Vrinda AI Labs.`,
  };
}

export default async function ApplyPage({
  params,
}: Props) {
  const { slug } = await params;

  const job = jobs.find((job) => job.slug === slug);

  if (!job) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Apply for {job.title}
        </h1>

        <p className="mt-3 text-slate-600">
          Complete the form below to apply for this position.
        </p>
      </div>

      <ApplyForm jobTitle={job.title} />
    </section>
  );
}