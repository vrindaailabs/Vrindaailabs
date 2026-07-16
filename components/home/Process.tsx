export default function Process() {

  const steps = [
    "Discovery",
    "Planning",
    "UI / UX Design",
    "Development",
    "Testing",
    "Deployment",
    "Support"
  ];

  return (
    <section className="bg-gray-50 py-24">

      <div className="mx-auto max-w-7xl px-8">

        <h2 className="text-center text-4xl font-bold">
          Our Development Process
        </h2>

        <p className="mt-4 text-center text-gray-600">
          A structured process that ensures quality software delivery.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-4 lg:grid-cols-7">

          {steps.map((step, index) => (

            <div
              key={step}
              className="rounded-xl border bg-white p-6 text-center shadow-sm">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                {index + 1}
              </div>

              <h3 className="font-semibold">
                {step}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}