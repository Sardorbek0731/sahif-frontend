"use client";

import { useTranslations } from "next-intl";

import { type Book } from "@/types/book";
import { isNewBook } from "@/lib/book";

const BADGE_STYLES = {
  new: "border-green-500 bg-green-500/15 text-green-500",
  trending: "border-orange-500 bg-orange-500/15 text-orange-500",
  bestseller: "border-primary bg-primary/15 text-primary",
} as const;

interface Props {
  book: Pick<Book, "createdAt" | "isTrending" | "isBestseller">;
  className?: string;
}

export default function BookBadge({ book, className = "" }: Props) {
  const t = useTranslations("badges");

  const badge = isNewBook(book.createdAt)
    ? { key: "new" as const, label: t("new") }
    : book.isTrending
      ? { key: "trending" as const, label: t("trending") }
      : book.isBestseller
        ? { key: "bestseller" as const, label: t("bestseller") }
        : null;

  if (!badge) return null;

  return (
    <span
      className={`border py-1 px-3 rounded-lg text-sm ${BADGE_STYLES[badge.key]} ${className}`}
    >
      {badge.label}
    </span>
  );
}
