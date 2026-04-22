"use client";

import { useLocale, useTranslations } from "next-intl";

import { useWishlistStore } from "@/store/useWishlistStore";
import { books } from "@/data/books";
import { type Locale } from "@/i18n/routing";
import { getBookTitle } from "@/lib/book";
import { getAuthorName } from "@/lib/author";
import { Button } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useIsMounted } from "@/hooks/useIsMounted";
import BookCard from "@/components/books/BookCard";

export default function WishlistContent() {
  const isMounted = useIsMounted();
  const locale = useLocale() as Locale;
  const t = useTranslations("wishlist");
  const tCommon = useTranslations();
  const { items, clearWishlist } = useWishlistStore();

  if (!isMounted) {
    return (
      <Spinner className="w-8 h-8 border-2 my-20" label={tCommon("loading")} />
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-foreground/50">{t("empty")}</div>
    );
  }

  const wishlistBooks = items
    .map((item) => {
      const book = books.find((b) => b.id === item.bookId);
      if (!book) return null;
      const variant =
        book.variants.find((v) => v.language === item.language) ??
        book.variants[0];
      return {
        book,
        variant,
        authorName: getAuthorName(book.authorSlug),
        bookTitle: getBookTitle(book, locale, item.language),
        bookImage: variant.variantImage ?? book.images.cover,
        finalPrice: variant.price.amount - (variant.price.discountAmount ?? 0),
      };
    })
    .filter((b): b is NonNullable<typeof b> => b !== null);

  return (
    <div className="py-6">
      <div className="row-between mb-6">
        <h1 className="text-2xl font-bold">
          {tCommon("pages.wishlist")}
          <span className="text-base font-normal text-muted-foreground ml-2">
            ({items.length})
          </span>
        </h1>
        <button
          type="button"
          onClick={clearWishlist}
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
        >
          {t("clearAll")}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {wishlistBooks.map(
          ({ book, variant, authorName, bookTitle, bookImage, finalPrice }) => (
            <BookCard
              key={`${book.id}-${variant.language}`}
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
    </div>
  );
}
