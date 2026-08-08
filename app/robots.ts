import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://www.vrindaailabs.com/sitemap.xml",
    host: "https://www.vrindaailabs.com",
  };
}
