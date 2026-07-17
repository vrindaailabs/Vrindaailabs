import { CONTENT } from "@/constants/content";

export default function MissionVision() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">

        <div className="rounded-2xl border p-8">
          <h2 className="text-3xl font-bold">
            Our Mission
          </h2>

          <p className="mt-5">
            {CONTENT.about.mission}
          </p>
        </div>

        <div className="rounded-2xl border p-8">
          <h2 className="text-3xl font-bold">
            Our Vision
          </h2>

          <p className="mt-5">
            {CONTENT.about.vision}
          </p>
        </div>

      </div>
    </section>
  );
}