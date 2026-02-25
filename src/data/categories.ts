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

export interface SubCategory {
  readonly id: number;
  readonly slug: CategorySlug;
  readonly isFamous?: boolean;
}

export interface CategoryGroup {
  readonly name: CategoryGroupName;
  readonly subCategories: readonly SubCategory[];
}

// ----------
// 4. Category Data (fully typed, immutable)
// ----------

export const categoryGroups = [
  {
    name: "fiction",
    subCategories: [
      { id: 101, slug: "classic-literature", isFamous: true },
      { id: 102, slug: "contemporary-fiction" },
      { id: 103, slug: "mystery-thriller" },
      { id: 104, slug: "fantasy", isFamous: true },
      { id: 105, slug: "science-fiction" },
      { id: 106, slug: "romance" },
      { id: 107, slug: "historical-fiction" },
      { id: 108, slug: "horror" },
      { id: 109, slug: "poetry" },
      { id: 110, slug: "drama" },
    ],
  },
  {
    name: "children",
    subCategories: [
      { id: 201, slug: "children-books", isFamous: true },
      { id: 202, slug: "fairy-tales" },
      { id: 203, slug: "young-adult" },
      { id: 204, slug: "comics-graphic-novels" },
    ],
  },
  {
    name: "selfImprovement",
    subCategories: [
      { id: 301, slug: "psychology" },
      { id: 302, slug: "self-development", isFamous: true },
      { id: 303, slug: "motivation" },
      { id: 304, slug: "spirituality" },
      { id: 305, slug: "philosophy" },
    ],
  },
  {
    name: "businessSociety",
    subCategories: [
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
    subCategories: [
      { id: 501, slug: "it-programming", isFamous: true },
      { id: 502, slug: "science-nature" },
      { id: 503, slug: "medicine-health" },
      { id: 504, slug: "engineering" },
      { id: 505, slug: "history" },
      { id: 506, slug: "education-pedagogy" },
      { id: 507, slug: "languages" },
    ],
  },
  {
    name: "lifestyle",
    subCategories: [
      { id: 601, slug: "biography-memoirs", isFamous: true },
      { id: 602, slug: "art-design" },
      { id: 603, slug: "cooking-culinary" },
      { id: 604, slug: "travel-geography" },
      { id: 605, slug: "sports-hobbies" },
      { id: 606, slug: "culture" },
    ],
  },
] satisfies readonly CategoryGroup[];

// ----------
// 5. Derived Helpers (zero duplication, full typing)
// ----------

export const allSubCategories = categoryGroups.flatMap<SubCategory>(
  (group) => group.subCategories,
);

export const famousSubCategories = allSubCategories.filter(
  (cat): cat is SubCategory & { isFamous: true } => !!cat.isFamous,
);

export const subCategoryBySlug = Object.fromEntries(
  allSubCategories.map((cat) => [cat.slug, cat]),
) as Record<CategorySlug, SubCategory>;
