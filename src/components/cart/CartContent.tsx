"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { useCartStore, selectTotalItems } from "@/store/useCartStore";
import { books } from "@/data/books";
import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getBookTitle } from "@/lib/book";
import { getAuthorName } from "@/lib/author";
import { Button } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function CartContent() {
  const isMounted = useIsMounted();
  const locale = useLocale() as Locale;
  const t = useTranslations("cart");
  const tCommon = useTranslations();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const totalQuantity = useCartStore(selectTotalItems);

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

  const cartBooks = items
    .map((item) => {
      const book = books.find((b) => b.id === item.bookId);
      if (!book) return null;
      const variant =
        book.variants.find((v) => v.language === item.language) ??
        book.variants[0];
      const bookTitle = getBookTitle(book, locale, item.language);
      const bookImage = variant.variantImage ?? book.images.cover;
      const finalPrice =
        variant.price.amount - (variant.price.discountAmount ?? 0);
      const authorName = getAuthorName(book.authorSlug);
      return {
        book,
        variant,
        item,
        bookTitle,
        bookImage,
        finalPrice,
        authorName,
      };
    })
    .filter((b): b is NonNullable<typeof b> => b !== null);

  const total = cartBooks.reduce(
    (sum, b) => sum + b.finalPrice * b.item.quantity,
    0,
  );

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {cartBooks.map((b) => (
          <li
            key={`${b.item.bookId}-${b.item.language}`}
            className="flex items-center gap-4 p-4 bg-card rounded-lg"
          >
            <Link href={`/books/${b.book.slug}/${b.item.language}`}>
              <Image
                src={b.bookImage}
                alt={b.bookTitle}
                width={60}
                height={90}
                className="h-auto rounded-lg"
              />
            </Link>
            <div className="flex-1">
              <Link href={`/books/${b.book.slug}/${b.item.language}`}>
                <p className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {b.bookTitle}
                </p>
              </Link>
              <p className="text-xs text-muted-foreground">{b.authorName}</p>
              <p className="text-xs text-muted-foreground">
                {b.variant.language}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(
                    b.item.bookId,
                    b.item.language,
                    b.item.quantity - 1,
                  )
                }
                aria-label={tCommon("decreaseQuantity")}
                className="w-7 h-7 rounded-lg bg-background border border-border text-foreground text-sm hover:bg-card-hover transition-colors"
              >
                −
              </button>
              <span className="text-sm w-4 text-center">{b.item.quantity}</span>
              <button
                type="button"
                onClick={() => {
                  if (b.item.quantity < b.variant.stockCount) {
                    updateQuantity(
                      b.item.bookId,
                      b.item.language,
                      b.item.quantity + 1,
                    );
                  }
                }}
                disabled={b.item.quantity >= b.variant.stockCount}
                aria-label={tCommon("increaseQuantity")}
                className="w-7 h-7 rounded-lg bg-background border border-border text-foreground text-sm hover:bg-card-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
            <div className="text-right min-w-24">
              <p className="text-sm font-medium">
                {(b.finalPrice * b.item.quantity).toLocaleString()} UZS
              </p>
            </div>
            <button
              type="button"
              aria-label={tCommon("removeItem")}
              onClick={() => removeItem(b.item.bookId, b.item.language)}
              className="text-muted-foreground hover:text-foreground text-lg ml-2 p-1 transition-colors"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="row-between pt-4 border-t border-border">
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
        >
          {t("clear")}
        </button>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            {t("total", { count: totalQuantity })}
          </p>
          <p className="text-lg font-medium">{total.toLocaleString()} UZS</p>
        </div>
      </div>
    </div>
  );
}
