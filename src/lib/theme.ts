import { cookies } from "next/headers";

export function getInitialTheme(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): string {
  return cookieStore.get("theme")?.value ?? "system";
}

export function getResolvedTheme(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): string {
  const theme = getInitialTheme(cookieStore);
  const resolved = cookieStore.get("theme-resolved")?.value;
  return theme === "system" ? (resolved ?? "light") : theme;
}
