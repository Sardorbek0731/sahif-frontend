import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getIronSession } from "iron-session";
import { type Locale, routing } from "./i18n/routing";
import { SessionData, sessionOptions } from "./lib/session";

const intlMiddleware = createMiddleware(routing);

// ═══════════════════════════════════════════════════════════════════════════
// ROUTE PROTECTION STRATEGY
// ═══════════════════════════════════════════════════════════════════════════

/**
 * PROTECTED_ROUTES: Require authentication (redirect to /login if not authenticated)
 * - /profile: User profile page (personal data, settings)
 *
 * PUBLIC ROUTES (not in this list):
 * - /cart: Shopping cart (guest users can add items, data stored in localStorage)
 * - /wishlist: Wishlist (guest users can save items, data stored in localStorage)
 * - /books, /authors, /: Public pages (everyone can access)
 *
 * Why cart/wishlist are public?
 * - Better UX: Users can shop without creating an account
 * - Higher conversion rate: No friction before checkout
 * - Guest cart → User cart: When user logs in, guest data is merged
 * - Industry standard: Amazon, eBay, AliExpress all work this way
 */
const PROTECTED_ROUTES = ["/profile"];

/**
 * AUTH_ROUTES: Redirect to home if already authenticated
 * - /login: Login page (logged-in users don't need to see this)
 */
const AUTH_ROUTES = ["/login"];

/**
 * ADMIN_ROUTES: Redirect to home if not authenticated
 * - /admin: Admin panel (TODO: add role-based access control)
 */
const ADMIN_ROUTES = ["/admin"];

// ═══════════════════════════════════════════════════════════════════════════
// PROXY FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

export async function proxy(request: NextRequest) {
  // ───────────────────────────────────────────────────────────────────────────
  // 🛡️ CVE-2025-29927 PROTECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (request.headers.has("x-middleware-subrequest")) {
    console.warn(
      "[SECURITY] Blocked request with x-middleware-subrequest header",
    );
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { pathname } = request.nextUrl;

  // ───────────────────────────────────────────────────────────────────────────
  // Extract locale and path
  // ───────────────────────────────────────────────────────────────────────────

  const [, maybeLocale] = pathname.split("/");
  const locale = routing.locales.includes(maybeLocale as Locale)
    ? (maybeLocale as Locale)
    : routing.defaultLocale;

  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "");

  // ───────────────────────────────────────────────────────────────────────────
  // Check route type
  // ───────────────────────────────────────────────────────────────────────────

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathWithoutLocale.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathWithoutLocale.startsWith(route),
  );
  const isAdminRoute = ADMIN_ROUTES.some((route) =>
    pathWithoutLocale.startsWith(route),
  );

  // Skip authentication check for public routes
  if (!isProtectedRoute && !isAuthRoute && !isAdminRoute) {
    return intlMiddleware(request);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Get session
  // ───────────────────────────────────────────────────────────────────────────

  let session: SessionData;
  const response = NextResponse.next();

  try {
    session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions,
    );
  } catch (error) {
    console.error("[Proxy] Session error:", error);
    session = { isAuthenticated: false };
  }

  const isAuthenticated = session.isAuthenticated && !!session.user;

  // ───────────────────────────────────────────────────────────────────────────
  // Route protection logic
  // ───────────────────────────────────────────────────────────────────────────

  // Protected routes: Redirect to login if not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    url.searchParams.set("from", pathWithoutLocale);
    return NextResponse.redirect(url);
  }

  // Auth routes: Redirect to home if already authenticated
  if (isAuthRoute && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // Admin routes: Redirect to home if not authenticated
  if (isAdminRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // Continue with next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
