"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Contact Form:", formData);

    alert("Thank you! Your inquiry has been received.");
  };

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Contact Form
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Tell Us About Your Project
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Fill out the form below and our team will get back to you as soon
            as possible.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-4xl rounded-3xl border border-gray-200 bg-white p-10 shadow-lg"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />

            <Input
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="ABC Technologies"
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
            />

            <div className="md:col-span-2">
              <label className="mb-2 block font-medium text-slate-700">
                Service Interested In
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
              >
                <option value="">Select a Service</option>
                <option>AI Solutions</option>
                <option>Business Automation</option>
                <option>Web Development</option>
                <option>Mobile App Development</option>
                <option>Enterprise Software</option>
                <option>Consultation</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Project Details"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={6}
              />
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Button type="submit" size="lg">
              Send Message
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}