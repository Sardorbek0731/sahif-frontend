const YEAR = 60 * 60 * 24 * 365;

export function setLocationCookies(id: string) {
  document.cookie = `location-id=${id}; path=/; max-age=${YEAR}; SameSite=Lax`;
  document.cookie = `location-confirmed=true; path=/; max-age=${YEAR}; SameSite=Lax`;
}

export function confirmLocationCookie() {
  document.cookie = `location-confirmed=true; path=/; max-age=${YEAR}; SameSite=Lax`;
}

export function setThemeCookies(theme: string, resolvedTheme: string) {
  document.cookie = `theme=${theme}; path=/; max-age=${YEAR}; SameSite=Lax`;
  document.cookie = `theme-resolved=${resolvedTheme}; path=/; max-age=${YEAR}; SameSite=Lax`;
}
