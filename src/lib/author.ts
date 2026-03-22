import { authors } from "@/data/authors";
import { type Author } from "@/types/author";

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getAuthorName(slug: string): string {
  return getAuthor(slug)?.name ?? slug;
}
