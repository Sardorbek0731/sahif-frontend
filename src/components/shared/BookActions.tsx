"use client";

import { Button } from "@/components/ui/Button";
import { useBookActions } from "@/hooks/useBookActions";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTranslations } from "next-intl";

interface Props {
  bookId: number;
  slug: string;
  language: string;
  variant?: "card" | "hero" | "detail";
  isOutOfStock?: boolean;
}

export default function BookActions({
  bookId,
  slug,
  language,
  variant = "card",
  isOutOfStock = false,
}: Props) {
  const isMounted = useIsMounted();
  const t = useTranslations("");

  const {
    cartItem,
    isInWishlist,
    addToCart,
    increment,
    decrement,
    toggleWishlist,
  } = useBookActions({ bookId, slug, language });

  if (!isMounted) return null;

  if (variant === "card") {
    return (
      <>
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
        {cartItem ? (
          <div className="flex items-center justify-between bg-foreground/5 border border-foreground/10 rounded-lg px-2 py-1.5 mt-3">
            <button
              onClick={decrement}
              className="w-7 h-7 row-center text-foreground/60 hover:text-foreground text-lg"
            >
              −
            </button>
            <span className="text-sm font-medium">{cartItem.quantity}</span>
            <button
              onClick={increment}
              className="w-7 h-7 row-center text-foreground/60 hover:text-foreground text-lg"
            >
              +
            </button>
          </div>
        ) : (
          <Button
            onClick={addToCart}
            disabled={isOutOfStock}
            leftIcon="cart"
            iconSize={14}
            className="w-full justify-center bg-foreground text-background text-xs px-3 py-2 mt-3 hover:opacity-90"
          >
            {t("addToCart")}
          </Button>
        )}
      </>
    );
  }

  if (variant === "hero") {
    return (
      <div className="flex items-center">
        {cartItem ? (
          <div className="row-between bg-background border border-foreground/10 h-10 rounded-lg mr-4 px-2">
            <Button
              onClick={decrement}
              leftIcon="minus"
              iconSize={16}
              className="border-r border-foreground/10 pr-2 mr-4 text-foreground/60 hover:text-foreground"
            />
            <span className="mx-2">{cartItem.quantity}</span>
            <Button
              onClick={increment}
              leftIcon="plus"
              iconSize={16}
              className="border-l border-foreground/10 pl-2 ml-4 text-foreground/60 hover:text-foreground"
            />
          </div>
        ) : (
          <Button
            onClick={addToCart}
            disabled={isOutOfStock}
            leftIcon="cart"
            iconSize={16}
            className="bg-foreground text-background px-4 h-10 mr-4"
          >
            {t("addToCart")}
          </Button>
        )}
        <Button
          onClick={toggleWishlist}
          leftIcon="wishlist"
          iconStyle={isInWishlist ? "text-white" : "text-primary"}
          iconSize={16}
          className={`w-10 h-10 justify-center border transition-all ${
            isInWishlist
              ? "border-primary bg-primary text-white"
              : "border-primary/15 bg-primary/5 hover:bg-primary/10"
          }`}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      {cartItem ? (
        <div className="flex-1 flex items-center justify-between bg-foreground/5 border border-foreground/10 rounded-lg px-2 py-1.5">
          <button
            onClick={decrement}
            className="w-6 h-6 row-center text-foreground/60 hover:text-foreground text-lg"
          >
            −
          </button>
          <span className="text-sm font-medium">{cartItem.quantity}</span>
          <button
            onClick={increment}
            className="w-6 h-6 row-center text-foreground/60 hover:text-foreground text-lg"
          >
            +
          </button>
        </div>
      ) : (
        <Button
          onClick={addToCart}
          disabled={isOutOfStock}
          leftIcon="cart"
          iconSize={14}
          className="flex-1 bg-foreground text-background text-xs px-3 py-2 hover:opacity-90"
        >
          {t("addToCart")}
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
