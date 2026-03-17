import type { MetadataRoute } from "next";

import { SITE_URL, HREFLANG_LOCALES } from "@/constants";
import { routing } from "@/i18n/routing";

import { books } from "@/data/books";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const staticPages = ["", "/books"];
  const bookPages = books.map((book) => `/books/${book.slug}`);
  const pages = [...staticPages, ...bookPages];

  const bookCreatedAtMap = new Map(
    books.map((b) => [`/books/${b.slug}`, b.createdAt]),
  );
  const now = new Date();

  return pages.flatMap((page) => {
    const bookCreatedAt = bookCreatedAtMap.get(page);

    const languages = Object.fromEntries(
      locales.map((lang) => [
        HREFLANG_LOCALES[lang],
        `${SITE_URL}/${lang}${page}`,
      ]),
    );

    return locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: bookCreatedAt ? new Date(bookCreatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : page === "/books" ? 0.8 : 0.6,
      alternates: {
        languages: {
          ...languages,
          "x-default": `${SITE_URL}/${routing.defaultLocale}${page}`,
        },
      },
    }));
  });
}
