"use client";

import { Button } from "@/components/ui/button";
import { useBookActions } from "@/hooks/useBookActions";

interface Props {
  bookId: number;
  slug: string;
  language: string;
}

export default function BookCardActions({ bookId, slug, language }: Props) {
  const {
    cartItem,
    isInWishlist,
    addToCart,
    increment,
    decrement,
    toggleWishlist,
  } = useBookActions({ bookId, slug, language });

  return (
    <>
      {/* Wishlist — o'ng tepa burchak, absolute */}
      <Button
        onClick={toggleWishlist}
        leftIcon="wishlist"
        iconSize={16}
        className={`absolute top-2 right-2 w-9 h-9 justify-center border transition-all ${
          isInWishlist
            ? "border-primary bg-primary/15 text-primary"
            : "border-foreground/10 bg-card/80 backdrop-blur-sm hover:bg-card-hover"
        }`}
      />

      {/* Cart — pastda, to'liq kenglik */}
      {cartItem ? (
        <div className="flex items-center justify-between bg-foreground/5 border border-foreground/10 rounded-lg px-2 py-1.5 mt-3">
          <button
            onClick={decrement}
            className="w-7 h-7 row-center text-foreground/60 hover:text-foreground transition-colors text-lg"
          >
            −
          </button>
          <span className="text-sm font-medium">{cartItem.quantity}</span>
          <button
            onClick={increment}
            className="w-7 h-7 row-center text-foreground/60 hover:text-foreground transition-colors text-lg"
          >
            +
          </button>
        </div>
      ) : (
        <Button
          onClick={addToCart}
          leftIcon="cart"
          iconSize={14}
          className="w-full justify-center bg-foreground text-background text-xs px-3 py-2 mt-3 hover:opacity-90"
        >
          Sotib olish
        </Button>
      )}
    </>
  );
}
