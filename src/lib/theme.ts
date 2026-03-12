import { cookies } from "next/headers";

export function getInitialTheme(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) {
  const themeCookie = cookieStore.get("theme")?.value || "system";
  const resolvedThemeCookie = cookieStore.get("theme-resolved")?.value;
  return themeCookie === "system" ? (resolvedThemeCookie ?? "") : themeCookie;
}
