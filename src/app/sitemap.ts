import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sahif.vercel.app";
  const locales = ["uz", "ru", "en"];

  const routes = ["", "/books"];

  const sitemapEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );

  return sitemapEntries;
}
