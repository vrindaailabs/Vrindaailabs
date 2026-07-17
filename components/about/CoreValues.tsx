import { CONTENT } from "@/constants/content";

export default function CoreValues() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold">
          Core Values
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {CONTENT.about.values.map((value) => (
            <div
              key={value}
              className="rounded-xl border bg-white p-8 text-center"
            >
              <h3 className="text-xl font-semibold">
                {value}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}