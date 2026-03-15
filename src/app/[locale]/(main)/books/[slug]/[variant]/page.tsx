import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Image from "next/image";

import { type Locale, routing } from "@/i18n/routing";
import { books } from "@/data/books";
import { SITE_URL, OG_LOCALES } from "@/constants";
import { generateAlternates } from "@/lib/seo";
import { formatISBN } from "@/lib/formatters";
import { getBookTitle, getBookDescription } from "@/lib/book";
import { Link } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    books.flatMap((book) =>
      book.variants.map((variant) => ({
        locale,
        slug: book.slug,
        variant: variant.language,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string; variant: string }>;
}): Promise<Metadata> {
  const { locale, slug, variant: variantParam } = await params;

  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  const bookTitle = getBookTitle(book, locale, variantParam);
  const bookDescription = getBookDescription(book, locale);

  const activeVariant =
    book.variants.find((v) => v.language === variantParam) ||
    book.variants.find((v) => v.language.startsWith(locale)) ||
    book.variants[0];
  const displayImage = activeVariant.variantImage || book.mainCoverImage;

  const title = `${bookTitle} | sahif`;

  return {
    title,
    description: bookDescription,
    alternates: generateAlternates(locale, `books/${slug}`),
    openGraph: {
      title,
      description: bookDescription,
      url: `${SITE_URL}/${locale}/books/${slug}`,
      siteName: "sahif",
      locale: OG_LOCALES[locale],
      type: "article",
      images: [
        {
          url: `${SITE_URL}${displayImage}`,
          alt: bookTitle,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description: bookDescription,
      images: [`${SITE_URL}${displayImage}`],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string; variant: string }>;
}) {
  const { locale, slug, variant: variantParam } = await params;

  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  const activeVariant =
    book.variants.find((v) => v.language === variantParam) ||
    book.variants.find((v) => v.language.startsWith(locale)) ||
    book.variants[0];
  const displayImage = activeVariant.variantImage || book.mainCoverImage;
  const finalPrice =
    activeVariant.price.amount - (activeVariant.price.discountAmount ?? 0);

  const bookTitle = getBookTitle(book, locale, variantParam);
  const bookDescription = getBookDescription(book, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: bookTitle,
    image: `${SITE_URL}${displayImage}`,
    numberOfPages: activeVariant.pageCount,
    isbn: activeVariant.isbn,
    publisher: { "@type": "Organization", name: activeVariant.publisher },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="my-container py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Chap tomon: Rasm */}
          <div className="w-full md:w-80 shrink-0">
            <div className="relative aspect-3/4 w-full rounded-xl shadow-xl overflow-hidden border border-border">
              <Image
                src={displayImage}
                alt={bookTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
            </div>
          </div>

          {/* O'ng tomon: Ma'lumotlar */}
          <div className="flex-1">
            <h1 className="text-4xl font-black mb-2">{bookTitle}</h1>
            <p className="text-xl text-foreground/60 mb-6">{book.author}</p>

            {/* TILLARNI TANLASH */}
            <div className="mb-8">
              <p className="text-sm font-bold mb-3 opacity-50 uppercase tracking-widest">
                Nashr tili:
              </p>
              <div className="flex flex-wrap gap-3">
                {book.variants.map((variant) => (
                  <Link
                    key={variant.language}
                    href={`/books/${book.slug}/${variant.language}`}
                    className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                      variant.language === activeVariant.language
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-background border-border hover:border-primary/50"
                    } ${variant.stockCount === 0 ? "opacity-50 grayscale pointer-events-none" : ""}`}
                  >
                    {variant.language.toUpperCase()}
                    {variant.stockCount === 0 && " (Tugagan)"}
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-8 max-w-2xl">
              {bookDescription}
            </p>

            {/* Narxlar */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-primary">
                {finalPrice.toLocaleString()} {activeVariant.price.currency}
              </span>
              {activeVariant.price.discountAmount && (
                <span className="text-xl line-through text-foreground/40 italic">
                  {activeVariant.price.amount.toLocaleString()}
                </span>
              )}
            </div>

            {/* Texnik ma'lumotlar */}
            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-6 rounded-2xl border border-border">
              <div>
                <p className="text-xs text-foreground/50 uppercase">ISBN</p>
                <p className="font-mono font-medium">
                  {formatISBN(activeVariant.isbn)}
                </p>
              </div>
              <div>
                <p className="text-xs text-foreground/50 uppercase">
                  Nashriyot
                </p>
                <p className="font-medium">{activeVariant.publisher}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/50 uppercase">
                  Sahifalar
                </p>
                <p className="font-medium">{activeVariant.pageCount}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/50 uppercase">Muqova</p>
                <p className="font-medium capitalize">{activeVariant.format}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
