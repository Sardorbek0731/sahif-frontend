import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { type Book, type BookVariant } from "@/types/book";
import BookActions from "@/components/shared/BookActions";
import BookBadge from "@/components/shared/BookBadge";

interface Props {
  book: Book;
  variant: BookVariant;
  authorName: string;
  bookTitle: string;
  bookImage: string;
  finalPrice: number;
  preload?: boolean;
}

export default function BookCard({
  book,
  variant,
  authorName,
  bookTitle,
  bookImage,
  finalPrice,
  preload = false,
}: Props) {
  const t = useTranslations("book");
  return (
    <article className="flex flex-col bg-card rounded-lg hover:shadow-2xl transition-all duration-200 group p-3">
      <Link
        href={`/books/${book.slug}/${variant.language}`}
        className="relative row-center bg-card pt-3 pr-3 pb-6 pl-3 border-b border-border mb-3"
      >
        <Image
          src={bookImage}
          alt={bookTitle}
          width={160}
          height={230}
          className="h-44 w-auto"
          priority={preload}
        />
        <div className="absolute top-0 left-0">
          <BookBadge book={book} />
        </div>
      </Link>

      <div className="flex flex-col flex-1 justify-between">
        <Link href={`/books/${book.slug}/${variant.language}`}>
          <h3 className="font-semibold leading-snug line-clamp-2 hover:text-primary transition-colors">
            {bookTitle}
          </h3>
        </Link>
        <Link
          href={`/authors/${book.authorSlug}`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1"
        >
          {authorName}
        </Link>

        <div className="row-between gap-1 mt-3 text-xs text-muted-foreground">
          <span
            className="text-amber-500"
            aria-label={`${book.stats.rating.toFixed(1)} yulduz`}
          >
            ★ {book.stats.rating.toFixed(1)}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {variant.pageCount} {t("pages")}
          </span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{t(`formats.${variant.format}`)}</span>
        </div>

        <div className="flex items-baseline gap-3 pt-3 mt-3 mb-2.5 border-t border-border">
          <span className="font-semibold text-primary">
            {finalPrice.toLocaleString()} {variant.price.currency}
          </span>
          {variant.price.discountAmount && (
            <span className="text-sm line-through text-muted-foreground">
              {variant.price.amount.toLocaleString()}
            </span>
          )}
        </div>

        <BookActions
          bookId={book.id}
          slug={book.slug}
          language={variant.language}
          stockCount={variant.stockCount}
          isOutOfStock={variant.stockCount === 0}
        />
      </div>
    </article>
  );
}
