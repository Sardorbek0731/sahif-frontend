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
            onClick={isOutOfStock ? undefined : addToCart}
            leftIcon="cart"
            iconSize={14}
            className={`w-full justify-center bg-foreground text-background text-xs px-3 py-2 mt-3 ${
              isOutOfStock
                ? "opacity-50 cursor-not-allowed!"
                : "hover:opacity-90"
            }`}
          >
            {isOutOfStock ? t("outOfStock") : t("addToCart")}
          </Button>
        )}
      </>
    );
  }

  if (variant === "hero") {
    return (
      <div className="flex items-center">
        {cartItem ? (
          <div className="row-between bg-background border border-border h-10 rounded-lg mr-4 px-2">
            <button
              onClick={decrement}
              className="border-r border-border pr-2 mr-2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Icon name="minus" size={16} />
            </button>
            <span className="mx-2">{cartItem.quantity}</span>
            <button
              onClick={increment}
              className="border-l border-border pl-2 ml-2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Icon name="plus" size={16} />
            </button>
          </div>
        ) : (
          <Button
            onClick={isOutOfStock ? undefined : addToCart}
            leftIcon="cart"
            iconSize={16}
            className={`px-4 h-10 mr-4 bg-foreground text-background ${
              isOutOfStock ? "opacity-20 cursor-not-allowed!" : ""
            }`}
          >
            {isOutOfStock ? t("outOfStock") : t("addToCart")}
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
          onClick={isOutOfStock ? undefined : addToCart}
          leftIcon="cart"
          iconSize={14}
          className={`flex-1 bg-foreground text-background text-xs px-3 py-2 ${
            isOutOfStock ? "opacity-50 cursor-not-allowed!" : "hover:opacity-90"
          }`}
        >
          {isOutOfStock ? t("outOfStock") : t("addToCart")}
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
