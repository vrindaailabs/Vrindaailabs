import { CONTENT } from "@/constants/content";

export default function AboutHero() {
  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-6xl font-bold">
          {CONTENT.about.heroTitle}
        </h1>

        <p className="mt-8 max-w-3xl text-xl">
          {CONTENT.about.heroSubtitle}
        </p>
      </div>
    </section>
  );
}