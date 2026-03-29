import type { Metadata } from "next";

import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SITE_URL, OG_LOCALES } from "@/constants";
import { type Locale, Link } from "@/i18n/routing";
import { generateAlternates, getLocaleUrl } from "@/lib/seo";

import { books } from "@/data/books";
import { isValidCategory } from "@/data/categories";
import { getAuthor } from "@/lib/author";
import { getBookTitle } from "@/lib/book";

import BookActions from "@/components/shared/BookActions";

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
  const tCategories = category
    ? await getTranslations({ locale, namespace: "categories" })
    : null;

  let pageTitle = t("pages.books");
  if (search) pageTitle = search;
  else if (category) {
    if (isValidCategory(category)) {
      pageTitle = tCategories!(`items.${category}.name`);
    }
  }
  const title = `${pageTitle} | sahif`;
  const description = t("books.metadata.description");

  const query = new URLSearchParams();
  if (search) query.set("search", search);
  else if (category) query.set("category", category);
  const queryString = query.toString();
  const url = `${getLocaleUrl(locale, "/books")}${queryString ? `?${queryString}` : ""}`;

  return {
    title,
    description,
    alternates: generateAlternates(locale, "/books", search ? undefined : url),
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
      locale: OG_LOCALES[locale],
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
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { locale } = await params;
  const { category, search } = await searchParams;

  const filtered = books.filter((book) => {
    if (search) {
      const q = search.toLowerCase();
      const currentTitle = getBookTitle(book, locale).toLowerCase();
      const author = getAuthor(book.authorSlug);
      const authorName = author?.name ?? book.authorSlug;

      return (
        currentTitle.includes(q) ||
        (book.originalTitle?.toLowerCase().includes(q) ?? false) ||
        authorName.toLowerCase().includes(q) ||
        book.variants.some((v) => v.isbn.includes(q))
      );
    }

    if (isValidCategory(category)) {
      return book.categorySlugs.includes(category);
    }
    return true;
  });

  return (
    <main className="my-container py-10">
      <div className="grid grid-cols-4 gap-6">
        {filtered.map((book) => {
          const bookTitle = getBookTitle(book, locale);
          const author = getAuthor(book.authorSlug);
          const authorName = author?.name ?? book.authorSlug;
          const activeVariant =
            book.variants.find((v) => v.language.startsWith(locale)) ||
            book.variants[0];
          const finalPrice =
            activeVariant.price.amount -
            (activeVariant.price.discountAmount ?? 0);
          const bookImage = activeVariant.variantImage || book.images.cover;

          return (
            <div key={book.id} className="relative">
              <Link
                key={book.id}
                href={`/books/${book.slug}/${activeVariant.language}`}
              >
                <Image
                  src={bookImage}
                  alt={bookTitle}
                  width={200}
                  height={300}
                  className="h-auto"
                />
                <h2>{bookTitle}</h2>
              </Link>
              <p>{authorName}</p>
              <p>
                {finalPrice.toLocaleString()} {activeVariant.price.currency}
              </p>
              {activeVariant.price.discountAmount && (
                <span className="line-through opacity-50">
                  {activeVariant.price.amount.toLocaleString()}
                </span>
              )}
              <BookActions
                bookId={book.id}
                slug={book.slug}
                language={activeVariant.language}
                variant="card"
              />
              {activeVariant.stockCount === 0 && (
                <span className="text-red-500 text-xs block">Tugagan</span>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
