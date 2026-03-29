import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { type Locale, routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  const segments = pathname.split("/");
  const locale = routing.locales.includes(segments[1] as Locale)
    ? (segments[1] as Locale)
    : routing.defaultLocale;

  const isProtectedRoute = /^\/(uz|en|ru)\/profile($|\/)/.test(pathname);

  if (!token && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`; 
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
