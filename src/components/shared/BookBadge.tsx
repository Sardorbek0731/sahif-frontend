"use client";

import { useTranslations } from "next-intl";

import { type Book } from "@/types/book";
import { isNewBook } from "@/lib/book";
import { Badge } from "@/components/ui/Badge";

interface Props {
  book: Pick<Book, "createdAt" | "isTrending" | "isBestseller">;
  className?: string;
}

export default function BookBadge({ book, className = "" }: Props) {
  const t = useTranslations("badges");

  const badge = isNewBook(book.createdAt)
    ? ("new" as const)
    : book.isTrending
      ? ("trending" as const)
      : book.isBestseller
        ? ("bestseller" as const)
        : null;

  if (!badge) return null;

  return (
    <Badge variant={badge} className={className}>
      {t(badge)}
    </Badge>
  );
}
