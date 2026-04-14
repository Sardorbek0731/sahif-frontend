import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SITE_URL, OG_LOCALES, SITE_NAME, BOOK_LANGUAGES } from "@/constants";
import { type Locale } from "@/i18n/routing";
import { generateAlternates, LOGO_OG_IMAGE } from "@/lib/seo";
import { getAuthorName } from "@/lib/author";
import { getBookTitle, isNewBook } from "@/lib/book";
import { type BookFormat, BOOK_FORMATS } from "@/types/book";
import { books } from "@/data/books";
import { authors } from "@/data/authors";
import { isValidCategory } from "@/data/categories";

import { type SortOption, SORT_OPTIONS } from "@/constants/sort";
import BooksFilter from "@/components/books/BooksFilter";
import BookCard from "@/components/books/BookCard";
import BooksSortSelect from "@/components/books/BooksSortSelect";

type SearchParams = {
  category?: string;
  search?: string;
  format?: string;
  lang?: string;
  price?: string;
  inStock?: string;
  author?: string;
  sort?: string;
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { category, search, sort } = await searchParams;
  const t = await getTranslations({ locale });

  const firstCategory = category?.split(",")[0];
  let title = t("pages.books");
  if (search) title = search;
  else if (isValidCategory(firstCategory)) {
    const tCat = await getTranslations({ locale, namespace: "categories" });
    title = tCat(`items.${firstCategory}.name`);
  }

  const isSearch = !!search;
  const hasCategory =
    isValidCategory(firstCategory) && !category?.includes(",");
  const path = "/books";
  const paramsObj = hasCategory ? { category: firstCategory } : undefined;
  const pageUrl = `${SITE_URL}/${locale}${path}${hasCategory ? `?category=${firstCategory}` : ""}`;
  const description = t("books.metadata.description");

  return {
    title,
    description,
    alternates: generateAlternates(locale, path, paramsObj),

    robots: {
      index: !search && !sort,
      follow: true,
      googleBot: {
        index: !search && !sort,
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
      images: [LOGO_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [LOGO_OG_IMAGE.url],
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
    sort: sortParam,
  } = await searchParams;

  const sort = SORT_OPTIONS.includes(sortParam as SortOption)
    ? (sortParam as SortOption)
    : undefined;

  const activeFormats = format
    ? (format
        .split(",")
        .filter((f) => BOOK_FORMATS.includes(f as BookFormat)) as BookFormat[])
    : [];
  const validLangCodes = new Set<string>(BOOK_LANGUAGES.map((l) => l.code));
  const validAuthorSlugs = new Set(authors.map((a) => a.slug));

  const activeLangs = lang
    ? lang.split(",").filter((l) => validLangCodes.has(l))
    : [];
  const activeAuthors = authorParam
    ? authorParam.split(",").filter((a) => validAuthorSlugs.has(a))
    : [];
  const activeCategories = category
    ? category.split(",").filter(isValidCategory)
    : [];
  const activeInStock = inStock === "true";
  const searchQuery = search?.toLowerCase();

  const [minPrice, maxPrice] = (() => {
    if (!price) return [null, null];
    if (price.endsWith("+")) return [parseInt(price.slice(0, -1)), null];
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
  ) => !!(v.titleInLanguage?.toLowerCase().includes(q) || v.isbn.includes(q));

  const filtered = books.filter((book) => {
    if (searchQuery) {
      const currentTitle = getBookTitle(book, locale).toLowerCase();
      const authorName = getAuthorName(book.authorSlug).toLowerCase();
      const bookMatchesSearch =
        currentTitle.includes(searchQuery) ||
        book.originalTitle.toLowerCase().includes(searchQuery) ||
        authorName.includes(searchQuery) ||
        book.variants.some((v) => matchesVariantSearch(v, searchQuery));
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

  const variantFinalPrice = (v: (typeof books)[0]["variants"][0]) =>
    v.price.amount - (v.price.discountAmount ?? 0);

  const sorted = (() => {
    const arr = [...filtered];
    switch (sort) {
      case "popular":
        return arr.sort(
          (a, b) =>
            b.stats.rating * b.stats.reviewCount -
            a.stats.rating * a.stats.reviewCount,
        );
      case "new":
        return arr.sort((a, b) => {
          const aIsNew = isNewBook(a.createdAt);
          const bIsNew = isNewBook(b.createdAt);
          if (aIsNew !== bIsNew) return aIsNew ? -1 : 1;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      case "rating":
        return arr.sort(
          (a, b) =>
            b.stats.rating - a.stats.rating ||
            b.stats.reviewCount - a.stats.reviewCount,
        );
      case "price-asc":
      case "price-desc": {
        const prices = new Map(
          arr.map((b) => [
            b.id,
            Math.min(
              ...b.variants
                .filter(matchesVariantFilters)
                .map(variantFinalPrice),
            ),
          ]),
        );
        return arr.sort((a, b) =>
          sort === "price-asc"
            ? (prices.get(a.id) ?? 0) - (prices.get(b.id) ?? 0)
            : (prices.get(b.id) ?? 0) - (prices.get(a.id) ?? 0),
        );
      }
      default:
        return arr;
    }
  })();

  const hasCategory = activeCategories.length === 1;

  const resolvedBooks = sorted.map((book) => {
    const authorName = getAuthorName(book.authorSlug);

    const variant =
      book.variants.find((v) =>
        searchQuery
          ? matchesVariantSearch(v, searchQuery) && matchesVariantFilters(v)
          : false,
      ) ??
      book.variants.find(
        (v) => matchesVariantFilters(v) && v.language.startsWith(locale),
      ) ??
      book.variants.find(matchesVariantFilters) ??
      book.variants.find((v) => v.language.startsWith(locale)) ??
      book.variants[0];

    const bookTitle = variant.titleInLanguage ?? book.originalTitle;

    return {
      book,
      variant,
      authorName,
      bookTitle,
      bookImage: variant.variantImage || book.images.cover,
      finalPrice: variantFinalPrice(variant),
    };
  });

  const t = await getTranslations({ locale });

  let pageTitle: string;
  if (search) {
    pageTitle = `"${search}"`;
  } else if (hasCategory) {
    const tCat = await getTranslations({ locale, namespace: "categories" });
    pageTitle = tCat(`items.${activeCategories[0]}.name`);
  } else {
    pageTitle = t("pages.books");
  }

  const pageUrl = `${SITE_URL}/${locale}/books${hasCategory ? `?category=${activeCategories[0]}` : ""}`;

  const jsonLd =
    !search && !sort
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          url: pageUrl,
          numberOfItems: resolvedBooks.length,
          itemListElement: resolvedBooks
            .slice(0, 20)
            .map(
              (
                { book, variant, authorName, bookTitle, finalPrice },
                index,
              ) => ({
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
              }),
            ),
        }
      : null;

  return (
    <main className="my-container flex mb-4">
      {jsonLd && (
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
        activeSort={sort}
        activeSearch={search}
      />

      <div className="flex-1 content-start">
        <div className="row-between mb-4">
          <h1 className="text-xl font-bold">
            {pageTitle}
            <span className="text-base font-normal text-muted-foreground ml-2">
              ({t("books.filter.count", { count: filtered.length })})
            </span>
          </h1>
          <BooksSortSelect
            activeSort={sort}
            activeParams={{
              ...(category && { category }),
              ...(search && { search }),
              ...(format && { format }),
              ...(lang && { lang }),
              ...(price && { price }),
              ...(inStock && { inStock }),
              ...(authorParam && { author: authorParam }),
            }}
          />
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
