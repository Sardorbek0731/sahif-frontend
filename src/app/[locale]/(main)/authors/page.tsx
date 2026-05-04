import type { Metadata } from "next";
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
    title: t("title"),
    description: t("metadata.description"),
    alternates: generateAlternates(locale, "/authors"),
    openGraph: {
      title: `${t("title")} | ${SITE_NAME}`,
      description: t("metadata.description"),
      url: `${SITE_URL}/${locale}/authors`,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      type: "website",
      images: [LOGO_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: `${t("title")} | ${SITE_NAME}`,
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
  const tCommon = await getTranslations({ locale });

  const authorsWithCount = authors.map((author) => ({
    ...author,
    bookCount: books.filter((b) => b.authorSlug === author.slug).length,
  }));

  return (
    <main className="my-container">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-6 gap-4">
        {authorsWithCount.map((author) => (
          <Link
            key={author.slug}
            href={`/authors/${author.slug}`}
            className="flex flex-col items-center bg-card rounded-lg hover:shadow-2xl transition-all duration-200 group p-5"
          >
            <div className="mb-4 border-2 border-border group-hover:border-primary transition-colors duration-200 rounded-full">
              <AuthorAvatar name={author.name} image={author.image} size={96} />
            </div>

            <h3 className="text-sm font-semibold text-center leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-2">
              {author.name}
            </h3>

            {author.bookCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {tCommon("count.books", { count: author.bookCount })}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
