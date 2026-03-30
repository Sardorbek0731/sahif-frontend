const YEAR = 60 * 60 * 24 * 365;

function getSecure(): string {
  if (typeof window === "undefined") return "";
  return window.location.protocol === "https:" ? "; Secure" : "";
}

export function setCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${YEAR}; SameSite=Lax${getSecure()}`;
}

export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function setLocationCookies(id: string): void {
  setCookie("location-id", id);
  setCookie("location-confirmed", "true");
}

export function confirmLocationCookie(): void {
  setCookie("location-confirmed", "true");
}

export function setThemeCookies(theme: string, resolvedTheme: string): void {
  setCookie("theme", theme);
  setCookie("theme-resolved", resolvedTheme);
}

export function setAuthCookies(token: string, name: string) {
  setCookie("auth-token", token);
  setCookie("user-name", encodeURIComponent(name));
}
