import Container from "@/components/ui/Container";

export const metadata = {
  title: "Privacy Policy | Vrinda AI Labs",
  description:
    "Read the Privacy Policy of Vrinda AI Labs to understand how we collect, use and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-700">
            Legal
          </span>

          <h1 className="mt-6 text-5xl font-bold text-slate-900">
            Privacy Policy
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Last Updated: July 2026
          </p>

          <div className="mt-12 space-y-12 text-gray-700 leading-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                1. Introduction
              </h2>

              <p className="mt-4">
                Vrinda AI Labs respects your privacy and is committed to
                protecting your personal information. This Privacy Policy
                explains how we collect, use and safeguard information when you
                visit our website or interact with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                2. Information We Collect
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Company Name</li>
                <li>Messages submitted through our contact form</li>
                <li>Technical information such as browser type and IP address</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                3. How We Use Your Information
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Respond to enquiries.</li>
                <li>Provide requested services.</li>
                <li>Improve website performance and user experience.</li>
                <li>Communicate important updates.</li>
                <li>Maintain website security.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                4. Data Protection
              </h2>

              <p className="mt-4">
                We implement appropriate administrative, technical and
                organizational safeguards to protect your personal information
                from unauthorized access, disclosure or misuse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                5. Third-Party Services
              </h2>

              <p className="mt-4">
                Our website may use trusted third-party services such as
                analytics, cloud hosting and communication tools. These
                providers process information in accordance with their own
                privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                6. Contact Us
              </h2>

              <p className="mt-4">
                If you have questions regarding this Privacy Policy, please
                contact Vrinda AI Labs using the Contact page on this website.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}