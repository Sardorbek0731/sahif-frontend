import type { MetadataRoute } from "next";
import { SITE_URL, HREFLANG_LOCALES } from "@/constants";
import { routing } from "@/i18n/routing";
import { books } from "@/data/books";
import { authors } from "@/data/authors";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  const staticPaths = ["", "/books", "/authors"];
  const bookPaths = books.flatMap((book) =>
    book.variants.map((v) => `/books/${book.slug}/${v.language}`),
  );
  const authorPaths = authors.map((author) => `/authors/${author.slug}`);

  const allPaths = [...staticPaths, ...bookPaths, ...authorPaths];

  const staticLastModified = new Date();

  return allPaths.flatMap((path) => {
    return locales.map((locale) => {
      const url = `${SITE_URL}/${locale}${path}`;

      const languages = Object.fromEntries(
        locales.map((l) => [HREFLANG_LOCALES[l], `${SITE_URL}/${l}${path}`]),
      );

      let priority = 0.7;
      let changeFrequency: "daily" | "weekly" | "monthly" = "monthly";
      let lastModified: Date = staticLastModified;

      if (path === "") {
        priority = 1.0;
        changeFrequency = "daily";
      } else if (path === "/books") {
        priority = 0.9;
        changeFrequency = "weekly";
      } else if (path === "/authors") {
        priority = 0.8;
        changeFrequency = "monthly";
      } else if (path.startsWith("/books/")) {
        priority = 0.8;
        changeFrequency = "monthly";
        const slug = path.split("/")[2];
        const book = books.find((b) => b.slug === slug);
        if (book) lastModified = new Date(book.createdAt);
      } else if (path.startsWith("/authors/")) {
        priority = 0.7;
        changeFrequency = "monthly";
      }

      return {
        url,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`,
          },
        },
      };
    });
  });
}
