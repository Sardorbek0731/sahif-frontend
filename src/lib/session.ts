import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

/**
 * Session data structure
 * Bu interface session'da saqlanadigan ma'lumotlarni belgilaydi
 */
export interface SessionData {
  user?: {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
  isAuthenticated: boolean;
}

/**
 * Session configuration
 * iron-session uchun xavfsizlik sozlamalari
 *
 * IMPORTANT: This is the single source of truth for session options
 * Both src/lib/session.ts and src/proxy.ts use this configuration
 */
export const sessionOptions: SessionOptions = {
  // 32+ characters secret key (environment variable'dan)
  password: process.env.SESSION_SECRET!,

  // Cookie nomi
  cookieName: "sahif_session",

  // Cookie sozlamalari
  cookieOptions: {
    // ✅ HttpOnly - JavaScript orqali o'qib bo'lmaydi (XSS himoyasi)
    httpOnly: true,

    // ✅ Secure - Faqat HTTPS'da ishlaydi (production'da)
    secure: process.env.NODE_ENV === "production",

    // ✅ SameSite - CSRF himoyasi
    sameSite: "lax" as const,

    // Cookie muddati - 1 yil
    maxAge: 60 * 60 * 24 * 365,

    // Cookie path
    path: "/",
  },
};

/**
 * Get current session
 * Server Components va Server Actions'da ishlatiladi
 *
 * @returns Promise<IronSession<SessionData>>
 *
 * @example
 * ```typescript
 * const session = await getSession();
 * console.log(session.user);
 * ```
 */
export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
