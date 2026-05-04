"use client";

import { useTranslations } from "next-intl";

import { type Book } from "@/types/book";
import { isNewBook, calculateDiscountPercentage } from "@/lib/book";
import { Badge } from "@/components/ui/Badge";
import { type BookVariant } from "@/types/book";

interface Props {
  book: Pick<Book, "createdAt" | "isTrending" | "isBestseller">;
  variant?: BookVariant;
  layout?: "inline" | "spread"; // inline: gap-2, spread: justify-between
  className?: string;
}

export default function BookBadge({
  book,
  variant,
  layout = "inline",
  className = "",
}: Props) {
  const t = useTranslations("badges");

  const statusBadge = isNewBook(book.createdAt)
    ? ("new" as const)
    : book.isTrending
      ? ("trending" as const)
      : book.isBestseller
        ? ("bestseller" as const)
        : null;

  const hasDiscount = variant?.price.discountAmount;
  const discountPercentage = hasDiscount
    ? calculateDiscountPercentage(
        variant.price.amount,
        variant.price.discountAmount!,
      )
    : null;

  // Agar hech qanday badge bo'lmasa
  if (!statusBadge && !hasDiscount) return null;

  const containerClass =
    layout === "spread"
      ? "flex items-start justify-between w-full"
      : "flex items-start gap-3";

  return (
    <div className={containerClass}>
      {/* Left: Status badge (New/Trending/Bestseller) */}
      {statusBadge && (
        <Badge variant={statusBadge} className={className}>
          {t(statusBadge)}
        </Badge>
      )}

      {/* Right: Discount badge */}
      {hasDiscount && discountPercentage && (
        <Badge variant="discount" className={className}>
          -{discountPercentage}%
        </Badge>
      )}
    </div>
  );
}
