export default function WhyChooseUs() {

  const reasons = [
    {
      title: "Business First",
      description: "We solve business problems, not just technical challenges."
    },
    {
      title: "AI + Automation",
      description: "Modern AI combined with intelligent automation for measurable results."
    },
    {
      title: "Enterprise Quality",
      description: "Secure, scalable and maintainable software built for growth."
    },
    {
      title: "Long-Term Partnership",
      description: "We become your technology partner, not just a software vendor."
    }
  ];

  return (
    <section className="bg-slate-900 py-24 text-white">

      <div className="mx-auto max-w-7xl px-8">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Why Choose Vrinda AI Labs?
          </h2>

          <p className="mt-4 text-slate-300">
            Technology built with business impact in mind.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">

          {reasons.map((reason) => (

            <div
              key={reason.title}
              className="rounded-2xl border border-slate-700 bg-slate-800 p-8">

              <h3 className="text-2xl font-semibold">
                {reason.title}
              </h3>

              <p className="mt-4 text-slate-300">
                {reason.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}