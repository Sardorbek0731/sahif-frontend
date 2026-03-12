import { MetadataRoute } from "next";
import { SITE_URL } from "@/constants";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const pages = ["", "/books"];

  return locales.flatMap((locale) =>
    pages.map((page) => {
      const languages = locales.reduce(
        (acc, lang) => {
          acc[lang] = `${SITE_URL}/${lang}${page}`;
          return acc;
        },
        {} as Record<string, string>,
      );

      return {
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${SITE_URL}/uz${page}`,
          },
        },
      };
    }),
  );
}
