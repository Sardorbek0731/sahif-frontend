import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { SITE_URL, OG_LOCALES, SITE_NAME } from "@/constants";
import { type Locale, routing } from "@/i18n/routing";
import { generateAlternates, LOGO_OG_IMAGE } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { authors } from "@/data/authors";
import { getBookTitle } from "@/lib/book";
import { getBooksByAuthor } from "@/lib/author";
import BookCard from "@/components/books/BookCard";
import AuthorAvatar from "@/components/shared/AuthorAvatar";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    authors.map((author) => ({ locale, slug: author.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const author = authors.find((a) => a.slug === slug);
  if (!author) notFound();

  const description = author.bio[locale];

  return {
    title: author.name,
    description,
    alternates: generateAlternates(locale, `/authors/${slug}`),
    openGraph: {
      title: `${author.name} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${locale}/authors/${slug}`,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      type: "profile",
      images: author.image
        ? [{ url: author.image, width: 400, height: 400, alt: author.name }]
        : [LOGO_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: `${author.name} | ${SITE_NAME}`,
      description,
      images: author.image ? [author.image] : [LOGO_OG_IMAGE.url],
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  const author = authors.find((a) => a.slug === slug);
  if (!author) notFound();

  const t = await getTranslations({ locale, namespace: "authors" });

  const authorBooks = getBooksByAuthor(slug);

  const resolvedBooks = authorBooks.map((book) => {
    const variant =
      book.variants.find((v) => v.language.startsWith(locale)) ??
      book.variants[0];
    return {
      book,
      variant,
      authorName: author.name,
      bookTitle: getBookTitle(book, locale),
      bookImage: variant.variantImage || book.images.cover,
      finalPrice: variant.price.amount - (variant.price.discountAmount ?? 0),
    };
  });

  return (
    <main className="my-container py-6">
      <Link
        href="/authors"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        ← {t("backToAuthors")}
      </Link>

      <div className="flex items-start gap-8 mb-10">
        <div className="shrink-0 border-2 border-border rounded-full">
          <AuthorAvatar name={author.name} image={author.image} size={144} />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">{author.name}</h1>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {t("bio")}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {author.bio[locale]}
          </p>
        </div>
      </div>

      <div>
        <div className="row-between mb-4">
          <h2 className="text-xl font-bold">
            {t("allBooks")}
            <span className="text-base font-normal text-muted-foreground ml-2">
              ({resolvedBooks.length})
            </span>
          </h2>
        </div>

        {resolvedBooks.length === 0 ? (
          <p className="text-muted-foreground py-10 text-center">
            {t("noBooks")}
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {resolvedBooks.map(
              (
                { book, variant, authorName, bookTitle, bookImage, finalPrice },
                index,
              ) => (
                <BookCard
                  key={book.id}
                  book={book}
                  variant={variant}
                  authorName={authorName}
                  bookTitle={bookTitle}
                  bookImage={bookImage}
                  finalPrice={finalPrice}
                  preload={index < 5}
                />
              ),
            )}
          </div>
        )}
      </div>
    </main>
  );
}
