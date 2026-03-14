import {
  THEME_COOKIE,
  THEME_RESOLVED_COOKIE,
  LOCATION_ID_COOKIE,
  LOCATION_CONFIRMED_COOKIE,
} from "@/constants";

const YEAR = 60 * 60 * 24 * 365;

function getSecure() {
  return location.protocol === "https:" ? "; Secure" : "";
}

function setCookie(name: string, value: string) {
  const secure = getSecure();
  document.cookie = `${name}=${value}; path=/; max-age=${YEAR}; SameSite=Lax${secure}`;
}

export function setLocationCookies(id: string) {
  setCookie(LOCATION_ID_COOKIE, id);
  setCookie(LOCATION_CONFIRMED_COOKIE, "true");
}

export function confirmLocationCookie() {
  setCookie(LOCATION_CONFIRMED_COOKIE, "true");
}

export function setThemeCookies(theme: string, resolvedTheme: string) {
  setCookie(THEME_COOKIE, theme);
  setCookie(THEME_RESOLVED_COOKIE, resolvedTheme);
}
