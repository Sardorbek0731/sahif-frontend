import { CategorySlug } from "./categories";

export interface Book {
  readonly id: number; // Unique identifier for the database
  readonly slug: string; // URL-friendly title for SEO (e.g., 'otkan-kunlar')
  readonly title: string; // Official book title as shown on the cover
  readonly author: string; // Name of the primary author
  readonly translator?: string; // Translator's name for international books
  readonly categorySlugs: CategorySlug[]; // List of categories the book belongs to

  price: {
    amount: number; // Current retail price (gross price)
    currency: "UZS" | "USD"; // ISO currency code
    discountAmount?: number; // Subtracted value for sales (net price = amount - discount)
  };

  stats: {
    rating: number; // Average user rating (from 0 to 5)
    reviewCount: number; // Total number of user-submitted reviews
    salesCount?: number; // Total units sold (for "Most Popular" sorting)
  };

  images: {
    cover: string; // High-resolution main image (Hero/Details page)
    thumbnail: string; // Compressed low-res image (Catalog/List view)
    gallery?: string[]; // Additional photos of the book's interior or back
  };

  details: {
    language: ("uz" | "en" | "ru")[]; // The language the book is written in
    format: "hardcover" | "paperback" | "ebook" | "audio"; // Physical or digital type
    paperFormat: string; // Paper format
    pageCount: number; // Total number of pages in the book
    isbn?: string; // International Standard Book Number (unique global ID)
    publishedYear: number; // Year the book was officially released
    publisher?: string; // Publishing house name (e.g., 'Asaxiy Books')
  };

  description: string; // Detailed summary or marketing blurb of the book

  // UI Flags (Used for badges and filtering)
  isHero: boolean; // Should the book appear in the main Top Slider?
  isBestseller: boolean; // Display "Bestseller" badge/tag
  isNew: boolean; // Display "New Arrival" badge/tag
  stockStatus: "in-stock" | "out-of-stock" | "pre-order"; // Inventory availability
  stockCount: number;

  createdAt: string; // ISO Date string for "Sort by Date" functionality
}
