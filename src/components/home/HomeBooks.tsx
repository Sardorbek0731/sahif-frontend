import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { books } from "@/data/books";
import { getAuthorName } from "@/lib/author";
import { getBookTitle, isNewBook } from "@/lib/book";
import { Button } from "@/components/ui/Button";
import BookCard from "@/components/books/BookCard";
import { type Book } from "@/types/book";

const nonHeroBooks = books.filter((b) => b.heroOrder === undefined);

const popularBooks = [...nonHeroBooks]
  .sort((a, b) => b.stats.salesCount - a.stats.salesCount)
  .slice(0, 5);

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
    <div className="space-y-10 my-4">
      <section>
        <div className="row-between mb-4">
          <h2 className="text-2xl font-bold">{tPopular("title")}</h2>
          <Link href="/books?sort=popular">
            <Button
              rightIcon="chevronRight"
              className="bg-card hover:bg-card-hover border border-border h-9 px-4 text-sm"
            >
              {tPopular("showMore")}
            </Button>
          </Link>
        </div>
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
                priority={index < 5}
              />
            ),
          )}
        </div>
      </section>

      <section>
        <div className="row-between mb-4">
          <h2 className="text-2xl font-bold">{tNew("title")}</h2>
          <Link href="/books?sort=new">
            <Button
              rightIcon="chevronRight"
              className="bg-card hover:bg-card-hover border border-border h-9 px-4 text-sm"
            >
              {tNew("showMore")}
            </Button>
          </Link>
        </div>
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
