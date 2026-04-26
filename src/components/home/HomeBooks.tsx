import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { nonHeroBooks, popularBooks } from "@/data/books";
import { getAuthorName } from "@/lib/author";
import { getBookTitle, isNewBook } from "@/lib/book";
import { SectionHeader } from "@/components/ui/SectionHeader";
import BookCard from "@/components/books/BookCard";
import { type Book } from "@/types/book";

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
      bookTitle: getBookTitle(book, locale),
      bookImage: variant.variantImage || book.images.cover,
      finalPrice: variant.price.amount - (variant.price.discountAmount ?? 0),
    };
  });
}

export default async function HomeBooks({ locale }: { locale: Locale }) {
  const tPopular = await getTranslations({ locale, namespace: "home.popular" });
  const tNew = await getTranslations({ locale, namespace: "home.new" });

  const newBooks = [...nonHeroBooks]
    .sort((a, b) => {
      const aIsNew = isNewBook(a.createdAt);
      const bIsNew = isNewBook(b.createdAt);
      if (aIsNew !== bIsNew) return aIsNew ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 5);

  const resolvedPopular = resolveBooks(popularBooks, locale);
  const resolvedNew = resolveBooks(newBooks, locale);

  return (
    <div className="space-y-4 my-4">
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
    </div>
  );
}
