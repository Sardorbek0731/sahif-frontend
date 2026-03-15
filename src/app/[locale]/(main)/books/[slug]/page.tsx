import { redirect } from "next/navigation";
import { books } from "@/data/books";
import { type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  const defaultVariant =
    book.variants.find((v) => v.language.startsWith(locale)) ||
    book.variants[0];

  redirect(`/${locale}/books/${slug}/${defaultVariant.language}`);
}
