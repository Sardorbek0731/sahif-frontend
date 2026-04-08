import { type Book } from "@/types/book";
import { type Locale } from "@/i18n/routing";

const NEW_BOOK_DAYS = 30;

export function isNewBook(createdAt: string): boolean {
  const ms = Date.now() - new Date(createdAt).getTime();
  return ms / 86_400_000 <= NEW_BOOK_DAYS;
}

export function getBookTitle(
  book: Book,
  locale: Locale,
  variantLanguage?: string,
): string {
  if (variantLanguage) {
    const variant = book.variants.find((v) => v.language === variantLanguage);
    if (variant?.titleInLanguage) return variant.titleInLanguage;
  }

  const variant = book.variants.find((v) => v.language.startsWith(locale));
  return variant?.titleInLanguage || book.originalTitle;
}

export function getBookDescription(book: Book, locale: Locale): string {
  return book.description[locale];
}

export function getActiveVariant(
  book: Book,
  variantParam: string,
  locale: Locale,
) {
  return (
    book.variants.find((v) => v.language === variantParam) ||
    book.variants.find((v) => v.language.startsWith(locale)) ||
    book.variants[0]
  );
}
