"use client";

import { useState } from "react";

import type {
  SiteSettings,
  SiteSettingsRequest,
} from "@/types/site-settings";

interface SettingsFormProps {

  initialData?: SiteSettings | null;

  onSubmit: (
    request: SiteSettingsRequest
  ) => Promise<void>;

}

export default function SettingsForm({

  initialData,

  onSubmit,

}: SettingsFormProps) {

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState<SiteSettingsRequest>({

      companyName:
        initialData?.companyName ?? "",

      tagline:
        initialData?.tagline ?? "",

      email:
        initialData?.email ?? "",

      phone:
        initialData?.phone ?? "",

      address:
        initialData?.address ?? "",

      website:
        initialData?.website ?? "",

      facebook:
        initialData?.facebook ?? "",

      linkedin:
        initialData?.linkedin ?? "",

      instagram:
        initialData?.instagram ?? "",

      youtube:
        initialData?.youtube ?? "",

      twitter:
        initialData?.twitter ?? "",

      logoUrl:
        initialData?.logoUrl ?? "",

      faviconUrl:
        initialData?.faviconUrl ?? "",

      heroTitle:
        initialData?.heroTitle ?? "",

      heroSubtitle:
        initialData?.heroSubtitle ?? "",

      heroButtonText:
        initialData?.heroButtonText ?? "",

      heroButtonUrl:
        initialData?.heroButtonUrl ?? "",

      footerDescription:
        initialData?.footerDescription ?? "",

      copyrightText:
        initialData?.copyrightText ?? "",

      seoTitle:
        initialData?.seoTitle ?? "",

      seoDescription:
        initialData?.seoDescription ?? "",

      seoKeywords:
        initialData?.seoKeywords ?? "",

      googleAnalyticsId:
        initialData?.googleAnalyticsId ?? "",

      googleTagManagerId:
        initialData?.googleTagManagerId ?? "",

      googleMapsUrl:
        initialData?.googleMapsUrl ?? "",

      active:
        initialData?.active ?? true,

    });

  function handleChange(

    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >

  ) {

    const { name, value } =
      e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value,

    }));

  }

  function handleCheckbox(

    e: React.ChangeEvent<HTMLInputElement>

  ) {

    setForm((prev) => ({

      ...prev,

      active: e.target.checked,

    }));

  }

  async function handleSubmit(

    e: React.FormEvent

  ) {

    e.preventDefault();

    setSaving(true);

    try {

      await onSubmit(form);

    } finally {

      setSaving(false);

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

      {/* Company */}

      <section className="rounded-xl border bg-white p-6">

        <h2 className="mb-6 text-xl font-bold">

          Company Information

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <Input
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
          />

          <Input
            label="Tagline"
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <TextArea
            label="Address"
            name="address"
            value={form.address}
            rows={3}
            onChange={handleChange}
          />

          <Input
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
          />

        </div>

      </section>

      {/* Social */}

      <section className="rounded-xl border bg-white p-6">

        <h2 className="mb-6 text-xl font-bold">

          Social Links

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <Input
            label="Facebook"
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
          />

          <Input
            label="LinkedIn"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
          />

          <Input
            label="Instagram"
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
          />

          <Input
            label="YouTube"
            name="youtube"
            value={form.youtube}
            onChange={handleChange}
          />

          <Input
            label="Twitter"
            name="twitter"
            value={form.twitter}
            onChange={handleChange}
          />

        </div>

      </section>

      {/* Branding */}

      <section className="rounded-xl border bg-white p-6">

        <h2 className="mb-6 text-xl font-bold">

          Branding

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <Input
            label="Logo URL"
            name="logoUrl"
            value={form.logoUrl}
            onChange={handleChange}
          />

          <Input
            label="Favicon URL"
            name="faviconUrl"
            value={form.faviconUrl}
            onChange={handleChange}
          />

        </div>

      </section>

      {/* Hero */}

      <section className="rounded-xl border bg-white p-6">

        <h2 className="mb-6 text-xl font-bold">

          Hero Section

        </h2>

        <Input
          label="Hero Title"
          name="heroTitle"
          value={form.heroTitle}
          onChange={handleChange}
        />

        <div className="mt-6">

          <TextArea
            label="Hero Subtitle"
            name="heroSubtitle"
            value={form.heroSubtitle}
            rows={4}
            onChange={handleChange}
          />

        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">

          <Input
            label="Button Text"
            name="heroButtonText"
            value={form.heroButtonText}
            onChange={handleChange}
          />

          <Input
            label="Button URL"
            name="heroButtonUrl"
            value={form.heroButtonUrl}
            onChange={handleChange}
          />

        </div>

      </section>

      {/* Footer */}

      <section className="rounded-xl border bg-white p-6">

        <h2 className="mb-6 text-xl font-bold">

          Footer

        </h2>

        <TextArea
          label="Footer Description"
          name="footerDescription"
          value={form.footerDescription}
          rows={4}
          onChange={handleChange}
        />

        <div className="mt-6">

          <Input
            label="Copyright"
            name="copyrightText"
            value={form.copyrightText}
            onChange={handleChange}
          />

        </div>

      </section>

      {/* SEO */}

      <section className="rounded-xl border bg-white p-6">

        <h2 className="mb-6 text-xl font-bold">

          SEO

        </h2>

        <Input
          label="SEO Title"
          name="seoTitle"
          value={form.seoTitle}
          onChange={handleChange}
        />

        <div className="mt-6">

          <TextArea
            label="SEO Description"
            name="seoDescription"
            value={form.seoDescription}
            rows={3}
            onChange={handleChange}
          />

        </div>

        <div className="mt-6">

          <Input
            label="SEO Keywords"
            name="seoKeywords"
            value={form.seoKeywords}
            onChange={handleChange}
          />

        </div>

      </section>

      {/* Analytics */}

      <section className="rounded-xl border bg-white p-6">

        <h2 className="mb-6 text-xl font-bold">

          Analytics

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <Input
            label="Google Analytics ID"
            name="googleAnalyticsId"
            value={form.googleAnalyticsId}
            onChange={handleChange}
          />

          <Input
            label="Google Tag Manager ID"
            name="googleTagManagerId"
            value={form.googleTagManagerId}
            onChange={handleChange}
          />

        </div>

      </section>

      {/* Maps */}

      <section className="rounded-xl border bg-white p-6">

        <h2 className="mb-6 text-xl font-bold">

          Google Maps

        </h2>

        <TextArea
          label="Google Maps URL"
          name="googleMapsUrl"
          value={form.googleMapsUrl}
          rows={3}
          onChange={handleChange}
        />

      </section>

      <div className="flex items-center gap-3">

        <input

          id="active"

          type="checkbox"

          checked={form.active}

          onChange={handleCheckbox}

        />

        <label htmlFor="active">

          Website Active

        </label>

      </div>

      <button

        type="submit"

        disabled={saving}

        className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"

      >

        {saving
          ? "Saving..."
          : "Save Settings"}

      </button>

    </form>

  );

}

interface InputProps {

  label: string;

  name: string;

  value: string;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

}

function Input({

  label,

  name,

  value,

  onChange,

}: InputProps) {

  return (

    <div>

      <label className="mb-2 block font-medium">

        {label}

      </label>

      <input

        name={name}

        value={value}

        onChange={onChange}

        className="w-full rounded-lg border px-4 py-3"

      />

    </div>

  );

}

interface TextAreaProps {

  label: string;

  name: string;

  value: string;

  rows: number;

  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;

}

function TextArea({

  label,

  name,

  value,

  rows,

  onChange,

}: TextAreaProps) {

  return (

    <div>

      <label className="mb-2 block font-medium">

        {label}

      </label>

      <textarea

        name={name}

        value={value}

        rows={rows}

        onChange={onChange}

        className="w-full rounded-lg border px-4 py-3"

      />

    </div>

  );

}