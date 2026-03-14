import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { SITE_URL, OG_LOCALES } from "@/constants";
import { type Locale, Link } from "@/i18n/routing";
import { generateAlternates } from "@/lib/seo";

import { books } from "@/data/books";
import { type CategorySlug } from "@/data/categories";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string; search?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { category, search } = await searchParams;

  const t = await getTranslations({ locale });
  const tCategories = await getTranslations({
    locale,
    namespace: "categories",
  });

  let pageTitle = t("pages.books");
  if (search) pageTitle = search;
  else if (category) {
    try {
      pageTitle = tCategories(`items.${category}.name`);
    } catch {
      pageTitle = t("pages.books");
    }
  }
  const title = `${pageTitle} | sahif`;
  const description = t("description");

  const query = new URLSearchParams();
  if (search) query.set("search", search);
  else if (category) query.set("category", category);
  const queryString = query.toString();
  const url = `${SITE_URL}/${locale}/books${queryString ? `?${queryString}` : ""}`;

  return {
    title,
    description,
    alternates: generateAlternates(locale, "books", url),
    robots: {
      index: !search,
      follow: true,
      googleBot: {
        index: !search,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "sahif",
      locale: OG_LOCALES[locale] ?? locale,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
          alt: "sahif logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  const filtered = books.filter((book) => {
    if (search) {
      return (
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      return book.categorySlugs.includes(category as CategorySlug);
    }
    return true;
  });

  return (
    <main className="my-container py-10">
      <div className="grid grid-cols-4 gap-6">
        {filtered.map((book) => (
          <Link key={book.id} href={`/books/${book.slug}`}>
            <div className="bg-card p-4 rounded-lg hover:bg-card-hover transition-all">
              <h2 className="font-bold">{book.title}</h2>
              <p className="text-foreground/70">{book.author}</p>
              <p className="text-primary mt-2">
                {book.price.amount.toLocaleString()} {book.price.currency}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
