// app/not-found.tsx
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icons/icon";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 blur-3xl opacity-20 bg-primary rounded-full" />
        <Icon
          name="search"
          size={120}
          className="relative text-muted-foreground opacity-50 animate-bounce-slow"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-6xl font-bold">
          404
        </h1>
      </div>

      <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
      <p className="text-muted-foreground max-w-md mb-8">{t("description")}</p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/">
          <Button leftIcon="home" variant="primary">
            {t("goHome")}
          </Button>
        </Link>

        <Link href="/search">
          <Button leftIcon="search" variant="card">
            {t("searchSomething")}
          </Button>
        </Link>
      </div>
    </main>
  );
}
