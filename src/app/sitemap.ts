import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const pages = ["", "/books"];

  return pages.flatMap((page) => {
    const languages = Object.fromEntries(
      locales.map((lang) => [lang, `${SITE_URL}/${lang}${page}`]),
    );

    return locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: {
          ...languages,
          "x-default": `${SITE_URL}/${routing.defaultLocale}${page}`,
        },
      },
    }));
  });
}
