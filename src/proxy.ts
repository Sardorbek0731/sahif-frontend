import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { type Locale, routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const PROTECTED_ROUTES = ["/profile"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  const [, maybeLocale] = pathname.split("/");
  const locale = routing.locales.includes(maybeLocale as Locale)
    ? (maybeLocale as Locale)
    : routing.defaultLocale;

  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "");

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathWithoutLocale.startsWith(route),
  );

  if (!token && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
