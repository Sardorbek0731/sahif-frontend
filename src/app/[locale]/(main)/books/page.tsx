import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SITE_URL, OG_LOCALES } from "@/constants";
import { type Locale, Link } from "@/i18n/routing";
import { generateAlternates } from "@/lib/seo";

import { books } from "@/data/books";
import { isValidCategory } from "@/data/categories";
import { getAuthor } from "@/lib/author";
import { getBookTitle } from "@/lib/book";

import BookActions from "@/components/shared/BookActions";

// ─── Metadata ────────────────────────────────────────────────────────────────

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

  // Sarlavhani aniqlash
  let title = t("pages.books");
  if (search) title = search;
  else if (isValidCategory(category)) {
    const tCat = await getTranslations({ locale, namespace: "categories" });
    title = tCat(`items.${category}.name`);
  }

  // URL yasash (Parametrlar bilan)
  const isSearch = !!search;
  const hasCategory = isValidCategory(category);
  const path = "/books";
  const paramsObj = hasCategory ? { category } : undefined;

  // Canonical URL (search bo'lsa noindex)
  const canonicalUrl = isSearch
    ? undefined
    : `${SITE_URL}/${locale}${path}${hasCategory ? `?category=${category}` : ""}`;

  const description = t("books.metadata.description");

  return {
    title,
    description,

    alternates: generateAlternates(locale, path, paramsObj),

    robots: {
      index: !search,
      follow: true,
      googleBot: {
        index: !search,
        follow: true,
      },
    },

    openGraph: {
      title: `${title} | sahif`,
      description,
      url: canonicalUrl || `${SITE_URL}/${locale}${path}`,
      siteName: "sahif",
      locale: OG_LOCALES[locale],
      type: "website",
      images: [
        {
          url: "/logo.png", // metadataBase bilan to'liq URL ga aylanadi
          width: 512,
          height: 512,
          alt: "sahif logo",
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary",
      title: `${title} | sahif`,
      description,
      images: ["/logo.png"],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
        book.originalTitle.toLowerCase().includes(q) ||
        authorName.toLowerCase().includes(q) ||
        book.variants.some((v) => v.isbn.includes(q))
      );
    }

    if (isValidCategory(category)) {
      return book.categorySlugs.includes(category);
    }

    return true;
  });

  // JSON-LD uchun sahifa sarlavhasi (metadata dan alohida hisoblash shart emas)
  const hasCategory = isValidCategory(category);
  const pageUrl = `${SITE_URL}/${locale}/books${hasCategory ? `?category=${category}` : ""}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl,
    numberOfItems: filtered.length,
    itemListElement: filtered.slice(0, 20).map((book, index) => {
      const variant =
        book.variants.find((v) => v.language.startsWith(locale)) ||
        book.variants[0];
      const finalPrice =
        variant.price.amount - (variant.price.discountAmount ?? 0);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Book",
          name: getBookTitle(book, locale),
          author: {
            "@type": "Person",
            name: getAuthor(book.authorSlug)?.name ?? book.authorSlug,
          },
          url: `${SITE_URL}/${locale}/books/${book.slug}/${variant.language}`,
          image: `${SITE_URL}${book.images.cover}`,
          offers: {
            "@type": "Offer",
            price: finalPrice,
            priceCurrency: variant.price.currency,
            availability:
              variant.stockCount === 0
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
          },
        },
      };
    }),
  };

  return (
    <main className="my-container py-10">
      {/* JSON-LD — faqat real sahifalarda, search da emas */}
      {!search && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="grid grid-cols-4 gap-6">
        {filtered.map((book, index) => {
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
              <Link href={`/books/${book.slug}/${activeVariant.language}`}>
                <Image
                  src={bookImage}
                  alt={bookTitle}
                  width={200}
                  height={300}
                  className="h-auto"
                  priority={index < 4}
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
