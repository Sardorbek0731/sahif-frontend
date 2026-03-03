import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sahif.vercel.app";
  const locales = ["uz", "ru", "en"];
  const routes = ["", "/books"];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          uz: `${baseUrl}/uz${route}`,
          ru: `${baseUrl}/ru${route}`,
          en: `${baseUrl}/en${route}`,
        },
      },
    })),
  );
}
