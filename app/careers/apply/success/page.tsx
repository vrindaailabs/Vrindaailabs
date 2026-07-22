import Link from "next/link";

export const metadata = {
  title: "Application Submitted",
  description: "Your application has been submitted successfully.",
};

export default function ApplicationSuccessPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6 py-20">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✅
        </div>

        <h1 className="mt-8 text-4xl font-bold text-slate-900">
          Application Submitted Successfully
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Thank you for applying to <strong>Vrinda AI Labs</strong>.
          <br />
          Our recruitment team will review your application and contact you if
          your profile matches our current requirements.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/careers"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View More Jobs
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}