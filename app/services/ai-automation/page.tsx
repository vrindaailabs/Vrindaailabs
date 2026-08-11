import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation",
};

export default function AIAutomationPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="text-5xl font-bold">
        AI Automation
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        Intelligent automation solutions for modern businesses.
      </p>
    </main>
  );
}