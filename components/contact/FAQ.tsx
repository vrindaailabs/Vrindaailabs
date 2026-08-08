"use client";

import { useState } from "react";

import Container from "@/components/ui/Container";

const faqs = [
  {
    question: "What services does Vrinda AI Labs provide?",
    answer:
      "We provide AI solutions, business automation, enterprise software development, web applications, mobile applications and technology consulting.",
  },
  {
    question: "How quickly can you start a project?",
    answer:
      "After an initial consultation and requirement analysis, we can usually begin within a few business days depending on project scope.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We work with businesses across India as well as international clients through remote collaboration.",
  },
  {
    question: "Can you modernize existing software?",
    answer:
      "Absolutely. We help businesses upgrade legacy systems, improve performance, migrate to cloud platforms and introduce AI-powered automation.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "Simply submit the contact form with your project details. Our team will review your requirements and get back to you with the next steps.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Common Questions
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Here are some of the questions we receive most often from our
            clients.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-gray-200"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-slate-900 transition hover:bg-gray-50"
              >
                {faq.question}

                <span className="text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="border-t border-gray-200 px-6 py-5 leading-7 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}