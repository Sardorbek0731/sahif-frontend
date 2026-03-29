const YEAR = 60 * 60 * 24 * 365;

function getSecure() {
  return location.protocol === "https:" ? "; Secure" : "";
}

export function setCookie(name: string, value: string) {
  const secure = getSecure();
  document.cookie = `${name}=${value}; path=/; max-age=${YEAR}; SameSite=Lax${secure}`;
}

export function setLocationCookies(id: string) {
  setCookie("location-id", id);
  setCookie("location-confirmed", "true");
}

export function confirmLocationCookie() {
  setCookie("location-confirmed", "true");
}

export function setThemeCookies(theme: string, resolvedTheme: string) {
  setCookie("theme", theme);
  setCookie("theme-resolved", resolvedTheme);
}

export function setAuthCookies(token: string, name: string) {
  setCookie("auth-token", token);
  setCookie("user-name", encodeURIComponent(name)); 
}

export function removeAuthCookies() {
  document.cookie = "auth-token=; path=/; max-age=0";
  document.cookie = "user-name=; path=/; max-age=0";
}