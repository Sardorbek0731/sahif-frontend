export function formatISBN(isbn: string): string {
  if (!isbn) return "";
  const str = isbn.replace(/\D/g, "");

  if (str.length === 13) {
    return `${str.slice(0, 3)}-${str.slice(3)}`;
  }
  return str;
}
