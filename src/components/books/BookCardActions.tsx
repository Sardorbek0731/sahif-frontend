// components/books/BookCardActions.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface Props {
  bookId: number;
  slug: string;
  language: string;
}

export default function BookCardActions({ bookId, slug, language }: Props) {
  const addToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) =>
    s.isInWishlist(bookId, language),
  );

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        onClick={() => addToCart({ bookId, slug, language })}
        leftIcon="cart"
        iconSize={14}
        className="flex-1 bg-foreground text-background text-xs px-3 py-2 hover:opacity-90"
      >
        Sotib olish
      </Button>
      <Button
        onClick={() => toggleWishlist({ bookId, slug, language })}
        leftIcon="wishlist"
        iconSize={14}
        className={`px-3 py-2 border border-foreground/10 text-xs ${
          isInWishlist
            ? "bg-primary/15 text-primary"
            : "bg-card hover:bg-card-hover"
        }`}
      />
    </div>
  );
}
