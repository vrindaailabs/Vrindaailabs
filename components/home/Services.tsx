// import { services } from "@/constants/services";

// export default function Services() {
//   return (
//     <section className="bg-gray-50 py-24">
//       <div className="mx-auto max-w-7xl px-8">
//         <h2 className="text-center text-4xl font-bold">
//           Our Services
//         </h2>

//         <p className="mt-4 text-center text-gray-600">
//           Helping businesses transform with software and AI.
//         </p>

//         <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {services.map((service) => (
//             <div
//               key={service.title}
//               className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
//             >
//               <h3 className="mb-4 text-xl font-bold">
//                 {service.title}
//               </h3>

//               <p className="text-gray-600">
//                 {service.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";

import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import { services } from "@/constants/services";

export default function Services() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionTitle
          title="Our Services"
          subtitle="Helping businesses transform with AI, automation and modern software solutions."
          align="center"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 text-5xl">
                {service.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="flex-grow leading-7 text-gray-600">
                {service.description}
              </p>

              <Link
                href={service.link}
                className="mt-8 inline-flex font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Learn More →
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}