import { CategorySlug } from "@/data/categories";

// ─── Price ───────────────────────────────────────────────────────────────────

interface BookPrice {
  readonly amount: number; // Current retail price (gross price)
  readonly currency: "UZS" | "USD"; // ISO currency code
  readonly discountAmount?: number; // Subtracted value for sales (net price = amount - discountAmount)
}

// ─── Stats ────────────────────────────────────────────────────────────────────

interface BookStats {
  readonly rating: number; // Average user rating (0 to 5)
  readonly reviewCount: number; // Total number of user-submitted reviews
  readonly salesCount?: number; // Total units sold (for "Most Popular" sorting)
}

// ─── Images ──────────────────────────────────────────────────────────────────

interface BookImages {
  readonly cover: string; // High-resolution main image (Hero/Details page)
  readonly thumbnail: string; // Compressed low-res image (Catalog/List view)
  readonly gallery?: string[]; // Additional photos of the book's interior or back
}

// ─── Details ─────────────────────────────────────────────────────────────────

type BookLanguage = "uz" | "en" | "ru";
type BookFormat = "hardcover" | "paperback" | "ebook" | "audio";

interface BookDetails {
  readonly language: BookLanguage[]; // The language the book is written in
  readonly format: BookFormat; // Physical or digital type
  readonly paperFormat: string; // Paper size format (e.g., '60x84/16')
  readonly pageCount: number; // Total number of pages
  readonly isbn?: number; // International Standard Book Number
  readonly publishedYear: number; // Year the book was officially released
  readonly publisher?: string; // Publishing house name (e.g., 'Asaxiy Books')
}

// ─── Stock ───────────────────────────────────────────────────────────────────

type StockStatus = "in-stock" | "out-of-stock" | "pre-order";

// ─── Book ────────────────────────────────────────────────────────────────────

export interface Book {
  // Identity
  readonly id: number; // Unique identifier for the database
  readonly slug: string; // URL-friendly identifier for SEO (e.g., 'otkan-kunlar')
  readonly title: string; // Official book title as shown on the cover
  readonly author: string; // Name of the primary author
  readonly translator?: string; // Translator's name for international books
  readonly categorySlugs: CategorySlug[]; // List of categories the book belongs to

  // Pricing
  readonly price: BookPrice;

  // Statistics
  readonly stats: BookStats;

  // Media
  readonly images: BookImages;

  // Details
  readonly details: BookDetails;

  // Inventory
  readonly stockStatus: StockStatus; // Inventory availability
  readonly stockCount: number; // Number of units available in stock

  // UI Flags (used for badges and filtering)
  readonly isHero: boolean; // Should the book appear in the main Top Slider?
  readonly isBestseller: boolean; // Display "Bestseller" badge
  readonly isNew: boolean; // Display "New Arrival" badge

  // Meta
  readonly createdAt: string; // ISO Date string for "Sort by Date" functionality
}
