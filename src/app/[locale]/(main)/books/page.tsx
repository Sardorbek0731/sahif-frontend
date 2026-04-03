import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SITE_URL, OG_LOCALES, SITE_NAME } from "@/constants";
import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { generateAlternates } from "@/lib/seo";
import { getAuthor } from "@/lib/author";
import { getBookTitle } from "@/lib/book";
import { type BookFormat } from "@/types/book";
import { books } from "@/data/books";
import { isValidCategory } from "@/data/categories";

import BookActions from "@/components/shared/BookActions";
import BooksFilter from "@/components/books/BooksFilter";

const BOOK_FORMATS: BookFormat[] = ["hardcover", "paperback", "ebook", "audio"];

type SearchParams = {
  category?: string;
  search?: string;
  format?: string;
  lang?: string;
  price?: string;
  inStock?: string;
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { category, search } = await searchParams;
  const t = await getTranslations({ locale });

  let title = t("pages.books");
  if (search) title = search;
  else if (isValidCategory(category)) {
    const tCat = await getTranslations({ locale, namespace: "categories" });
    title = tCat(`items.${category}.name`);
  }

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
      title: `${title} | ${SITE_NAME}`,
      description,
      url: isSearch ? undefined : pageUrl,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: `${SITE_NAME} logo`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ["/logo.png"],
    },
  };
}

export default async function Books({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const { category, search, format, lang, price, inStock } = await searchParams;

  const activeFormat = BOOK_FORMATS.includes(format as BookFormat)
    ? (format as BookFormat)
    : null;
  const activeLang = lang ?? null;
  const activeInStock = inStock === "true";

  const [minPrice, maxPrice] = (() => {
    if (!price) return [null, null];
    if (price === "200000+") return [200000, null];
    const [min, max] = price.split("-").map(Number);
    return [min, max];
  })();

  const filtered = books.filter((book) => {
    if (search) {
      const q = search.toLowerCase();
      const currentTitle = getBookTitle(book, locale).toLowerCase();
      const author = getAuthor(book.authorSlug);
      const authorName = author?.name ?? book.authorSlug;
      const matchesSearch =
        currentTitle.includes(q) ||
        book.originalTitle.toLowerCase().includes(q) ||
        authorName.toLowerCase().includes(q) ||
        book.variants.some((v) => v.isbn.includes(q)) ||
        book.variants.some((v) => v.titleInLanguage?.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    if (isValidCategory(category) && !book.categorySlugs.includes(category)) {
      return false;
    }

    const matchingVariants = book.variants.filter((v) => {
      if (activeFormat && v.format !== activeFormat) return false;
      if (activeLang && v.language !== activeLang) return false;
      if (activeInStock && v.stockCount === 0) return false;
      const finalPrice = v.price.amount - (v.price.discountAmount ?? 0);
      if (minPrice !== null && finalPrice < minPrice) return false;
      if (maxPrice !== null && finalPrice > maxPrice) return false;
      return true;
    });

    return matchingVariants.length > 0;
  });

  const hasCategory = isValidCategory(category);
  const pageUrl = `${SITE_URL}/${locale}/books${hasCategory ? `?category=${category}` : ""}`;

  const resolvedBooks = filtered.map((book) => {
    const variant = (() => {
      // 1. Ikkalasi bor — ikkala shartga mos
      if (activeLang && activeFormat) {
        return (
          book.variants.find(
            (v) => v.language === activeLang && v.format === activeFormat,
          ) ||
          book.variants.find((v) => v.language === activeLang) ||
          book.variants[0]
        );
      }

      // 2. Faqat til filtri
      if (activeLang) {
        return (
          book.variants.find((v) => v.language === activeLang) ||
          book.variants[0]
        );
      }

      // 3. Faqat format filtri — locale'ga mos + format, bo'lmasa faqat format
      if (activeFormat) {
        return (
          book.variants.find(
            (v) => v.language.startsWith(locale) && v.format === activeFormat,
          ) ||
          book.variants.find((v) => v.format === activeFormat) ||
          book.variants.find((v) => v.language.startsWith(locale)) ||
          book.variants[0]
        );
      }

      // 4. Filter yo'q — locale'ga mos
      return (
        book.variants.find((v) => v.language.startsWith(locale)) ||
        book.variants[0]
      );
    })();
    const authorName = getAuthor(book.authorSlug)?.name ?? book.authorSlug;
    const bookTitle = getBookTitle(book, locale, variant.language);
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
    <main className="my-container flex mb-4">
      {!search && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <BooksFilter
        activeCategory={hasCategory ? category : undefined}
        activeFormat={activeFormat ?? undefined}
        activeLang={activeLang ?? undefined}
        activePrice={price}
        activeInStock={activeInStock}
      />

      <div className="flex-1 grid grid-cols-4 gap-4">
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
                  width={150}
                  height={250}
                  className="h-auto"
                  priority={index < 4}
                />
                <h2>{bookTitle}</h2>
              </Link>
              <Link
                href={`/authors/${book.authorSlug}`}
                className="hover:text-primary transition-all"
              >
                {authorName}
              </Link>
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
                isOutOfStock={variant.stockCount === 0}
              />
            </div>
          ),
        )}
      </div>
    </main>
  );
}
