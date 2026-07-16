export default function Testimonials() {

  const reviews = [
    {
      name: "Future Client",
      role: "Enterprise Customer",
      review:
        "Vrinda AI Labs delivered a professional software solution that transformed our business."
    },
    {
      name: "Future Partner",
      role: "Startup Founder",
      review:
        "Professional team, excellent communication and outstanding quality."
    },
    {
      name: "Future Customer",
      role: "Business Owner",
      review:
        "Highly recommended for AI and enterprise software development."
    }
  ];

  return (

    <section className="py-24">

      <div className="mx-auto max-w-7xl px-8">

        <h2 className="text-center text-4xl font-bold">
          What Our Future Clients Will Say
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {reviews.map((item) => (

            <div
              key={item.name}
              className="rounded-xl border bg-white p-8 shadow-sm">

              <p className="italic text-gray-600">
                &ldquo;{item.review}&rdquo;
              </p>

              <div className="mt-8">

                <h3 className="font-bold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}