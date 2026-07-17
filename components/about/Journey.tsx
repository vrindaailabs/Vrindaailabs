import { CONTENT } from "@/constants/content";

export default function Journey() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold">
          Our Journey
        </h2>

        <p className="mt-8">
          {CONTENT.about.journey}
        </p>
      </div>
    </section>
  );
}