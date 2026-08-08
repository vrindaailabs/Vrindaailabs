"use client";

import { useState } from "react";

import Container from "@/components/ui/Container";

const faqs = [
  {
    question: "How do I apply for a job at Vrinda AI Labs?",
    answer:
      "Browse our open positions, choose the role that best matches your skills and click the 'Apply Now' button. Our recruitment team will review your application.",
  },
  {
    question: "Do you offer remote or hybrid work opportunities?",
    answer:
      "Depending on the role and project requirements, we may offer on-site, hybrid or remote work arrangements.",
  },
  {
    question: "What is the recruitment process?",
    answer:
      "Our hiring process generally includes application screening, technical evaluation, HR discussion and a final offer for selected candidates.",
  },
  {
    question: "Do you hire fresh graduates?",
    answer:
      "Yes. We welcome talented fresh graduates and interns who are passionate about software engineering, AI and innovation.",
  },
  {
    question: "Can I apply for multiple positions?",
    answer:
      "Yes. If your skills match multiple roles, you are welcome to apply for more than one position.",
  },
];

export default function CareersFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Careers FAQ
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Find answers to some of the most common questions about joining
            Vrinda AI Labs.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-slate-200"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between bg-white px-6 py-5 text-left transition-colors hover:bg-slate-50"
              >
                <span className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </span>

                <span className="text-2xl font-bold text-blue-600">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">
                  <p className="leading-7 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}