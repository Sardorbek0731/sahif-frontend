import type { MetadataRoute } from "next";
import { SITE_URL, HREFLANG_LOCALES } from "@/constants";
import { routing } from "@/i18n/routing";
import { books } from "@/data/books";
import { authors } from "@/data/authors";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  const staticPaths = ["", "/books"];
  const bookPaths = books.flatMap((book) =>
    book.variants.map((v) => `/books/${book.slug}/${v.language}`),
  );
  const authorPaths = authors.map((author) => `/authors/${author.slug}`);

  const allPaths = [...staticPaths, ...bookPaths, ...authorPaths];

  return allPaths.flatMap((path) => {
    return locales.map((locale) => {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      const url = `${SITE_URL}${prefix}${path}`;

      const languages = Object.fromEntries(
        locales.map((l) => {
          const lPrefix = l === routing.defaultLocale ? "" : `/${l}`;
          return [HREFLANG_LOCALES[l], `${SITE_URL}${lPrefix}${path}`];
        }),
      );

      let priority = 0.7;
      if (path === "") priority = 1.0;
      else if (path === "/books") priority = 0.9;
      else if (path.startsWith("/authors")) priority = 0.8;

      return {
        url,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${SITE_URL}${path}`,
          },
        },
      };
    });
  });
}
