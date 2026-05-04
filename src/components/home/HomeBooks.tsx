import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { books } from "@/data/books";
import { getAuthorName } from "@/lib/author";
import { getBookTitle, isNewBook } from "@/lib/book";
import { SectionHeader } from "@/components/ui/SectionHeader";
import BookCard from "@/components/books/BookCard";
import { type Book } from "@/types/book";

// Regular books - locale is priority
function resolveBooks(list: Book[], locale: Locale) {
  return list.map((book) => {
    const variant =
      book.variants.find((v) => v.language.startsWith(locale)) ??
      book.variants[0];
    const authorName = getAuthorName(book.authorSlug);
    return {
      book,
      variant,
      authorName,
      bookTitle: getBookTitle(book, locale, variant.language),
      bookImage: variant.variantImage || book.images.cover,
      finalPrice: variant.price.amount - (variant.price.discountAmount ?? 0),
    };
  });
}

// Discount books - discount variant is priority (but locale is preferred)
function resolveDiscountBooks(list: Book[], locale: Locale) {
  return list.map((book) => {
    // Priority:
    // 1. Locale + Discount (best)
    // 2. Discount only (good)
    // 3. Locale (fallback)
    // 4. First variant (fallback)
    const variant =
      book.variants.find(
        (v) => v.language.startsWith(locale) && v.price.discountAmount,
      ) ??
      book.variants.find((v) => v.price.discountAmount) ??
      book.variants.find((v) => v.language.startsWith(locale)) ??
      book.variants[0];

    const authorName = getAuthorName(book.authorSlug);
    return {
      book,
      variant,
      authorName,
      bookTitle: getBookTitle(book, locale, variant.language),
      bookImage: variant.variantImage || book.images.cover,
      finalPrice: variant.price.amount - (variant.price.discountAmount ?? 0),
    };
  });
}

export default async function HomeBooks({ locale }: { locale: Locale }) {
  const tDiscount = await getTranslations({
    locale,
    namespace: "home.discount",
  });
  const tBestseller = await getTranslations({
    locale,
    namespace: "home.bestseller",
  });
  const tPopular = await getTranslations({ locale, namespace: "home.popular" });
  const tNew = await getTranslations({ locale, namespace: "home.new" });

  // Get hero book IDs to exclude them from sections
  const heroBooks = books
    .filter((b) => b.heroOrder)
    .sort((a, b) => (a.heroOrder ?? 0) - (b.heroOrder ?? 0));
  const heroBookIds = new Set(heroBooks.map((b) => b.id));
  const nonHeroBooks = books.filter((b) => !heroBookIds.has(b.id));

  // 1. Discount books (exclude hero)
  const discountBooks = nonHeroBooks
    .filter((b) => b.variants.some((v) => v.price.discountAmount))
    .sort((a, b) => {
      // Sort by discount percentage (highest first)
      const aMaxDiscount = Math.max(
        ...a.variants
          .filter((v) => v.price.discountAmount)
          .map((v) => ((v.price.discountAmount ?? 0) / v.price.amount) * 100),
      );
      const bMaxDiscount = Math.max(
        ...b.variants
          .filter((v) => v.price.discountAmount)
          .map((v) => ((v.price.discountAmount ?? 0) / v.price.amount) * 100),
      );
      return bMaxDiscount - aMaxDiscount;
    })
    .slice(0, 5);

  // 2. Bestseller books (exclude hero and discount)
  const usedIds1 = new Set([...heroBookIds, ...discountBooks.map((b) => b.id)]);
  const bestsellerBooks = nonHeroBooks
    .filter((b) => !usedIds1.has(b.id) && b.isBestseller)
    .sort((a, b) => b.stats.salesCount - a.stats.salesCount)
    .slice(0, 5);

  // 3. Popular books (exclude hero, discount, bestseller)
  const usedIds2 = new Set([...usedIds1, ...bestsellerBooks.map((b) => b.id)]);
  const popularBooks = nonHeroBooks
    .filter((b) => !usedIds2.has(b.id))
    .sort(
      (a, b) =>
        b.stats.rating * b.stats.reviewCount -
        a.stats.rating * a.stats.reviewCount,
    )
    .slice(0, 5);

  // 4. New books (exclude all above)
  const usedIds3 = new Set([...usedIds2, ...popularBooks.map((b) => b.id)]);
  const newBooks = nonHeroBooks
    .filter((b) => !usedIds3.has(b.id))
    .sort((a, b) => {
      const aIsNew = isNewBook(a.createdAt);
      const bIsNew = isNewBook(b.createdAt);
      if (aIsNew !== bIsNew) return aIsNew ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 5);

  const resolvedDiscount = resolveDiscountBooks(discountBooks, locale);
  const resolvedBestseller = resolveBooks(bestsellerBooks, locale);
  const resolvedPopular = resolveBooks(popularBooks, locale);
  const resolvedNew = resolveBooks(newBooks, locale);

  return (
    <div className="space-y-4 my-4">
      {/* Discount Section */}
      {resolvedDiscount.length > 0 && (
        <section aria-labelledby="discount-books-heading">
          <SectionHeader
            id="discount-books-heading"
            title={tDiscount("title")}
            href="/books?discount=true"
            linkLabel={tDiscount("showMore")}
          />
          <div className="grid grid-cols-5 gap-4">
            {resolvedDiscount.map(
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
                  priority={index < 3}
                />
              ),
            )}
          </div>
        </section>
      )}

      {/* Bestseller Section */}
      {resolvedBestseller.length > 0 && (
        <section aria-labelledby="bestseller-books-heading">
          <SectionHeader
            id="bestseller-books-heading"
            title={tBestseller("title")}
            href="/books?bestseller=true"
            linkLabel={tBestseller("showMore")}
          />
          <div className="grid grid-cols-5 gap-4">
            {resolvedBestseller.map(
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
                  priority={index < 3}
                />
              ),
            )}
          </div>
        </section>
      )}

      {/* Popular Section */}
      {resolvedPopular.length > 0 && (
        <section aria-labelledby="popular-books-heading">
          <SectionHeader
            id="popular-books-heading"
            title={tPopular("title")}
            href="/books?sort=popular"
            linkLabel={tPopular("showMore")}
          />
          <div className="grid grid-cols-5 gap-4">
            {resolvedPopular.map(
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
                  priority={index < 3}
                />
              ),
            )}
          </div>
        </section>
      )}

      {/* New Section */}
      {resolvedNew.length > 0 && (
        <section aria-labelledby="new-books-heading">
          <SectionHeader
            id="new-books-heading"
            title={tNew("title")}
            href="/books?sort=new"
            linkLabel={tNew("showMore")}
          />
          <div className="grid grid-cols-5 gap-4">
            {resolvedNew.map(
              ({
                book,
                variant,
                authorName,
                bookTitle,
                bookImage,
                finalPrice,
              }) => (
                <BookCard
                  key={book.id}
                  book={book}
                  variant={variant}
                  authorName={authorName}
                  bookTitle={bookTitle}
                  bookImage={bookImage}
                  finalPrice={finalPrice}
                />
              ),
            )}
          </div>
        </section>
      )}
    </div>
  );
}
