import { cookies } from "next/headers";
import { THEME_COOKIE, THEME_RESOLVED_COOKIE } from "@/constants";

export function getInitialTheme(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) {
  const themeCookie = cookieStore.get(THEME_COOKIE)?.value || "system";
  const resolvedThemeCookie = cookieStore.get(THEME_RESOLVED_COOKIE)?.value;
  return themeCookie === "system" ? (resolvedThemeCookie ?? "") : themeCookie;
}
