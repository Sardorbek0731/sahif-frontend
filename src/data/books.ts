import { Book } from "@/types/book";

export const books: readonly Book[] = [
  {
    id: 1,
    slug: "yuksaklik-sari-100-ta-uchrashuv",
    author: "Otabek Mahkamov",
    categorySlugs: ["motivation", "biography-memoirs", "self-development"],
    description: {
      uz: "Muallifning 52 davlatga sayohati davomida Hillari Klinton, Gordon Ramzi va Antonio Banderas kabi 100 ta jahon yulduzi bilan uchrashuvlari tafsiloti. Bu shunchaki xotiralar emas, balki muvaffaqiyatli shaxslardan olingan hayotiy saboqlar va motivatsiya to'plamidir.",
      en: "A collection of 100 remarkable encounters with global icons like Hillary Clinton and Gordon Ramsay across 52 countries. This book offers profound life lessons and success secrets, inspiring readers to pursue their own greatness through real-life stories.",
      ru: "История 100 удивительных встреч с мировыми звездами, такими как Хиллари Клинтон и Гордон Рамзи, в 52 странах. Книга делится жизненными уроками и секретами успеха великих людей, вдохновляя читателя на достижение собственных вершин.",
    },

    originalTitle: "Yuksaklik sari tasodif bo'lmagan 100 ta uchrashuv",
    originalLanguage: "uz",

    images: {
      cover: "/books/yuksaklik-sari-100-ta-uchrashuv/cover.webp",
      gallery: [
        "/books/yuksaklik-sari-100-ta-uchrashuv/gallery/2.webp",
        "/books/yuksaklik-sari-100-ta-uchrashuv/gallery/3.webp",
        "/books/yuksaklik-sari-100-ta-uchrashuv/gallery/4.webp",
      ],
    },

    variants: [
      {
        // Yangi nashr — faqat uz va en tillarida (fleksibl muqova)
        language: "uz-Latn",
        titleInLanguage: "Yuksaklik sari tasodif bo'lmagan 100 ta uchrashuv",
        price: {
          amount: 237000,
          currency: "UZS",
        },
        stockCount: 50,
        stockStatus: "in-stock",
        isbn: "9789943719576",
        pageCount: 680,
        format: "paperback", // Yangi nashr — fleksibl (yumshoq muqova)
        publisher: "Regbooks",
        publishedYear: 2024,
      },
      {
        language: "uz-Cyrl",
        titleInLanguage: "Юксаклик сари тасодиф бўлмаган 100 та учрашув",
        price: {
          amount: 249000,
          currency: "UZS",
        },
        stockCount: 20,
        stockStatus: "in-stock",
        isbn: "9789943719576",
        pageCount: 680,
        format: "hardcover",
        publisher: "Regbooks",
        publishedYear: 2022,
      },
      {
        // Yangi nashr — ingliz tili
        language: "en",
        titleInLanguage: "Serendipitous encounters on the way to the Top",
        price: {
          amount: 169000,
          currency: "UZS",
        },
        stockCount: 30,
        stockStatus: "in-stock",
        isbn: "9789943719583",
        pageCount: 680,
        format: "paperback",
        publisher: "Regbooks",
        publishedYear: 2024,
      },
      {
        // Birinchi nashr — rus tili (faqat 2022 yilgi hardcover nashrda bo'lgan)
        language: "ru",
        titleInLanguage: "На пути к высоте 100 неслучайных встреч",
        price: {
          amount: 430000,
          currency: "UZS",
        },
        stockCount: 5,
        stockStatus: "in-stock",
        isbn: "9789943719590",
        pageCount: 680,
        format: "hardcover",
        publisher: "Regbooks",
        publishedYear: 2022,
      },
    ],

    stats: {
      rating: 4.8,
      reviewCount: 320,
      salesCount: 5000,
    },
    isHero: true,
    isBestseller: true,
    isNew: false,
    createdAt: "2024-11-26T08:00:00Z",
  },
];
