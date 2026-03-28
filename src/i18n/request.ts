import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const [
    common,
    // components
    auth,
    categories,
    header,
    search,
    // pages
    admin,
    authors,
    books,
    cart,
    home,
    login,
    notFound,
    profile,
    wishlist,
  ] = await Promise.all([
    import(`@/messages/${locale}/common.json`),
    // components
    import(`@/messages/${locale}/components/auth.json`),
    import(`@/messages/${locale}/components/categories.json`),
    import(`@/messages/${locale}/components/header.json`),
    import(`@/messages/${locale}/components/search.json`),
    // pages
    import(`@/messages/${locale}/pages/admin.json`),
    import(`@/messages/${locale}/pages/authors.json`),
    import(`@/messages/${locale}/pages/books.json`),
    import(`@/messages/${locale}/pages/cart.json`),
    import(`@/messages/${locale}/pages/home.json`),
    import(`@/messages/${locale}/pages/login.json`),
    import(`@/messages/${locale}/pages/not-found.json`),
    import(`@/messages/${locale}/pages/profile.json`),
    import(`@/messages/${locale}/pages/wishlist.json`),
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      // components
      auth: auth.default,
      categories: categories.default,
      header: header.default,
      search: search.default,
      // pages
      admin: admin.default,
      authors: authors.default,
      books: books.default,
      cart: cart.default,
      home: home.default,
      login: login.default,
      notFound: notFound.default,
      profile: profile.default,
      wishlist: wishlist.default,
    },
  };
});
