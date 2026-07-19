// export default function Products() {

//     const products = [
//         {
//             name: "AI HR",
//             description: "Smart hiring, employee management and HR automation."
//         },
//         {
//             name: "AI Finance",
//             description: "Financial analytics, budgeting and intelligent reporting."
//         },
//         {
//             name: "AI Hospital",
//             description: "Healthcare automation, patient management and AI assistance."
//         },
//         {
//             name: "AI Education",
//             description: "Learning management and AI-powered education platform."
//         },
//         {
//             name: "Business AI Assistant",
//             description: "An intelligent assistant for business operations and productivity."
//         },
//         {
//             name: "Enterprise Platform",
//             description: "A unified platform connecting all AI products."
//         }
//     ];

//     return (
//         <section className="py-24">

//             <div className="mx-auto max-w-7xl px-8">

//                 <div className="text-center">

//                     <h2 className="text-4xl font-bold">
//                         Our Product Vision
//                     </h2>

//                     <p className="mt-4 text-gray-600">
//                         Building intelligent products that solve real-world business challenges.
//                     </p>

//                 </div>

//                 <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

//                     {products.map((product) => (

//                         <div
//                             key={product.name}
//                             className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

//                             <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
//                                 🚀
//                             </div>

//                             <h3 className="text-xl font-bold">
//                                 {product.name}
//                             </h3>

//                             <p className="mt-3 text-gray-600">
//                                 {product.description}
//                             </p>

//                         </div>

//                     ))}

//                 </div>

//             </div>

//         </section>
//     );
// }

import Link from "next/link";

import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import { products } from "@/constants/products";

export default function Products() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionTitle
          title="Our Products"
          subtitle="AI-powered products designed to accelerate business growth."
          align="center"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.title}
              className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="mb-5 text-5xl">
                {product.icon}
              </div>

              {/* Category */}
              <span className="mb-3 inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                {product.category}
              </span>

              {/* Product Name */}
              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                {product.title}
              </h3>

              {/* Description */}
              <p className="flex-grow leading-7 text-gray-600">
                {product.description}
              </p>

              {/* Link */}
              <Link
                href={product.link}
                className="mt-8 inline-flex font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Explore Product →
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}