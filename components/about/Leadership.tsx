// import { CONTENT } from "@/constants/content";

// export default function Leadership() {
//   return (
//     <section className="bg-slate-900 py-24 text-white">
//       <div className="mx-auto max-w-7xl px-6">
//         <h2 className="text-4xl font-bold">
//           Leadership
//         </h2>

//         <p className="mt-8 max-w-3xl">
//           {CONTENT.about.leadership}
//         </p>
//       </div>
//     </section>
//   );
// }

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import { CONTENT } from "@/constants/content";

export default function Leadership() {
  return (
    <section className="bg-gray-50 py-24">
      <Container>
        <SectionTitle
          title="Leadership"
          align="left"
        />

        <p className="mt-8 text-lg leading-8 text-gray-600">
          {CONTENT.about.leadership}
        </p>
      </Container>
    </section>
  );
}