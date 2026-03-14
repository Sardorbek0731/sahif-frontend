import type { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { THEME_COOKIE, THEME_RESOLVED_COOKIE } from "@/constants";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const theme = request.cookies.get(THEME_COOKIE)?.value;
  const resolvedTheme = request.cookies.get(THEME_RESOLVED_COOKIE)?.value;

  const cookieOptions = {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  if (response) {
    if (theme) response.cookies.set(THEME_COOKIE, theme, cookieOptions);
    if (resolvedTheme)
      response.cookies.set(THEME_RESOLVED_COOKIE, resolvedTheme, cookieOptions);
  }

  return response;
}

export const config = {
  matcher: ["/", "/(uz|en|ru)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
