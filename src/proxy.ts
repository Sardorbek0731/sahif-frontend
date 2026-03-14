import type { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const theme = request.cookies.get("theme")?.value;
  const resolvedTheme = request.cookies.get("theme-resolved")?.value;

  const cookieOptions = {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  if (theme && response) response.cookies.set("theme", theme, cookieOptions);
  if (resolvedTheme && response)
    response.cookies.set("theme-resolved", resolvedTheme, cookieOptions);

  return response;
}

export const config = {
  matcher: ["/", "/(uz|en|ru)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
