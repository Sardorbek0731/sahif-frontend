import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * Require authentication
 * Agar user login qilmagan bo'lsa, /login'ga redirect qiladi
 *
 * Server Components'da ishlatiladi (Defense in Depth pattern)
 * Middleware'dan keyin ikkinchi himoya qatlami
 *
 * @returns User object
 *
 * @example
 * ```typescript
 * // app/profile/page.tsx
 * export default async function ProfilePage() {
 *   const user = await requireAuth();
 *   return <div>Welcome, {user.firstName}!</div>;
 * }
 * ```
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session.isAuthenticated || !session.user) {
    redirect("/login");
  }

  return session.user;
}

/**
 * Get optional authentication
 * User login qilgan bo'lsa user object, aks holda null qaytaradi
 *
 * @returns User object or null
 *
 * @example
 * ```typescript
 * // app/page.tsx
 * export default async function HomePage() {
 *   const user = await getOptionalAuth();
 *   return <div>{user ? `Hello, ${user.firstName}` : 'Welcome, Guest'}</div>;
 * }
 * ```
 */
export async function getOptionalAuth() {
  const session = await getSession();
  return session.isAuthenticated && session.user ? session.user : null;
}

/**
 * Check if user is authenticated
 * Boolean qaytaradi
 *
 * @returns boolean
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session.isAuthenticated && !!session.user;
}
