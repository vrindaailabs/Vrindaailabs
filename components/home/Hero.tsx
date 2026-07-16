export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-28 text-center">

      <p className="mb-4 text-blue-600 font-semibold uppercase tracking-widest">
        Welcome to Vrinda AI Labs
      </p>

      <h1 className="text-6xl font-extrabold leading-tight">
        Work Smarter.
        <br />
        Grow Faster.
      </h1>

      <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-600">
        We help businesses eliminate repetitive work with intelligent
        software, automation and AI-powered solutions.
      </p>

      <div className="mt-12 flex justify-center gap-5">

        <button className="rounded-xl bg-black px-8 py-4 text-white">
          Explore Solutions
        </button>

        <button className="rounded-xl border px-8 py-4">
          Contact Us
        </button>

      </div>

    </section>
  );
}