"use client";

import { Button } from "@/components/ui/button";
import { useBookActions } from "@/hooks/useBookActions";

interface Props {
  bookId: number;
  slug: string;
  language: string;
}

export default function BookActions({ bookId, slug, language }: Props) {
  const {
    cartItem,
    isInWishlist,
    addToCart,
    increment,
    decrement,
    toggleWishlist,
  } = useBookActions({ bookId, slug, language });

  return (
    <div className="flex items-center gap-2 mt-2">
      {cartItem ? (
        <div className="flex-1 flex items-center justify-between bg-foreground/5 border border-foreground/10 rounded-lg px-2 py-1.5">
          <button
            onClick={decrement}
            className="w-6 h-6 row-center text-foreground/60 hover:text-foreground transition-colors text-lg"
          >
            −
          </button>
          <span className="text-sm font-medium">{cartItem.quantity}</span>
          <button
            onClick={increment}
            className="w-6 h-6 row-center text-foreground/60 hover:text-foreground transition-colors text-lg"
          >
            +
          </button>
        </div>
      ) : (
        <Button
          onClick={addToCart}
          leftIcon="cart"
          iconSize={14}
          className="flex-1 bg-foreground text-background text-xs px-3 py-2 hover:opacity-90"
        >
          Sotib olish
        </Button>
      )}

      <Button
        onClick={toggleWishlist}
        leftIcon="wishlist"
        iconSize={14}
        className={`px-3 py-2 border text-xs transition-all ${
          isInWishlist
            ? "border-primary bg-primary/15 text-primary"
            : "border-foreground/10 bg-card hover:bg-card-hover"
        }`}
      />
    </div>
  );
}
