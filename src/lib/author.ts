import { authors } from "@/data/authors";
import { books } from "@/data/books";
import { type Author } from "@/types/author";
import { type Book } from "@/types/book";

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getAuthorName(slug: string): string {
  return getAuthor(slug)?.name ?? slug;
}

export function getBooksByAuthor(authorSlug: string): Book[] {
  return books.filter((b) => b.authorSlug === authorSlug);
}
