import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SITE_URL, OG_LOCALES, SITE_NAME } from "@/constants";
import { type Locale } from "@/i18n/routing";
import { generateAlternates } from "@/lib/seo";
import { getAuthor } from "@/lib/author";
import { getBookTitle } from "@/lib/book";
import { type BookFormat, BOOK_FORMATS } from "@/types/book";
import { books } from "@/data/books";
import { isValidCategory } from "@/data/categories";

import BooksFilter from "@/components/books/BooksFilter";
import BookCard from "@/components/books/BookCard";

type SearchParams = {
  category?: string;
  search?: string;
  format?: string;
  lang?: string;
  price?: string;
  inStock?: string;
  author?: string;
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

  const firstCategory = category?.split(",")[0];
  let title = t("pages.books");
  if (search) title = search;
  else if (isValidCategory(firstCategory)) {
    const tCat = await getTranslations({ locale, namespace: "categories" });
    title = tCat(`items.${firstCategory}.name`);
  }

  const isSearch = !!search;
  const hasCategory = isValidCategory(firstCategory);
  const path = "/books";
  const paramsObj = hasCategory ? { category: firstCategory } : undefined;
  const pageUrl = `${SITE_URL}/${locale}${path}${hasCategory ? `?category=${firstCategory}` : ""}`;
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
  const {
    category,
    search,
    format,
    lang,
    price,
    inStock,
    author: authorParam,
  } = await searchParams;

  const activeFormats = format
    ? (format
        .split(",")
        .filter((f) => BOOK_FORMATS.includes(f as BookFormat)) as BookFormat[])
    : [];
  const activeLangs = lang ? lang.split(",").filter(Boolean) : [];
  const activeAuthors = authorParam
    ? authorParam.split(",").filter(Boolean)
    : [];
  const activeCategories = category
    ? category.split(",").filter(isValidCategory)
    : [];
  const activeInStock = inStock === "true";

  const [minPrice, maxPrice] = (() => {
    if (!price) return [null, null];
    if (price.endsWith("+")) return [parseInt(price), null];
    const [min, max] = price.split("-").map(Number);
    return [isNaN(min) ? null : min, isNaN(max) ? null : max];
  })();

  const matchesVariantFilters = (v: (typeof books)[0]["variants"][0]) => {
    if (activeLangs.length && !activeLangs.includes(v.language)) return false;
    if (activeFormats.length && !activeFormats.includes(v.format)) return false;
    if (activeInStock && v.stockCount === 0) return false;
    const fp = v.price.amount - (v.price.discountAmount ?? 0);
    if (minPrice !== null && fp < minPrice) return false;
    if (maxPrice !== null && fp > maxPrice) return false;
    return true;
  };

  const matchesVariantSearch = (
    v: (typeof books)[0]["variants"][0],
    q: string,
  ) =>
    v.titleInLanguage?.toLowerCase().includes(q) || v.isbn.includes(q) || false;

  const filtered = books.filter((book) => {
    if (search) {
      const q = search.toLowerCase();
      const currentTitle = getBookTitle(book, locale).toLowerCase();
      const author = getAuthor(book.authorSlug);
      const authorName = author?.name ?? book.authorSlug;
      const bookMatchesSearch =
        currentTitle.includes(q) ||
        book.originalTitle.toLowerCase().includes(q) ||
        authorName.toLowerCase().includes(q) ||
        book.variants.some((v) => matchesVariantSearch(v, q));
      if (!bookMatchesSearch) return false;
    }

    if (
      activeCategories.length &&
      !activeCategories.some((c) => book.categorySlugs.includes(c))
    )
      return false;
    if (activeAuthors.length && !activeAuthors.includes(book.authorSlug))
      return false;

    return book.variants.some(matchesVariantFilters);
  });

  const hasCategory = activeCategories.length === 1;
  const pageUrl = `${SITE_URL}/${locale}/books${hasCategory ? `?category=${activeCategories[0]}` : ""}`;

  const resolvedBooks = filtered.map((book) => {
    const authorName = getAuthor(book.authorSlug)?.name ?? book.authorSlug;

    const matchesSearch = (v: (typeof book.variants)[0]) =>
      search ? matchesVariantSearch(v, search.toLowerCase()) : false;

    const variant =
      book.variants.find((v) => matchesSearch(v) && matchesVariantFilters(v)) ??
      book.variants.find(matchesSearch) ??
      book.variants.find(
        (v) => matchesVariantFilters(v) && v.language.startsWith(locale),
      ) ??
      book.variants.find(matchesVariantFilters) ??
      book.variants[0];

    const bookTitle = variant.titleInLanguage ?? book.originalTitle;

    return {
      book,
      variant,
      authorName,
      bookTitle,
      bookImage: variant.variantImage || book.images.cover,
      finalPrice: variant.price.amount - (variant.price.discountAmount ?? 0),
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl,
    numberOfItems: resolvedBooks.length,
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

  const t = await getTranslations({ locale });
  const pageTitle = search
    ? `"${search}"`
    : hasCategory
      ? await (async () => {
          const tCat = await getTranslations({
            locale,
            namespace: "categories",
          });
          return tCat(`items.${activeCategories[0]}.name`);
        })()
      : t("pages.books");

  return (
    <main className="my-container flex mb-4">
      {!search && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <BooksFilter
        activeCategories={activeCategories}
        activeFormats={activeFormats}
        activeLangs={activeLangs}
        activePrice={price}
        activeInStock={activeInStock}
        activeAuthors={activeAuthors}
      />

      <div className="flex-1 content-start">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">
            {pageTitle}
            <span className="text-base font-normal text-muted-foreground ml-2">
              ({filtered.length} ta)
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-4">
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
                priority={index < 4}
              />
            ),
          )}
        </div>
      </div>
    </main>
  );
}
