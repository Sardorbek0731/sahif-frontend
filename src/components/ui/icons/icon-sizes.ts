/**
 * Icon Size Constants
 *
 * Loyiha bo'ylab bir xil icon o'lchamlarini ta'minlash uchun.
 * Har bir o'lcham o'zining kontekstiga mos keladi.
 */

export const ICON_SIZES = {
  xs: 12, // Juda kichik: badges, tiny indicators
  sm: 14, // Kichik: small buttons, footer chips
  md: 16, // O'rta (default): buttons, inputs, menu items
  lg: 18, // Katta: large buttons, navigation controls
  xl: 22, // Juda katta: feature highlights
  "2xl": 24, // Hero: special emphasis
  "3xl": 32, // Extra large: decorative
  "4xl": 48, // Huge: hero sections
  "5xl": 120, // Massive: 404 pages
} as const;

export type IconSize = keyof typeof ICON_SIZES;

/**
 * Icon size'ni olish helper function
 */
export function getIconSize(size: IconSize | number): number {
  if (typeof size === "number") return size;
  return ICON_SIZES[size];
}
