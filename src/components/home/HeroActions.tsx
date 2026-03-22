"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { useBookActions } from "@/hooks/useBookActions";
import { useTranslations } from "next-intl";
import { subscribe, getClientSnapshot, getServerSnapshot } from "@/lib/hooks";

interface Props {
  bookId: number;
  slug: string;
  language: string;
}

export default function HeroActions({ bookId, slug, language }: Props) {
  const isMounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const t = useTranslations("actions");

  const {
    cartItem,
    isInWishlist,
    addToCart,
    increment,
    decrement,
    toggleWishlist,
  } = useBookActions({ bookId, slug, language });

  const wishlisted = isMounted && isInWishlist;
  const inCart = isMounted ? cartItem : null;

  return (
    <div className="flex items-center">
      {inCart ? (
        <div className="row-between bg-background border border-foreground/10 h-10 rounded-lg mr-4 px-2">
          <Button
            onClick={decrement}
            leftIcon="minus"
            iconSize={16}
            className="border-r border-r-foreground/50 pr-2 mr-4 text-foreground/60 hover:text-foreground"
          />
          <span>{inCart.quantity}</span>
          <Button
            onClick={increment}
            leftIcon="plus"
            iconSize={16}
            className="border-l border-l-foreground/50 pl-2 ml-4 text-foreground/60 hover:text-foreground"
          />
        </div>
      ) : (
        <Button
          onClick={addToCart}
          leftIcon="cart"
          iconSize={16}
          className="bg-black text-white px-4 h-10 mr-4"
        >
          {t("addToCart")}
        </Button>
      )}

      <Button
        onClick={toggleWishlist}
        leftIcon="wishlist"
        iconStyle={wishlisted ? "text-white" : "text-primary"}
        iconSize={16}
        className={`w-10 h-10 justify-center border transition-all ${
          wishlisted
            ? "border-primary bg-primary text-white"
            : "border-primary/15 bg-primary/5 hover:bg-primary/10"
        }`}
      />
    </div>
  );
}
