import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/icons";
import {
  SITE_NAME,
  PHONE_DISPLAY,
  PHONE_NUMBER,
  WORKING_HOURS,
} from "@/constants";

const NAV_LINKS = [
  { href: "/books", label: "Kitoblar" },
  { href: "/authors", label: "Mualliflar" },
  { href: "/cart", label: "Savatcha" },
  { href: "/wishlist", label: "Sevimlilar" },
] as const;

const ACCOUNT_LINKS = [
  { href: "/profile", label: "Profil" },
  { href: "/login", label: "Kirish" },
] as const;

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="my-container">
        <div className="border-t border-border pt-12 pb-8">
          <div className="grid grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="mr-4 flex items-center">
                <Logo className="mr-2 w-10 h-10" />
                <span className="font-asimovian text-2xl">{SITE_NAME}</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-6">
                O&apos;zbekistondagi eng sifatli kitoblar onlayn do&apos;koni.
                Tez yetkazib berish va qulay narxlar bilan.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground/40 mb-5">
                Katalog
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
                Akkaunt
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
                Aloqa
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon
                        name="callCenter"
                        size={14}
                        className="text-primary"
                      />
                    </span>
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name="clock" size={14} className="text-primary" />
                  </span>
                  {WORKING_HOURS}
                </li>
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name="location" size={14} className="text-primary" />
                  </span>
                  Toshkent, O&apos;zbekiston
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <span className="font-asimovian">{SITE_NAME}</span>. Barcha
              huquqlar himoyalangan.
            </p>
            <p className="text-xs text-muted-foreground">
              Created by{" "}
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
