import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SITE_URL, OG_LOCALES } from "@/constants";
import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
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

  const description = t("books.metadata.description");
  const pageUrl = `${SITE_URL}/${locale}${path}${hasCategory ? `?category=${category}` : ""}`;

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
      url: isSearch ? undefined : pageUrl,
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

  const hasCategory = isValidCategory(category);
  const pageUrl = `${SITE_URL}/${locale}/books${hasCategory ? `?category=${category}` : ""}`;

  // Har bir kitob uchun ma'lumotlarni bir marta hisoblaymiz
  const resolvedBooks = filtered.map((book) => {
    const variant =
      book.variants.find((v) => v.language.startsWith(locale)) ||
      book.variants[0];
    const authorName = getAuthor(book.authorSlug)?.name ?? book.authorSlug;
    const bookTitle = getBookTitle(book, locale);
    const bookImage = variant.variantImage || book.images.cover;
    const finalPrice =
      variant.price.amount - (variant.price.discountAmount ?? 0);
    return { book, variant, authorName, bookTitle, bookImage, finalPrice };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl,
    numberOfItems: filtered.length,
    itemListElement: resolvedBooks
      .slice(0, 20)
      .map(({ book, variant, authorName, bookTitle, finalPrice }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Book",
          name: bookTitle,
          author: { "@type": "Person", name: authorName },
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
      })),
  };

  return (
    <main className="my-container py-10">
      {!search && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="grid grid-cols-4 gap-6">
        {resolvedBooks.map(
          (
            { book, variant, authorName, bookTitle, bookImage, finalPrice },
            index,
          ) => (
            <div key={book.id} className="relative">
              <Link href={`/books/${book.slug}/${variant.language}`}>
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
                {finalPrice.toLocaleString()} {variant.price.currency}
              </p>
              {variant.price.discountAmount && (
                <span className="line-through opacity-50">
                  {variant.price.amount.toLocaleString()}
                </span>
              )}
              <BookActions
                bookId={book.id}
                slug={book.slug}
                language={variant.language}
                variant="card"
              />
              {variant.stockCount === 0 && (
                <span className="text-red-500 text-xs block">Tugagan</span>
              )}
            </div>
          ),
        )}
      </div>
    </main>
  );
}
