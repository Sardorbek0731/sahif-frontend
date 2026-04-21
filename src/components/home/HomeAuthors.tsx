import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { authors } from "@/data/authors";
import { SectionHeader } from "@/components/ui/SectionHeader";

const featuredAuthors = authors.slice(0, 8);

export default async function HomeAuthors({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.authors" });

  return (
    <section aria-labelledby="authors-heading" className="my-4">
      <SectionHeader
        id="authors-heading"
        title={t("title")}
        href="/authors"
        linkLabel={t("showMore")}
      />

      <div className="flex gap-4 overflow-x-auto pb-2">
        {featuredAuthors.map((author) => (
          <Link
            key={author.slug}
            href={`/authors/${author.slug}`}
            className="flex flex-col items-center text-center shrink-0 w-24 group"
          >
            <div className="relative w-20 h-20 mb-2 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted row-center text-xl font-bold text-muted-foreground">
                  {author.name[0]}
                </div>
              )}
            </div>
            <span className="text-xs font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {author.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
