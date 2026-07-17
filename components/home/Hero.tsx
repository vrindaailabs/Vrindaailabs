import { CONTENT } from "@/constants/content";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-28 text-center">
      <p className="mb-4 font-semibold uppercase tracking-widest text-blue-600">
        {CONTENT.hero.badge}
      </p>

      <h1 className="text-6xl font-extrabold leading-tight">
        {CONTENT.hero.titleLine1}
        <br />
        {CONTENT.hero.titleLine2}
      </h1>

      <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-600">
        {CONTENT.hero.subtitle}
      </p>

      <div className="mt-12 flex justify-center gap-5">
        <button className="rounded-xl bg-black px-8 py-4 text-white">
          {CONTENT.hero.primaryButton}
        </button>

        <button className="rounded-xl border px-8 py-4">
          {CONTENT.hero.secondaryButton}
        </button>
      </div>
    </section>
  );
}