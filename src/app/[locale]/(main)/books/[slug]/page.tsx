import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { books } from "@/data/books";
import { SITE_URL, OG_LOCALES } from "@/constants";
import { generateAlternates } from "@/lib/seo";
import { formatISBN } from "@/lib/formatters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) return {};

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

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  return (
    <main className="my-container py-10">
      <div className="flex gap-10">
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
            {book.price.discountAmount && (
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
            <p>
              <span className="text-foreground/50">Publisher:</span>{" "}
              {book.details.publisher}
            </p>
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
  );
}
