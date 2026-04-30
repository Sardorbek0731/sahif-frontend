/**
 * Converts a string to a URL-friendly slug
 * Removes special characters and replaces them with ASCII equivalents
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Decompose combined characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

/**
 * Examples:
 * slugify("Antoine de Saint-Exupéry") => "antoine-de-saint-exupery"
 * slugify("Café Müller") => "cafe-muller"
 * slugify("Преступление и наказание") => "prestuplenie-i-nakazanie" (requires transliteration)
 */
