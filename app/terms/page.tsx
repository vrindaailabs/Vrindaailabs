import Container from "@/components/ui/Container";

export const metadata = {
  title: "Terms & Conditions | Vrinda AI Labs",
  description:
    "Read the Terms and Conditions governing the use of the Vrinda AI Labs website and services.",
};

export default function TermsPage() {
  return (
    <main className="bg-white py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-700">
            Legal
          </span>

          <h1 className="mt-6 text-5xl font-bold text-slate-900">
            Terms &amp; Conditions
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Last Updated: July 2026
          </p>

          <div className="mt-12 space-y-12 leading-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                1. Acceptance of Terms
              </h2>

              <p className="mt-4">
                By accessing or using the Vrinda AI Labs website, you agree to
                comply with these Terms and Conditions and all applicable laws
                and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                2. Use of the Website
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Use the website only for lawful purposes.</li>
                <li>Do not attempt to gain unauthorized access.</li>
                <li>Do not copy or misuse website content.</li>
                <li>Respect intellectual property rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                3. Intellectual Property
              </h2>

              <p className="mt-4">
                All content, branding, graphics, software and materials on this
                website are the property of Vrinda AI Labs unless otherwise
                stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                4. Limitation of Liability
              </h2>

              <p className="mt-4">
                Vrinda AI Labs is not liable for indirect, incidental or
                consequential damages arising from the use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                5. Changes to These Terms
              </h2>

              <p className="mt-4">
                We may update these Terms and Conditions from time to time.
                Continued use of the website constitutes acceptance of any
                revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                6. Contact
              </h2>

              <p className="mt-4">
                For any questions regarding these Terms and Conditions, please
                contact us through the Contact page.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}