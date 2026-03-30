import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

type JsonModule = { default: Record<string, unknown> };

const MESSAGE_MODULES: Record<string, string> = {
  auth: "components/auth",
  categories: "components/categories",
  header: "components/header",
  search: "components/search",
  admin: "pages/admin",
  authors: "pages/authors",
  books: "pages/books",
  cart: "pages/cart",
  home: "pages/home",
  login: "pages/login",
  notFound: "pages/not-found",
  profile: "pages/profile",
  wishlist: "pages/wishlist",
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale =
    requested && routing.locales.includes(requested as Locale)
      ? (requested as Locale)
      : routing.defaultLocale;

  const [common, ...moduleEntries] = await Promise.all([
    import(`@/messages/${locale}/common.json`),
    ...Object.entries(MESSAGE_MODULES).map(([key, path]) =>
      import(`@/messages/${locale}/${path}.json`).then((mod: JsonModule) => [
        key,
        mod.default,
      ]),
    ),
  ]);

  return {
    locale,
    messages: {
      ...(common as JsonModule).default,
      ...Object.fromEntries(
        moduleEntries as [string, Record<string, unknown>][],
      ),
    },
  };
});
