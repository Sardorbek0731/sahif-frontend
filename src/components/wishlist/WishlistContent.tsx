"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { books } from "@/data/books";
import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getBookTitle } from "@/lib/book";
import { getAuthor } from "@/lib/author";

import { useIsMounted } from "@/hooks/useIsMounted";

export default function WishlistContent() {
  const isMounted = useIsMounted();
  const locale = useLocale() as Locale;
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  // 1. Gidratatsiya tugaguncha kutamiz
  if (!isMounted) {
    return <div className="py-20 text-center">Yuklanmoqda...</div>;
  }

  // 2. Endi faqat haqiqiy (client-side) ma'lumot bilan ishlaymiz
  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-foreground/50">
        {"Sevimlilar bo'sh"}
      </div>
    );
  }

  const wishlistBooks = items
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
      const author = getAuthor(book.authorSlug);
      const authorName = author?.name ?? book.authorSlug;
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
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      {wishlistBooks.map((b) => {
        if (!b) return null;
        return (
          <div
            key={`${b.item.bookId}-${b.item.language}`}
            className="flex items-center gap-4 p-4 bg-card rounded-lg"
          >
            <Link href={`/books/${b.book.slug}/${b.item.language}`}>
              <Image
                src={b.bookImage}
                alt={b.bookTitle}
                width={60}
                height={90}
                className="h-auto rounded-md"
              />
            </Link>
            <div className="flex-1">
              <Link href={`/books/${b.book.slug}/${b.item.language}`}>
                <p className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {b.bookTitle}
                </p>
              </Link>
              <p className="text-xs text-foreground/50">{b.authorName}</p>
              <p className="text-sm font-medium mt-1">
                {b.finalPrice.toLocaleString()} UZS
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  addToCart({
                    bookId: b.item.bookId,
                    slug: b.book.slug,
                    language: b.item.language,
                  });
                  removeItem(b.item.bookId, b.item.language);
                }}
                className="text-xs px-3 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                {"Cartga o'tkazish"}
              </button>
              <button
                onClick={() => removeItem(b.item.bookId, b.item.language)}
                className="text-foreground/30 hover:text-foreground/60 text-lg"
              >
                ×
              </button>
            </div>
          </div>
        );
      })}

      <div className="flex justify-end pt-4 border-t border-foreground/10">
        <button
          onClick={clearWishlist}
          className="text-xs text-foreground/40 hover:text-foreground/60 underline underline-offset-2"
        >
          {"Hammasini o'chirish"}
        </button>
      </div>
    </div>
  );
}
