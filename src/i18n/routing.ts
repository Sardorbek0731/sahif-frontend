import { createNavigation } from "next-intl/navigation";

export const routing = {
  locales: ["uz", "en", "ru"],
  defaultLocale: "uz",
  localePrefix: "always",
  localeDetection: true,
} as const;

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
