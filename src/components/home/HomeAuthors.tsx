import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { authors } from "@/data/authors";
import { books } from "@/data/books";
import { SectionHeader } from "@/components/ui/SectionHeader";
import AuthorAvatar from "@/components/shared/AuthorAvatar";

const featuredAuthors = authors.slice(0, 6);

export default async function HomeAuthors({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.authors" });
  const tCommon = await getTranslations({ locale });

  const authorsWithCount = featuredAuthors.map((author) => ({
    ...author,
    bookCount: books.filter((b) => b.authorSlug === author.slug).length,
  }));

  return (
    <section aria-labelledby="authors-heading" className="my-4">
      <SectionHeader
        id="authors-heading"
        title={t("title")}
        href="/authors"
        linkLabel={t("showMore")}
      />

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
    </section>
  );
}
