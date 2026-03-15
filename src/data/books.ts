import { Book } from "@/types/book";

export const books: readonly Book[] = [
  {
    id: 101,
    slug: "the-alchemist",
    author: "Paulo Coelho",
    categorySlugs: ["philosophy", "adventure", "classic"],
    description: {
      uz: "Jahon adabiyotining durdonasi. Cho'pon yigitcha Santyagoning o'z orzusi va 'Shaxsiy afsonasi'ni topish yo'lidagi sarguzashtlari orqali inson o'z qalbiga quloq tutishi va taqdir belgilarini anglay olishi haqida hikoya qiluvchi falsafiy asar.",
      en: "A global phenomenon and modern classic. This inspiring tale follows Santiago, a shepherd boy, on his journey to find a worldly treasure, teaching us the importance of listening to our hearts and pursuing our dreams.",
      ru: "Мировой бестселлер и современная классика. Вдохновляющая история о пастухе Сантьяго, который отправляется на поиски сокровищ, напоминая нам о важности следовать своей судьбе и прислушиваться к велению сердца.",
    },

    // --- Asl (Original) Ma'lumotlar ---
    originalTitle: "O Alquimista",
    originalLanguage: "pt", // Portugal tili
    mainCoverImage: "/books/the-alchemist/cover.jpg",

    // --- Nashrlar (Variantlar) ---
    variants: [
      {
        language: "uz-Latn",
        titleInLanguage: "Alkimyogar",
        price: {
          amount: 75000,
          currency: "UZS",
          discountAmount: 15000,
        },
        stockCount: 45, // Sotuvda bor
        stockStatus: "in-stock",
        isbn: "9789943076543",
        pageCount: 224,
        format: "paperback",
        publisher: "Yangi asr avlodi",
        publishedYear: 2022,
        // variantImage yo'q, tizim mainCoverImage'dan foydalanadi
      },
      {
        language: "en",
        titleInLanguage: "The Alchemist",
        price: {
          amount: 280000,
          currency: "UZS",
        },
        stockCount: 3, // Juda kam qolgan
        stockStatus: "in-stock",
        isbn: "9780062315007",
        pageCount: 208,
        format: "hardcover",
        publisher: "HarperOne",
        publishedYear: 2014,
        // variantImage yo'q, tizim mainCoverImage'dan foydalanadi
      },
      {
        language: "ru",
        titleInLanguage: "Алхимик",
        price: {
          amount: 95000,
          currency: "UZS",
        },
        stockCount: 0, // TUGAGAN
        stockStatus: "out-of-stock",
        isbn: "9785170881673",
        pageCount: 256,
        format: "paperback",
        publisher: "AST",
        publishedYear: 2021,
        // variantImage yo'q, tizim mainCoverImage'dan foydalanadi
      },
    ],

    stats: {
      rating: 4.9,
      reviewCount: 850,
      salesCount: 12000,
    },
    isHero: true,
    isBestseller: true,
    isNew: false,
    createdAt: "2024-05-12T10:00:00Z",
  },
];
