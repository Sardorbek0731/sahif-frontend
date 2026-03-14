import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { type Locale, routing } from "@/i18n/routing";
import { books } from "@/data/books";
import { SITE_URL, OG_LOCALES } from "@/constants";
import { generateAlternates } from "@/lib/seo";
import { formatISBN } from "@/lib/formatters";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    books.map((book) => ({ locale, slug: book.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  const t = await getTranslations({ locale });
  const title = `${book.title} | sahif`;
  const description = t("description");

  return {
    title,
    description,
    alternates: generateAlternates(locale, `books/${slug}`),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/books/${slug}`,
      siteName: "sahif",
      locale: OG_LOCALES[locale],
      type: "website",
      images: [
        {
          url: `${SITE_URL}${book.images.cover}`,
          alt: book.title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`${SITE_URL}${book.images.cover}`],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    image: `${SITE_URL}${book.images.cover}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: book.stats.rating,
      reviewCount: book.stats.reviewCount,
    },
    datePublished: String(book.details.publishedYear),
    inLanguage: book.details.language[0],
    author: { "@type": "Person", name: book.author },
    ...(book.details.isbn && { isbn: String(book.details.isbn) }),
    numberOfPages: book.details.pageCount,
    ...(book.details.publisher && {
      publisher: { "@type": "Organization", name: book.details.publisher },
    }),
    ...(book.translator && {
      translator: { "@type": "Person", name: book.translator },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="my-container py-10">
        <div className="flex gap-10">
          <div className="w-64 shrink-0">
            <div className="relative aspect-3/4 w-full rounded-lg overflow-hidden">
              <Image
                src={book.images.cover}
                alt={book.title}
                fill
                className="object-cover"
                priority
                sizes="256px"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-foreground/70 mb-6">{book.author}</p>
            <p className="mb-8">{book.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-primary">
                {(
                  book.price.amount - (book.price.discountAmount ?? 0)
                ).toLocaleString()}{" "}
                {book.price.currency}
              </span>
              {book.price.discountAmount != null && (
                <span className="line-through text-foreground/50">
                  {book.price.amount.toLocaleString()} {book.price.currency}
                </span>
              )}
            </div>

            <div className="bg-card rounded-lg p-6 space-y-3">
              <p>
                <span className="text-foreground/50">Pages:</span>{" "}
                {book.details.pageCount}
              </p>
              <p>
                <span className="text-foreground/50">Published:</span>{" "}
                {book.details.publishedYear}
              </p>
              {book.details.publisher && (
                <p>
                  <span className="text-foreground/50">Publisher:</span>{" "}
                  {book.details.publisher}
                </p>
              )}
              <p>
                <span className="text-foreground/50">Format:</span>{" "}
                {book.details.format}
              </p>
              {book.translator && (
                <p>
                  <span className="text-foreground/50">Translator:</span>{" "}
                  {book.translator}
                </p>
              )}
              {book.details.isbn && (
                <p>
                  <span className="text-foreground/50">ISBN:</span>{" "}
                  {formatISBN(book.details.isbn)}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
