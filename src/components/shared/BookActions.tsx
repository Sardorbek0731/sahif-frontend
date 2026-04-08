"use client";

import { Button } from "@/components/ui/Button";
import { useBookActions } from "@/hooks/useBookActions";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTranslations } from "next-intl";
import { Icon } from "../ui/icons";

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
        <div className="flex-1 flex items-center justify-between bg-foreground/5 border border-foreground/10 rounded-lg px-3 h-10">
          <button
            onClick={decrement}
            className="border-r border-border pr-3 mr-3 text-muted-foreground hover:text-foreground cursor-pointer transition-all"
          >
            <Icon name="minus" size={18} />
          </button>
          <span className="mx-2">{cartItem.quantity}</span>
          <button
            onClick={increment}
            className="border-l border-border pl-3 ml-3 text-muted-foreground hover:text-foreground cursor-pointer transition-all"
          >
            <Icon name="plus" size={18} />
          </button>
        </div>
      ) : (
        <Button
          onClick={isOutOfStock ? undefined : addToCart}
          leftIcon="cart"
          iconSize={16}
          className={`flex-1 h-10 justify-center px-4 ${
            isOutOfStock
              ? "bg-foreground/8 text-foreground/35 border border-foreground/10 cursor-not-allowed!"
              : "bg-foreground text-background hover:opacity-90"
          }`}
        >
          {isOutOfStock ? t("outOfStock") : t("addToCart")}
        </Button>
      )}

      <Button
        onClick={toggleWishlist}
        leftIcon="wishlist"
        iconSize={16}
        className={`w-10 h-10 justify-center border transition-all shrink-0 ${
          isInWishlist
            ? "border-primary bg-primary text-white"
            : "border-primary/15 bg-primary/5 hover:bg-primary/10 text-primary"
        }`}
      />
    </div>
  );
}
