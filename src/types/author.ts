import { SupportedLocale } from "./book";

export interface Author {
  readonly id: number;
  readonly slug: string;
  readonly name: string;
  readonly image?: string;
  readonly bio: Record<SupportedLocale, string>;
}