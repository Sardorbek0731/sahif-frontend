const YEAR = 60 * 60 * 24 * 365;

function getSecure() {
  return location.protocol === "https:" ? "; Secure" : "";
}

export function setLocationCookies(id: string) {
  const secure = getSecure();
  document.cookie = `location-id=${id}; path=/; max-age=${YEAR}; SameSite=Lax${secure}`;
  document.cookie = `location-confirmed=true; path=/; max-age=${YEAR}; SameSite=Lax${secure}`;
}

export function confirmLocationCookie() {
  const secure = getSecure();
  document.cookie = `location-confirmed=true; path=/; max-age=${YEAR}; SameSite=Lax${secure}`;
}

export function setThemeCookies(theme: string, resolvedTheme: string) {
  const secure = getSecure();
  document.cookie = `theme=${theme}; path=/; max-age=${YEAR}; SameSite=Lax${secure}`;
  document.cookie = `theme-resolved=${resolvedTheme}; path=/; max-age=${YEAR}; SameSite=Lax${secure}`;
}
