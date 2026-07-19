// import Link from "next/link";

// import { COMPANY } from "@/constants/company";
// import { navigation } from "@/constants/navigation";
// import { services } from "@/constants/services";
// import { products } from "@/constants/products";

// export default function Footer() {
//   return (
//     <footer className="bg-slate-950 py-16 text-gray-300">
//       <div className="mx-auto grid max-w-7xl gap-12 px-8 md:grid-cols-4">

//         {/* Company */}

//         <div>
//           <h2 className="text-2xl font-bold text-white">
//             {COMPANY.name}
//           </h2>

//           <p className="mt-4">
//             {COMPANY.tagline}
//           </p>

//           <p className="mt-6">
//             {COMPANY.location}
//           </p>

//           <p className="mt-2">
//             {COMPANY.email}
//           </p>

//           <p className="mt-2">
//             {COMPANY.phone}
//           </p>
//         </div>

//         {/* Company Links */}

//         <div>
//           <h3 className="font-semibold text-white">
//             Company
//           </h3>

//           <ul className="mt-4 space-y-2">

//             {navigation.map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className="transition hover:text-blue-400"
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}

//           </ul>
//         </div>

//         {/* Services */}

//         <div>
//           <h3 className="font-semibold text-white">
//             Services
//           </h3>

//           <ul className="mt-4 space-y-2">

//             {services.map((service) => (
//               <li key={service.title}>
//                 {service.title}
//               </li>
//             ))}

//           </ul>
//         </div>

//         {/* Products */}

//         <div>
//           <h3 className="font-semibold text-white">
//             Products
//           </h3>

//           <ul className="mt-4 space-y-2">

//             {products.map((product) => (
//               <li key={product.title}>
//                 {product.title}
//               </li>
//             ))}

//           </ul>
//         </div>
//       </div>

//       <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm">
//         © 2026 {COMPANY.name}. All Rights Reserved.
//       </div>
//     </footer>
//   );
// }



import Link from "next/link";

import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

import { navigation } from "@/constants/navigation";
import { services } from "@/constants/services";
import { products } from "@/constants/products";
import { COMPANY } from "@/constants/company";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-16 text-gray-300">
      <Container>

        <div className="grid gap-12 md:grid-cols-4">

          <div>
            <Logo size="sm" />

            <p className="mt-4 text-sm text-gray-400">
              {COMPANY.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Company
            </h3>

            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Services
            </h3>

            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.title}>
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Products
            </h3>

            <ul className="mt-4 space-y-2">
              {products.map((product) => (
                <li key={product.title}>
                  {product.title}
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {COMPANY.name}. All Rights Reserved.
        </div>

      </Container>
    </footer>
  );
}