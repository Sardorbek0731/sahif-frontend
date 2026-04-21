// ----------
// 1. Slug literal list (single source of truth)
// ----------

export const CATEGORY_SLUGS = [
  "classic-literature",
  "contemporary-fiction",
  "mystery-thriller",
  "fantasy",
  "science-fiction",
  "romance",
  "historical-fiction",
  "horror",
  "poetry",
  "drama",

  "children-books",
  "fairy-tales",
  "young-adult",
  "comics-graphic-novels",

  "psychology",
  "self-development",
  "motivation",
  "spirituality",
  "philosophy",

  "business-finance",
  "management-marketing",
  "economics",
  "politics",
  "law",
  "sociology",

  "it-programming",
  "science-nature",
  "medicine-health",
  "engineering",
  "history",
  "education-pedagogy",
  "languages",

  "cooking-culinary",
  "travel-geography",
  "art-design",
  "biography-memoirs",
  "sports-hobbies",
  "culture",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

// ----------
// 2. Group names (enum o‘rniga const + union → yaxshiroq DX)
// ----------

export const CATEGORY_GROUPS = [
  "fiction",
  "children",
  "selfImprovement",
  "businessSociety",
  "scienceEducation",
  "lifestyle",
] as const;

export type CategoryGroupName = (typeof CATEGORY_GROUPS)[number];

// ----------
// 3. Core Types
// ----------

export interface Category {
  readonly id: number;
  readonly slug: CategorySlug;
  readonly isPopular?: boolean;
}

export interface CategoryGroup {
  readonly name: CategoryGroupName;
  readonly categories: readonly Category[];
}

// ----------
// 4. Category Data (fully typed, immutable)
// ----------

export const categoryGroups: readonly CategoryGroup[] = [
  {
    name: "fiction",
    categories: [
      { id: 101, slug: "classic-literature", isPopular: true },
      { id: 102, slug: "contemporary-fiction" },
      { id: 103, slug: "mystery-thriller" },
      { id: 104, slug: "fantasy", isPopular: true },
      { id: 105, slug: "science-fiction" },
      { id: 106, slug: "romance" },
      { id: 107, slug: "historical-fiction" },
      { id: 108, slug: "horror" },
      { id: 109, slug: "poetry" },
      { id: 110, slug: "drama", isPopular: true },
    ],
  },
  {
    name: "children",
    categories: [
      { id: 201, slug: "children-books", isPopular: true },
      { id: 202, slug: "fairy-tales" },
      { id: 203, slug: "young-adult" },
      { id: 204, slug: "comics-graphic-novels" },
    ],
  },
  {
    name: "selfImprovement",
    categories: [
      { id: 301, slug: "psychology" },
      { id: 302, slug: "self-development", isPopular: true },
      { id: 303, slug: "motivation" },
      { id: 304, slug: "spirituality" },
      { id: 305, slug: "philosophy" },
    ],
  },
  {
    name: "businessSociety",
    categories: [
      { id: 401, slug: "business-finance" },
      { id: 402, slug: "management-marketing" },
      { id: 403, slug: "economics" },
      { id: 404, slug: "politics" },
      { id: 405, slug: "law" },
      { id: 406, slug: "sociology" },
    ],
  },
  {
    name: "scienceEducation",
    categories: [
      { id: 501, slug: "it-programming", isPopular: true },
      { id: 502, slug: "science-nature" },
      { id: 503, slug: "medicine-health", isPopular: true },
      { id: 504, slug: "engineering" },
      { id: 505, slug: "history" },
      { id: 506, slug: "education-pedagogy" },
      { id: 507, slug: "languages" },
    ],
  },
  {
    name: "lifestyle",
    categories: [
      { id: 601, slug: "biography-memoirs", isPopular: true },
      { id: 602, slug: "art-design" },
      { id: 603, slug: "cooking-culinary" },
      { id: 604, slug: "travel-geography" },
      { id: 605, slug: "sports-hobbies" },
      { id: 606, slug: "culture" },
    ],
  },
] as const;

// ----------
// 5. Derived Helpers (zero duplication, full typing)
// ----------

export const allCategories = categoryGroups.flatMap<Category>(
  (group) => group.categories,
);

export const popularCategories = allCategories.filter((cat) => cat.isPopular);

export const categoryBySlug = Object.fromEntries(
  allCategories.map((cat) => [cat.slug, cat]),
) as Record<CategorySlug, Category>;

export function isValidCategory(
  slug: string | undefined,
): slug is CategorySlug {
  return !!slug && (CATEGORY_SLUGS as readonly string[]).includes(slug);
}
