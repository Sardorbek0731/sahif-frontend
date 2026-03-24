import type { MetadataRoute } from "next";
import { SITE_URL, HREFLANG_LOCALES } from "@/constants";
import { routing } from "@/i18n/routing";
import { books } from "@/data/books";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const staticPages = ["", "/books"];
  const bookPages = books.flatMap((book) =>
    book.variants.map((variant) => `/books/${book.slug}/${variant.language}`),
  );
  const pages = [...staticPages, ...bookPages];

  const bookCreatedAtMap = new Map(
    books.flatMap((b) =>
      b.variants.map((v) => [`/books/${b.slug}/${v.language}`, b.createdAt]),
    ),
  );
  const now = new Date();

  const getUrl = (locale: string, page: string) => {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    return `${SITE_URL}${prefix}${page}`;
  };

  return pages.flatMap((page) => {
    const bookCreatedAt = bookCreatedAtMap.get(page);

    const languages = Object.fromEntries(
      locales.map((lang) => [HREFLANG_LOCALES[lang], getUrl(lang, page)]),
    );

    return locales.map((locale) => ({
      url: getUrl(locale, page),
      lastModified: bookCreatedAt ? new Date(bookCreatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : page === "/books" ? 0.9 : 0.7,
      alternates: {
        languages: {
          ...languages,
          "x-default": getUrl(routing.defaultLocale, page),
        },
      },
    }));
  });
}
