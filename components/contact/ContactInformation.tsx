import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

const contactDetails = [
  {
    icon: "📧",
    title: "Email",
    value: "contact@vrindaailabs.com",
    description: "For general inquiries and business discussions.",
  },
  {
    icon: "📞",
    title: "Phone",
    value: "+91 98765 43210",
    description: "Monday to Friday, 9:00 AM – 6:00 PM IST.",
  },
  {
    icon: "📍",
    title: "Office",
    value: "Bengaluru, Karnataka, India",
    description: "Serving clients across India and globally.",
  },
  {
    icon: "💬",
    title: "Response Time",
    value: "Within 24 Hours",
    description: "We aim to respond to all inquiries promptly.",
  },
];

export default function ContactInformation() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Contact Information
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            We&apos;re Here to Help
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Reach out through your preferred channel. Our team is ready to
            answer your questions and discuss your business needs.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contactDetails.map((item) => (
            <Card
              key={item.title}
              className="text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 text-5xl">{item.icon}</div>

              <h3 className="text-2xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-4 text-lg font-semibold text-blue-600">
                {item.value}
              </p>

              <p className="mt-3 leading-7 text-gray-600">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}