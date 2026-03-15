import { type Book } from "@/types/book";
import { type Locale } from "@/i18n/routing";

export function getBookTitle(book: Book, locale: Locale): string {
  // 1. Foydalanuvchi tiliga mos keladigan nashrni qidiramiz
  const variant = book.variants.find((v) => v.language.startsWith(locale));

  // 2. Fallback: Variant nomi -> bo'lmasa Asl nomi
  return variant?.titleInLanguage || book.originalTitle;
}

export function getBookDescription(book: Book, locale: Locale): string {
  // Record orqali kasting qilish TypeScript'dagi "No index signature" xatosini oldini oladi
  const descriptions = book.description as Record<string, string>;

  // Foydalanuvchi tili -> bo'lmasa o'zbekcha -> bo'lmasa bo'sh matn
  return descriptions[locale] || descriptions["uz"] || "";
}
