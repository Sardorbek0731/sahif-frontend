"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { useBookActions } from "@/hooks/useBookActions";
import { useIsMounted } from "@/hooks/useIsMounted";

interface Props {
  bookId: number;
  slug: string;
  language: string;
  stockCount?: number;
  isOutOfStock?: boolean;
}

export default function BookActions({
  bookId,
  slug,
  language,
  stockCount,
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
  } = useBookActions({ bookId, slug, language, stockCount });

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-3">
      {cartItem ? (
        <div className="flex-1 row-between bg-foreground/5 border border-border rounded-lg h-10">
          <Button
            variant="ghost"
            onClick={decrement}
            leftIcon="minus"
            iconSize={18}
            aria-label={t("decreaseQuantity")}
            className="px-3 w-auto h-full rounded-none rounded-l-lg border-r border-border text-muted-foreground hover:text-foreground"
          />
          <span className="px-3 font-medium">{cartItem.quantity}</span>
          <Button
            variant="ghost"
            onClick={increment}
            leftIcon="plus"
            iconSize={18}
            aria-label={t("increaseQuantity")}
            className="px-3 w-auto h-full rounded-none rounded-r-lg border-l border-border text-muted-foreground hover:text-foreground"
          />
        </div>
      ) : (
        <Button
          onClick={addToCart}
          disabled={isOutOfStock}
          leftIcon="cart"
          iconSize={16}
          variant={isOutOfStock ? "default" : "solid"}
          center
          className={`flex-1 h-10 px-4 ${
            isOutOfStock
              ? "bg-foreground/8 text-foreground/35 border border-border"
              : ""
          }`}
        >
          {isOutOfStock ? t("outOfStock") : t("addToCart")}
        </Button>
      )}

      <Button
        onClick={toggleWishlist}
        leftIcon="wishlist"
        iconSize={16}
        aria-label={isInWishlist ? t("removeFromWishlist") : t("addToWishlist")}
        variant={isInWishlist ? "primary" : "primaryGhost"}
        className="w-10 h-10 shrink-0"
      />
    </div>
  );
}
