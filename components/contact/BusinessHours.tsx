import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

const schedule = [
  { day: "Monday", hours: "9:00 AM – 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 6:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 6:00 PM" },
  { day: "Friday", hours: "9:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "By Appointment" },
  { day: "Sunday", hours: "Closed" },
];

export default function BusinessHours() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Business Hours
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            When You Can Reach Us
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Our team is available during the following business hours. For urgent
            inquiries outside these hours, you can still submit the contact form,
            and We&apos;ll respond on the next business day.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <Card className="p-0 overflow-hidden">
            {schedule.map((item, index) => (
              <div
                key={item.day}
                className={`flex items-center justify-between px-8 py-5 ${
                  index !== schedule.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <span className="font-semibold text-slate-900">
                  {item.day}
                </span>

                <span
                  className={`font-medium ${
                    item.hours === "Closed"
                      ? "text-red-600"
                      : item.hours === "By Appointment"
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.hours}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </Container>
    </section>
  );
}