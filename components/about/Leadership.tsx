import { CONTENT } from "@/constants/content";

export default function Leadership() {
  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold">
          Leadership
        </h2>

        <p className="mt-8 max-w-3xl">
          {CONTENT.about.leadership}
        </p>
      </div>
    </section>
  );
}