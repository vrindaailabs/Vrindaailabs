"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

import { contactService } from "@/services/contact.service";

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  // Indian number entered as +91XXXXXXXXXX
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }

  return digits;
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
    ).response;

    if (response?.data?.message) {
      return response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to send your message. Please try again.";
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const normalizedPhone =
        normalizePhone(formData.phone);

      if (normalizedPhone.length !== 10) {
        setError(
          "Phone Number must be a valid 10-digit Indian mobile number."
        );
        return;
      }

      if (!formData.name.trim()) {
        setError("Full Name is required.");
        return;
      }

      if (!formData.email.trim()) {
        setError("Email is required.");
        return;
      }

      if (!formData.service.trim()) {
        setError("Please select a service.");
        return;
      }

      if (formData.message.trim().length < 20) {
        setError(
          "Project Details must contain at least 20 characters."
        );
        return;
      }

      /*
       * Backend ContactRequest does not have a separate
       * company field.
       *
       * Therefore preserve the company information
       * inside the message instead of losing it.
       */
      const finalMessage = formData.company.trim()
        ? `Company: ${formData.company.trim()}\n\nProject Details:\n${formData.message.trim()}`
        : formData.message.trim();

      await contactService.submit({
        fullName: formData.name.trim(),

        email: formData.email.trim(),

        phoneNumber: normalizedPhone,

        subject:
          formData.service.trim() ||
          "General Inquiry",

        message: finalMessage,
      });

      setSuccess(
        "Thank you! Your message has been submitted successfully."
      );

      setFormData({
        ...initialFormData,
      });

    } catch (err: unknown) {
      console.error(
        "Contact submission failed:",
        err
      );

      setError(
        getErrorMessage(err)
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-50 py-24">
      <Container>

        <div className="mx-auto max-w-2xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Contact Form
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Tell Us About Your Project
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Fill out the form below and our team will get
            back to you as soon as possible.
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

              <label
                htmlFor="service"
                className="mb-2 block font-medium text-slate-700"
              >
                Service Interested In
              </label>

              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
              >

                <option value="">
                  Select a Service
                </option>

                <option value="AI Solutions">
                  AI Solutions
                </option>

                <option value="Business Automation">
                  Business Automation
                </option>

                <option value="Web Development">
                  Web Development
                </option>

                <option value="Mobile App Development">
                  Mobile App Development
                </option>

                <option value="Enterprise Software">
                  Enterprise Software
                </option>

                <option value="Consultation">
                  Consultation
                </option>

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

              <p className="mt-2 text-sm text-gray-500">
                Minimum 20 characters.
              </p>

            </div>

          </div>

          {success && (
            <div className="mt-6 rounded-lg bg-green-100 p-4 text-green-700">
              {success}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          <div className="mt-10 flex justify-center">

            <Button
              type="submit"
              size="lg"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Message"}
            </Button>

          </div>

        </form>

      </Container>
    </section>
  );
}