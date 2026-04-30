/**
 * Cookie utilities
 * Used for theme, location, and other non-auth cookies
 *
 * Note: For authentication, use Server Actions and iron-session:
 * - src/app/actions/auth.ts
 * - src/lib/session.ts
 */

const YEAR = 60 * 60 * 24 * 365;

function getSecure(): string {
  if (typeof window === "undefined") return "";
  return window.location.protocol === "https:" ? "; Secure" : "";
}

/**
 * Set a cookie with 1 year expiration
 * Used for theme and location preferences
 */
export function setCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${YEAR}; SameSite=Lax${getSecure()}`;
}

/**
 * Set location cookies (location-id and location-confirmed)
 */
export function setLocationCookies(id: string): void {
  setCookie("location-id", id);
  setCookie("location-confirmed", "true");
}

/**
 * Confirm location cookie
 */
export function confirmLocationCookie(): void {
  setCookie("location-confirmed", "true");
}
