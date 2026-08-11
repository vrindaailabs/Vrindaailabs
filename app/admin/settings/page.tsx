"use client";

import { useEffect, useState } from "react";

import SettingsForm from "@/components/admin/settings/SettingsForm";

import { siteSettingsService } from "@/services/site-settings.service";

import type {
  SiteSettings,
  SiteSettingsRequest,
} from "@/types/site-settings";

export default function SettingsPage() {

  const [loading, setLoading] =
    useState(true);

  const [settings, setSettings] =
    useState<SiteSettings | null>(null);

  useEffect(() => {

    let cancelled = false;

    async function loadSettings() {

      try {

        const response =
          await siteSettingsService.get();

        if (!cancelled) {

          setSettings(response.data);

        }

      } catch (error) {

        console.error(error);

      } finally {

        if (!cancelled) {

          setLoading(false);

        }

      }

    }

    loadSettings();

    return () => {

      cancelled = true;

    };

  }, []);

  async function handleSubmit(
    request: SiteSettingsRequest
  ) {

    try {

      if (settings) {

        const response =
          await siteSettingsService.update(
            settings.id,
            request
          );

        setSettings(response.data);

      } else {

        const response =
          await siteSettingsService.create(
            request
          );

        setSettings(response.data);

      }

      alert("Website settings saved successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to save website settings.");

    }

  }

  if (loading) {

    return (

      <div className="flex justify-center p-10">

        Loading Website Settings...

      </div>

    );

  }

  return (

    <div className="space-y-8 p-8">

      <div>

        <h1 className="text-3xl font-bold">

          Website Settings

        </h1>

        <p className="mt-2 text-gray-500">

          Manage company information, branding,
          SEO, social media, homepage and footer.

        </p>

      </div>

      <SettingsForm

        initialData={settings}

        onSubmit={handleSubmit}

      />

    </div>

  );

}