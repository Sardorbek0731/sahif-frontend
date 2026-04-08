"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { useCartStore, selectTotalItems } from "@/store/useCartStore";
import { books } from "@/data/books";
import { type Locale } from "@/i18n/routing";
import { getBookTitle } from "@/lib/book";
import { getAuthorName } from "@/lib/author";

import { useIsMounted } from "@/hooks/useIsMounted";

export default function CartContent() {
  const isMounted = useIsMounted();
  const locale = useLocale() as Locale;
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const totalQuantity = useCartStore(selectTotalItems);

  // 1. Gidratatsiya tugaguncha kutamiz
  if (!isMounted) {
    return <div className="py-20 text-center">Yuklanmoqda...</div>;
  }

  // 2. Endi faqat haqiqiy (client-side) ma'lumot bilan ishlaymiz
  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-foreground/50">
        {"Savatcha bo'sh"}
      </div>
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
      return { book, variant, item, bookTitle, bookImage, finalPrice, authorName };
    })
    .filter((b): b is NonNullable<typeof b> => b !== null);

  const total = cartBooks.reduce(
    (sum, b) => sum + b.finalPrice * b.item.quantity,
    0,
  );

  return (
    <div className="flex flex-col gap-4">
      {cartBooks.map((b) => {
        return (
          <div
            key={`${b.item.bookId}-${b.item.language}`}
            className="flex items-center gap-4 p-4 bg-card rounded-lg"
          >
            <Image
              src={b.bookImage}
              alt={b.bookTitle}
              width={60}
              height={90}
              className="h-auto rounded-lg"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {b.bookTitle}
              </p>
              <p className="text-xs text-foreground/50">{b.authorName}</p>
              <p className="text-xs text-foreground/50">{b.variant.language}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(
                    b.item.bookId,
                    b.item.language,
                    b.item.quantity - 1,
                  )
                }
                className="w-7 h-7 rounded-lg bg-background border border-foreground/10 text-foreground text-sm"
              >
                −
              </button>
              <span className="text-sm w-4 text-center">{b.item.quantity}</span>
              <button
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
                className="w-7 h-7 rounded-lg bg-background border border-foreground/10 text-foreground text-sm disabled:opacity-40 disabled:cursor-not-allowed"
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
              onClick={() => removeItem(b.item.bookId, b.item.language)}
              className="text-foreground/30 hover:text-foreground/60 text-lg ml-2"
            >
              ×
            </button>
          </div>
        );
      })}

      <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
        <button
          onClick={clearCart}
          className="text-xs text-foreground/40 hover:text-foreground/60 underline underline-offset-2"
        >
          Savatni tozalash
        </button>
        <div className="text-right">
          <p className="text-xs text-foreground/50">
            Jami ({totalQuantity} ta)
          </p>
          <p className="text-lg font-medium">{total.toLocaleString()} UZS</p>
        </div>
      </div>
    </div>
  );
}
