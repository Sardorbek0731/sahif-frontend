export type CategorySlug =
  | "fiction"
  | "science"
  | "technology"
  | "history"
  | "art"
  | "business"
  | "law"
  | "medicine"
  | "it"
  | "engineering"
  | "cooking"
  | "travel"
  | "religion"
  | "philosophy"
  | "children"
  | "mystery"
  | "fantasy"
  | "biography"
  | "non-fiction";

export enum CategoryGroupName {
  Professional = "Professional",
  SpecialInterest = "SpecialInterest",
  Leisure = "Leisure",
}

export interface SubCategory {
  slug: CategorySlug;
  id: number;
  isFamous?: boolean;
}

export interface CategoryGroup {
  name: CategoryGroupName;
  subCategories: SubCategory[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    name: CategoryGroupName.Professional,
    subCategories: [
      { id: 1, slug: "business", isFamous: true },
      { id: 2, slug: "law" },
      { id: 3, slug: "medicine" },
      { id: 4, slug: "it", isFamous: true },
      { id: 5, slug: "engineering" },
    ],
  },
  {
    name: CategoryGroupName.SpecialInterest,
    subCategories: [
      { id: 6, slug: "cooking" },
      { id: 7, slug: "travel", isFamous: true },
      { id: 8, slug: "religion" },
      { id: 9, slug: "philosophy" },
    ],
  },
  {
    name: CategoryGroupName.Leisure,
    subCategories: [
      { id: 10, slug: "fiction", isFamous: true },
      { id: 11, slug: "science", isFamous: true },
      { id: 12, slug: "technology", isFamous: true },
      { id: 13, slug: "history", isFamous: true },
      { id: 14, slug: "art", isFamous: true },
      { id: 15, slug: "children", isFamous: true },
      { id: 16, slug: "mystery" },
      { id: 17, slug: "fantasy" },
      { id: 18, slug: "biography" },
      { id: 19, slug: "non-fiction" },
    ],
  },
];

export const famousSubCategories = categoryGroups
  .flatMap((group) => group.subCategories)
  .filter((cat) => cat.isFamous);
