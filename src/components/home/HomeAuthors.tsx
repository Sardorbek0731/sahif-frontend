import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { authors } from "@/data/authors";
import { Button } from "@/components/ui/Button";

const featuredAuthors = authors.slice(0, 8);

export default async function HomeAuthors({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.authors" });

  return (
    <section className="my-4">
      <div className="row-between mb-4">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
      </div>

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

      <div className="flex justify-center mt-6">
        <Link href="/authors">
          <Button
            rightIcon="chevronRight"
            className="bg-card hover:bg-card-hover border border-border h-10 px-6"
          >
            {t("showMore")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
