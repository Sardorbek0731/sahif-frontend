import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sahif.vercel.app";
  const locales = ["uz", "ru", "en"];
  const pages = ["", "/books"];

  return locales.flatMap((locale) =>
    pages.map((page) => {
      const languages = locales.reduce(
        (acc, lang) => {
          acc[lang] = `${baseUrl}/${lang}${page}`;
          return acc;
        },
        {} as Record<string, string>,
      );

      return {
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${baseUrl}/uz${page}`,
          },
        },
      };
    }),
  );
}
