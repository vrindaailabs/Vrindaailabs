export interface SiteSettings {

  id: number;

  companyName: string;

  tagline: string;

  email: string;

  phone: string;

  address: string;

  website: string;

  facebook: string;

  linkedin: string;

  instagram: string;

  youtube: string;

  twitter: string;

  logoUrl: string;

  faviconUrl: string;

  heroTitle: string;

  heroSubtitle: string;

  heroButtonText: string;

  heroButtonUrl: string;

  footerDescription: string;

  copyrightText: string;

  seoTitle: string;

  seoDescription: string;

  seoKeywords: string;

  googleAnalyticsId: string;

  googleTagManagerId: string;

  googleMapsUrl: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;

}

export interface SiteSettingsRequest {

  companyName: string;

  tagline: string;

  email: string;

  phone: string;

  address: string;

  website: string;

  facebook: string;

  linkedin: string;

  instagram: string;

  youtube: string;

  twitter: string;

  logoUrl: string;

  faviconUrl: string;

  heroTitle: string;

  heroSubtitle: string;

  heroButtonText: string;

  heroButtonUrl: string;

  footerDescription: string;

  copyrightText: string;

  seoTitle: string;

  seoDescription: string;

  seoKeywords: string;

  googleAnalyticsId: string;

  googleTagManagerId: string;

  googleMapsUrl: string;

  active: boolean;

}

export interface SiteSettingsResponse {

  success: boolean;

  message: string;

  data: SiteSettings;

}