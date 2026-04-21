import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { IconChip } from "@/components/ui/IconChip";
import {
  SITE_NAME,
  PHONE_DISPLAY,
  PHONE_NUMBER,
  WORKING_HOURS,
} from "@/constants";

export default async function Footer() {
  const t = await getTranslations();

  const NAV_LINKS = [
    { href: "/books", label: t("pages.books") },
    { href: "/authors", label: t("pages.authors") },
    { href: "/cart", label: t("pages.cart") },
    { href: "/wishlist", label: t("pages.wishlist") },
  ];

  const ACCOUNT_LINKS = [
    { href: "/profile", label: t("pages.profile") },
    { href: "/login", label: t("pages.login") },
  ];

  return (
    <footer className="mt-16">
      <div className="my-container">
        <div className="border-t border-border pt-12 pb-8">
          <div className="grid grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="mr-4 flex items-center mb-4">
                <Logo className="mr-2 w-10 h-10" />
                <span className="font-asimovian text-2xl">{SITE_NAME}</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-6">
                {t("description")}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground/40 mb-5">
                {t("footer.catalog")}
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground/40 mb-5">
                {t("footer.account")}
              </p>
              <ul className="space-y-3">
                {ACCOUNT_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground/40 mb-5">
                {t("footer.contact")}
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <IconChip icon="callCenter" size="sm" color="primary" />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <IconChip icon="clock" size="sm" color="primary" />
                  {WORKING_HOURS}
                </li>
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <IconChip icon="location" size="sm" color="primary" />
                  {t("footer.location")}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 row-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <span className="font-asimovian">{SITE_NAME}</span>.{" "}
              {t("footer.rights")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("footer.createdBy")}{" "}
              <a
                href="https://t.me/Sardorbek0limov"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary underline underline-offset-2 transition-colors"
              >
                Sardorbek Olimov
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
