// import { CONTENT } from "@/constants/content";

// export default function Hero() {
//   return (
//     <section className="mx-auto max-w-7xl px-8 py-28 text-center">
//       <p className="mb-4 font-semibold uppercase tracking-widest text-blue-600">
//         {CONTENT.hero.badge}
//       </p>

//       <h1 className="text-6xl font-extrabold leading-tight">
//         {CONTENT.hero.titleLine1}
//         <br />
//         {CONTENT.hero.titleLine2}
//       </h1>

//       <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-600">
//         {CONTENT.hero.subtitle}
//       </p>

//       <div className="mt-12 flex justify-center gap-5">
//         <button className="rounded-xl bg-black px-8 py-4 text-white">
//           {CONTENT.hero.primaryButton}
//         </button>

//         <button className="rounded-xl border px-8 py-4">
//           {CONTENT.hero.secondaryButton}
//         </button>
//       </div>
//     </section>
//   );
// }


import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { CONTENT } from "@/constants/content";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-white py-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <div>

            <p className="mb-6 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              {CONTENT.hero.badge}
            </p>

            <h1 className="text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">
              {CONTENT.hero.titleLine1}
              <br />
              <span className="text-blue-600">
                {CONTENT.hero.titleLine2}
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
              {CONTENT.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Button
                variant="primary"
                size="lg"
              >
                {CONTENT.hero.primaryButton}
              </Button>

              <Button
                variant="outline"
                size="lg"
              >
                {CONTENT.hero.secondaryButton}
              </Button>

            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-sm text-gray-600">

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  50+
                </h3>

                Projects
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  100%
                </h3>

                Client Focus
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  AI
                </h3>

                Driven
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <div className="rounded-3xl bg-linear-to-br from-blue-50 via-cyan-50 to-white p-10 shadow-xl">

              <Image
                src="/images/hero-ai.png"
                alt="AI Solutions"
                width={700}
                height={600}
                className="mx-auto h-auto w-full"
                priority
              />

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}