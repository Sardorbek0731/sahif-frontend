// 1. Kitob nashr etilishi mumkin bo'lgan barcha tillar
export type LanguageCode = "uz-Latn" | "uz-Cyrl" | "en" | "ru" | string;

// 2. Sayt interfeysi tushunadigan asosiy tillar
export type SupportedLocale = "uz" | "en" | "ru";

// 3. Kitobning jismoniy ko'rinishi
export type BookFormat = "hardcover" | "paperback" | "ebook" | "audio";

// 4. Omborxonadagi holati
export type StockStatus = "in-stock" | "out-of-stock" | "pre-order";

// 5. Valyuta turi
export type Currency = "UZS" | "USD";

// --- Narx va chegirma tizimi ---
interface BookPrice {
  readonly amount: number; // Haqiqiy narxi (masalan: 65000)
  readonly currency: Currency; // Valyuta (UZS)
  readonly discountAmount?: number; // Chegirma summasi (net price = amount - discountAmount)
}

// --- Har bir til nashri uchun alohida ma'lumotlar (Variant) ---
interface BookVariant {
  readonly language: LanguageCode; // Nashr tili (uz-Latn, ru, en)
  readonly titleInLanguage?: string; // Shu tildagi nomi (masalan: "Alkimyogar")

  // Savdo ma'lumotlari
  readonly price: BookPrice;
  readonly stockCount: number; // Omborxonadagi soni
  readonly stockStatus: StockStatus;

  // Texnik ma'lumotlar (Nashrga qarab o'zgaradi)
  readonly isbn: string; // Shu nashrning xalqaro kodi
  readonly pageCount: number; // Sahifalar soni
  readonly format: BookFormat; // Muqova turi
  readonly publisher: string; // Nashriyot nomi
  readonly publishedYear: number; // Chop etilgan yili

  // Vizual (Ixtiyoriy)
  readonly variantImage?: string; // Shu nashrning maxsus muqova rasmi
}

// --- Umumiy statistika ---
interface BookStats {
  readonly rating: number; // O'rtacha baho (0-5)
  readonly reviewCount: number; // Sharhlar soni
  readonly salesCount: number; // Jami sotilgan nusxalar
}

// --- ASOSIY KITOB MODELI ---
export interface Book {
  // --- Global (O'zgarmas) Ma'lumotlar ---
  readonly id: number; // Baza uchun ID
  readonly slug: string; // URL uchun identifikator
  readonly author: string; // Muallif ismi
  readonly categorySlugs: string[]; // Janrlar (slub ko'rinishida)

  // --- Kitob haqida qisqacha ma'lumot (Marketing tavsifi) ---
  readonly description: Record<SupportedLocale, string>; // Faqat uz, en, ru bo'lishini kafolatlaydi

  // --- Faktik / Asl ma'lumotlar ---
  readonly originalTitle: string; // Asl nomi (Original Title)
  readonly originalLanguage: LanguageCode; // Asl tili (Original Language)
  readonly mainCoverImage: string; // Asosiy/Zaxira muqova rasmi

  // --- Nashrlar / Variantlar ---
  readonly variants: BookVariant[]; // Do'konda mavjud barcha nashrlar ro'yxati

  // --- UI va Marketing (Flaglar) ---
  readonly stats: BookStats;
  readonly isHero: boolean; // Bosh sahifadagi slayder uchun
  readonly isBestseller: boolean; // "Bestseller" belgisi
  readonly isNew: boolean; // "Yangi" belgisi

  // --- Meta ---
  readonly createdAt: string; // Qo'shilgan vaqti (ISO formatda)
}
