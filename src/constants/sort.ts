export const SORT_OPTIONS = [
  "popular",
  "new",
  "rating",
  "price-asc",
  "price-desc",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];
