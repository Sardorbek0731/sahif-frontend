import { type Book } from "@/types/book";
import { type Locale } from "@/i18n/routing";

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
  const descriptions = book.description as Record<string, string>;
  return descriptions[locale];
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
