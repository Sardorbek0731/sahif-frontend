import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}`, request.url),
      301,
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(uz|en|ru)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
