import { Book } from "@/types/book";

export const books: readonly Book[] = [
  {
    id: 101,
    slug: "the-alchemist",
    author: "Paulo Coelho",
    categorySlugs: ["philosophy", "classic-literature"],
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

  {
    id: 102,
    slug: "otkan-kunlar",
    author: "Abdulla Qodiriy",
    categorySlugs: ["classic-literature", "romance", "historical-fiction"],
    description: {
      uz: "O'zbek adabiyotining birinchi romani. Otabek va Kumushning fojiaviy muhabbat qissasi orqali XIX asr O'zbekistonidagi ijtimoiy hayot, urf-odatlar va mustamlaka davridagi milliy ruh aks ettirilgan buyuk asar.",
      en: "The first Uzbek novel and a timeless masterpiece. Through the tragic love story of Otabek and Kumush, it vividly portrays 19th-century Uzbek society, traditions, and the national spirit under colonial pressure.",
      ru: "Первый узбекский роман и бессмертный шедевр. Через трагическую историю любви Отабека и Кумуш ярко изображается узбекское общество XIX века, традиции и национальный дух в эпоху колониального давления.",
    },

    // --- Asl (Original) Ma'lumotlar ---
    originalTitle: "O'tkan kunlar",
    originalLanguage: "uz",
    mainCoverImage: "/books/otkan-kunlar/cover.jpg",

    // --- Nashrlar (Variantlar) ---
    variants: [
      {
        language: "uz-Latn",
        titleInLanguage: "O'tkan kunlar",
        price: {
          amount: 65000,
          currency: "UZS",
          discountAmount: 10000,
        },
        stockCount: 120,
        stockStatus: "in-stock",
        isbn: "9789943510234",
        pageCount: 416,
        format: "paperback",
        publisher: "Sharq",
        publishedYear: 2023,
      },
      {
        language: "uz-Cyrl",
        titleInLanguage: "Ўтган кунлар",
        price: {
          amount: 70000,
          currency: "UZS",
        },
        stockCount: 18,
        stockStatus: "in-stock",
        isbn: "9789943510241",
        pageCount: 432,
        format: "hardcover",
        publisher: "Yangi asr avlodi",
        publishedYear: 2021,
      },
      {
        language: "ru",
        titleInLanguage: "Минувшие дни",
        price: {
          amount: 88000,
          currency: "UZS",
        },
        stockCount: 10,
        stockStatus: "out-of-stock",
        isbn: "9785892071124",
        pageCount: 448,
        format: "paperback",
        publisher: "G'afur G'ulom",
        publishedYear: 2019,
      },
    ],

    stats: {
      rating: 4.8,
      reviewCount: 1240,
      salesCount: 18500,
    },
    isHero: false,
    isBestseller: true,
    isNew: false,
    createdAt: "2024-06-01T09:00:00Z",
  },

  {
    id: 103,
    slug: "sariq-devni-minib",
    author: "Xudoyberdi To'xtaboyev",
    categorySlugs: ["classic-literature", "children-books"],
    description: {
      uz: "O'zbek bolalar adabiyotining eng sevimli asarlaridan biri. Hasan va uning do'sti Nozimning g'ayrioddiy sarguzashtlari orqali do'stlik, jasorat va yaxshilik g'oyalarini yorqin va hazil-mutoyiba uslubida tasvirlaydigan o'lmas asar.",
      en: "One of the most beloved works of Uzbek children's literature. Through the extraordinary adventures of Hasan and his friend Nozim, this timeless story vividly portrays the values of friendship, courage, and kindness with humor and wit.",
      ru: "Одно из самых любимых произведений узбекской детской литературы. Через удивительные приключения Хасана и его друга Нозима эта бессмертная история ярко изображает ценности дружбы, смелости и доброты с юмором и остроумием.",
    },

    // --- Asl (Original) Ma'lumotlar ---
    originalTitle: "Sariq devni minib",
    originalLanguage: "uz",
    mainCoverImage: "/books/sariq-devni-minib/cover.jpg",

    // --- Nashrlar (Variantlar) ---
    variants: [
      {
        language: "uz-Latn",
        titleInLanguage: "Sariq devni minib",
        price: {
          amount: 55000,
          currency: "UZS",
          discountAmount: 10000,
        },
        stockCount: 80,
        stockStatus: "in-stock",
        isbn: "9789943510456",
        pageCount: 312,
        format: "paperback",
        publisher: "Sharq",
        publishedYear: 2023,
      },
      {
        language: "uz-Cyrl",
        titleInLanguage: "Сариқ девни миниб",
        price: {
          amount: 60000,
          currency: "UZS",
        },
        stockCount: 24,
        stockStatus: "in-stock",
        isbn: "9789943510463",
        pageCount: 328,
        format: "hardcover",
        publisher: "G'afur G'ulom",
        publishedYear: 2020,
      },
      {
        language: "ru",
        titleInLanguage: "Верхом на жёлтом дьяволе",
        price: {
          amount: 72000,
          currency: "UZS",
        },
        stockCount: 0,
        stockStatus: "out-of-stock",
        isbn: "9785892073128",
        pageCount: 336,
        format: "paperback",
        publisher: "G'afur G'ulom",
        publishedYear: 2018,
      },
    ],

    stats: {
      rating: 4.7,
      reviewCount: 920,
      salesCount: 15300,
    },
    isHero: false,
    isBestseller: true,
    isNew: false,
    createdAt: "2024-06-15T09:00:00Z",
  },

  {
    id: 104,
    slug: "mehrobdan-chayon",
    author: "Abdulla Qodiriy",
    categorySlugs: ["classic-literature", "romance", "historical-fiction"],
    description: {
      uz: "O'zbek adabiyotining ikkinchi romani. Anvar va Raʼnoning fojiaviy muhabbat qissasi orqali XX asr boshlarida o'zbek jamiyatidagi ijtimoiy tengsizlik, ayollar taqdiri va eski urf-odatlarning zulmini tasvirlaydigan buyuk asar.",
      en: "The second Uzbek novel and a literary masterpiece. Through the tragic love story of Anvar and Ra'no, it powerfully depicts social inequality, the fate of women, and the oppression of old traditions in early 20th-century Uzbek society.",
      ru: "Второй узбекский роман и литературный шедевр. Через трагическую историю любви Анвара и Раъно произведение ярко изображает социальное неравенство, судьбу женщин и гнёт старых традиций в узбекском обществе начала XX века.",
    },

    // --- Asl (Original) Ma'lumotlar ---
    originalTitle: "Mehrobdan chayon",
    originalLanguage: "uz",
    mainCoverImage: "/books/mehrobdan-chayon/cover.jpg",

    // --- Nashrlar (Variantlar) ---
    variants: [
      {
        language: "uz-Latn",
        titleInLanguage: "Mehrobdan chayon",
        price: {
          amount: 60000,
          currency: "UZS",
          discountAmount: 10000,
        },
        stockCount: 95,
        stockStatus: "in-stock",
        isbn: "9789943510789",
        pageCount: 368,
        format: "paperback",
        publisher: "Sharq",
        publishedYear: 2023,
      },
      {
        language: "uz-Cyrl",
        titleInLanguage: "Меҳробдан чаён",
        price: {
          amount: 65000,
          currency: "UZS",
        },
        stockCount: 12,
        stockStatus: "in-stock",
        isbn: "9789943510796",
        pageCount: 384,
        format: "hardcover",
        publisher: "G'afur G'ulom",
        publishedYear: 2020,
      },
      {
        language: "ru",
        titleInLanguage: "Скорпион из алтаря",
        price: {
          amount: 80000,
          currency: "UZS",
        },
        stockCount: 0,
        stockStatus: "out-of-stock",
        isbn: "9785892074125",
        pageCount: 392,
        format: "paperback",
        publisher: "G'afur G'ulom",
        publishedYear: 2019,
      },
    ],

    stats: {
      rating: 4.8,
      reviewCount: 740,
      salesCount: 11200,
    },
    isHero: false,
    isBestseller: true,
    isNew: false,
    createdAt: "2024-07-01T09:00:00Z",
  },

  {
    id: 105,
    slug: "one-hundred-years-of-solitude",
    author: "Gabriel García Márquez",
    categorySlugs: ["classic-literature"],
    description: {
      uz: "XX asr jahon adabiyotining eng buyuk asarlaridan biri. Buendía oilasining Makondo shahrida yetti avlod davomida kechirgan hayoti orqali yolg'izlik, sevgi, urush va taqdirning takrorlanishi haqida sehr va realizm uyg'unlashgan ulkan freska.",
      en: "One of the greatest novels of the 20th century. Through seven generations of the Buendía family in the mythical town of Macondo, this magical realist masterpiece explores themes of solitude, love, war, and the cyclical nature of fate.",
      ru: "Один из величайших романов XX века. Через семь поколений семьи Буэндиа в мифическом городе Макондо этот шедевр магического реализма исследует темы одиночества, любви, войны и цикличности судьбы.",
    },

    // --- Asl (Original) Ma'lumotlar ---
    originalTitle: "Cien años de soledad",
    originalLanguage: "es",
    mainCoverImage: "/books/one-hundred-years-of-solitude/cover.jpg",

    // --- Nashrlar (Variantlar) ---
    variants: [
      {
        language: "uz-Latn",
        titleInLanguage: "Yolg'izlikning yuz yili",
        price: {
          amount: 85000,
          currency: "UZS",
          discountAmount: 15000,
        },
        stockCount: 60,
        stockStatus: "in-stock",
        isbn: "9789943510812",
        pageCount: 448,
        format: "paperback",
        publisher: "Yangi asr avlodi",
        publishedYear: 2022,
      },
      {
        language: "en",
        titleInLanguage: "One Hundred Years of Solitude",
        price: {
          amount: 310000,
          currency: "UZS",
        },
        stockCount: 8,
        stockStatus: "in-stock",
        isbn: "9780060883287",
        pageCount: 417,
        format: "paperback",
        publisher: "Harper Perennial",
        publishedYear: 2006,
      },
      {
        language: "ru",
        titleInLanguage: "Сто лет одиночества",
        price: {
          amount: 98000,
          currency: "UZS",
        },
        stockCount: 22,
        stockStatus: "in-stock",
        isbn: "9785170881680",
        pageCount: 464,
        format: "paperback",
        publisher: "AST",
        publishedYear: 2021,
      },
      {
        language: "es",
        titleInLanguage: "Cien años de soledad",
        price: {
          amount: 290000,
          currency: "UZS",
        },
        stockCount: 5,
        stockStatus: "in-stock",
        isbn: "9788497592208",
        pageCount: 471,
        format: "hardcover",
        publisher: "Alfaguara",
        publishedYear: 2007,
      },
      {
        language: "fr",
        titleInLanguage: "Cent ans de solitude",
        price: {
          amount: 295000,
          currency: "UZS",
        },
        stockCount: 0,
        stockStatus: "out-of-stock",
        isbn: "9782020238113",
        pageCount: 452,
        format: "paperback",
        publisher: "Seuil",
        publishedYear: 2017,
      },
      {
        language: "de",
        titleInLanguage: "Hundert Jahre Einsamkeit",
        price: {
          amount: 285000,
          currency: "UZS",
        },
        stockCount: 3,
        stockStatus: "in-stock",
        isbn: "9783442717316",
        pageCount: 458,
        format: "paperback",
        publisher: "Kiwi Taschenbuch",
        publishedYear: 2018,
      },
      {
        language: "tr",
        titleInLanguage: "Yüzyıllık Yalnızlık",
        price: {
          amount: 120000,
          currency: "UZS",
        },
        stockCount: 14,
        stockStatus: "in-stock",
        isbn: "9789750719387",
        pageCount: 440,
        format: "paperback",
        publisher: "Can Yayınları",
        publishedYear: 2020,
      },
    ],

    stats: {
      rating: 4.9,
      reviewCount: 2100,
      salesCount: 28000,
    },
    isHero: true,
    isBestseller: true,
    isNew: false,
    createdAt: "2024-05-20T09:00:00Z",
  },
];
