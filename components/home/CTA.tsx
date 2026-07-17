import { CONTENT } from "@/constants/content";

export default function CTA() {
  return (
    <section className="bg-blue-600 py-24 text-white">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-5xl font-bold">
          {CONTENT.cta.title}
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-xl">
          {CONTENT.cta.subtitle}
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <button className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-600">
            {CONTENT.cta.primaryButton}
          </button>

          <button className="rounded-xl border border-white px-8 py-4">
            {CONTENT.cta.secondaryButton}
          </button>
        </div>
      </div>
    </section>
  );
}