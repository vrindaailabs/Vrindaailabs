import type { SiteSettings } from "@/types/site-settings";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080/api";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/settings`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to load site settings: ${response.status}`
      );

      return null;
    }

    const result: {
      success: boolean;
      message: string;
      data: SiteSettings;
    } = await response.json();

    if (!result.success || !result.data) {
      return null;
    }

    return result.data;

  } catch (error) {

    console.error(
      "Failed to load site settings:",
      error
    );

    return null;
  }
}