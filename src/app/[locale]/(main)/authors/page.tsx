import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { OG_LOCALES, SITE_NAME, SITE_URL } from "@/constants";
import { type Locale } from "@/i18n/routing";
import { generateAlternates, LOGO_OG_IMAGE } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { authors } from "@/data/authors";
import { books } from "@/data/books";
import AuthorAvatar from "@/components/shared/AuthorAvatar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "authors" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: generateAlternates(locale, "/authors"),
    openGraph: {
      title: `${t("metadata.title")} | ${SITE_NAME}`,
      description: t("metadata.description"),
      url: `${SITE_URL}/${locale}/authors`,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      type: "website",
      images: [LOGO_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: `${t("metadata.title")} | ${SITE_NAME}`,
      description: t("metadata.description"),
      images: [LOGO_OG_IMAGE.url],
    },
  };
}

export default async function AuthorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "authors" });

  const authorsWithCount = authors.map((author) => ({
    ...author,
    bookCount: books.filter((b) => b.authorSlug === author.slug).length,
  }));

  return (
    <main className="my-container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {authorsWithCount.map((author) => (
          <Link
            key={author.slug}
            href={`/authors/${author.slug}`}
            className="flex flex-col items-center text-center group"
          >
            <div className="mb-3 border-2 border-border group-hover:border-primary transition-colors rounded-full">
              <AuthorAvatar
                name={author.name}
                image={author.image}
                size={112}
              />
            </div>
            <p className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
              {author.name}
            </p>
            {author.bookCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {t("booksCount", { count: author.bookCount })}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
