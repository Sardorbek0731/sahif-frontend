export function formatISBN(isbn: number): string {
  const str = isbn.toString();
  return `${str.slice(0, 3)}-${str.slice(3, 7)}-${str.slice(7, 9)}-${str.slice(9, 12)}-${str.slice(12)}`;
}
