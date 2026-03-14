import { createNavigation } from "next-intl/navigation";

export const routing = {
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
  localePrefix: "always",
} as const;

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

export type Locale = (typeof routing.locales)[number];
