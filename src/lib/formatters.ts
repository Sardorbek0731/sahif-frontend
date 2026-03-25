export function formatISBN(isbn: string): string {
  if (!isbn) return "";
  const str = isbn.replace(/\D/g, "");

  if (str.length === 13) {
    return `${str.slice(0, 3)}-${str.slice(3, 7)}-${str.slice(7, 9)}-${str.slice(9, 12)}-${str.slice(12)}`;
  }
  return str;
}
