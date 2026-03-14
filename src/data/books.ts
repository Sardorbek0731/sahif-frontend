import { Book } from "@/types/book";

export const books: readonly Book[] = [
  {
    id: 1,
    slug: "otkan-kunlar",
    title: "O'tkan kunlar",
    author: "Abdulla Qodiriy",
    description:
      "O'zbek adabiyotining birinchi romani. Otabek va Kumushning muhabbat qissasi orqali XIX asr o'zbek jamiyatining hayoti tasvirlanadi.",
    categorySlugs: ["classic-literature"],

    price: {
      amount: 65000,
      currency: "UZS",
      discountAmount: 10000,
    },

    stats: {
      rating: 4.9,
      reviewCount: 1240,
      salesCount: 8500,
    },

    images: {
      cover: "/books/otkan-kunlar/cover.jpg",
      thumbnail: "/books/otkan-kunlar/thumbnail.jpg",
      gallery: [
        "/books/otkan-kunlar/gallery-1.jpg",
        "/books/otkan-kunlar/gallery-2.jpg",
      ],
    },

    details: {
      language: ["uz"],
      format: "paperback",
      paperFormat: "60x84/16",
      pageCount: 432,
      isbn: 9789943071234,
      publishedYear: 2021,
      publisher: "Sharq",
    },

    stockStatus: "in-stock",
    stockCount: 150,

    isHero: true,
    isBestseller: true,
    isNew: false,

    createdAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: 2,
    slug: "mehrobdan-chayon",
    title: "Mehrobdan chayon",
    author: "Abdulla Qodiriy",
    description:
      "Qodiriyning ikkinchi romani. Anvar va Raʼnoning muhabbati, o'zbek jamiyatidagi adolatsizlik va zulm mavzularini chuqur yoritadi.",
    categorySlugs: ["classic-literature"],

    price: {
      amount: 58000,
      currency: "UZS",
    },

    stats: {
      rating: 4.8,
      reviewCount: 980,
      salesCount: 7200,
    },

    images: {
      cover: "/books/mehrobdan-chayon/cover.jpg",
      thumbnail: "/books/mehrobdan-chayon/thumbnail.jpg",
    },

    details: {
      language: ["uz"],
      format: "paperback",
      paperFormat: "60x84/16",
      pageCount: 384,
      isbn: 9789943074562,
      publishedYear: 2020,
      publisher: "Sharq",
    },

    stockStatus: "in-stock",
    stockCount: 120,

    isHero: false,
    isBestseller: true,
    isNew: false,

    createdAt: "2024-02-10T00:00:00.000Z",
  },
  {
    id: 3,
    slug: "sariq-devni-minib",
    title: "Sariq devni minib",
    author: "Xudoiberdi To'xtaboyev",
    description:
      "O'zbek bolalar adabiyotining eng sevimli asarlaridan biri. Hamid va uning sarguzashtlari orqali do'stlik, jasurlik va adolat mavzulari yoritiladi.",
    categorySlugs: ["children-books", "fantasy"],

    price: {
      amount: 45000,
      currency: "UZS",
    },

    stats: {
      rating: 4.7,
      reviewCount: 650,
      salesCount: 5400,
    },

    images: {
      cover: "/books/sariq-devni-minib/cover.jpg",
      thumbnail: "/books/sariq-devni-minib/thumbnail.jpg",
    },

    details: {
      language: ["uz"],
      format: "hardcover",
      paperFormat: "60x84/16",
      pageCount: 256,
      isbn: 9789943077893,
      publishedYear: 2022,
      publisher: "Yangi asr avlodi",
    },

    stockStatus: "in-stock",
    stockCount: 200,

    isHero: false,
    isBestseller: true,
    isNew: false,

    createdAt: "2024-03-05T00:00:00.000Z",
  },
  {
    id: 4,
    slug: "hundred-years-of-solitude",
    title: "Yuz yillik yolg'izlik",
    author: "Gabriel García Márquez",
    translator: "Hamid Ismoilov",
    description:
      "Nobel mukofoti sohibi Marquezning magnum opusi. Buendiya oilasining yetti avlod davomidagi tarixi orqali Lotin Amerikasining sehrli realizm uslubida tasvirlangan epik romani.",
    categorySlugs: [
      "classic-literature",
      "historical-fiction",
      "contemporary-fiction",
    ],

    price: {
      amount: 89000,
      currency: "UZS",
      discountAmount: 15000,
    },

    stats: {
      rating: 4.9,
      reviewCount: 3200,
      salesCount: 12000,
    },

    images: {
      cover: "/books/hundred-years-of-solitude/cover.jpg",
      thumbnail: "/books/hundred-years-of-solitude/thumbnail.jpg",
    },

    details: {
      language: ["uz"],
      format: "paperback",
      paperFormat: "60x84/16",
      pageCount: 448,
      isbn: 9789943073215,
      publishedYear: 2023,
      publisher: "Adolat",
    },

    stockStatus: "in-stock",
    stockCount: 85,

    isHero: true,
    isBestseller: true,
    isNew: false,

    createdAt: "2024-04-20T00:00:00.000Z",
  },
  {
    id: 5,
    slug: "the-alchemist",
    title: "Alkimyogar",
    author: "Paulo Coelho",
    translator: "Sardor Mirzayev",
    description:
      "Dunyoning eng ko'p sotilgan kitoblaridan biri. Yosh cho'pon Santiyagoning o'z taqdiriga erishish yo'lidagi sarguzashtlari orqali hayotning mazmuni va orzular kuchi haqida falsafiy roman.",
    categorySlugs: ["contemporary-fiction", "philosophy", "motivation"],

    price: {
      amount: 72000,
      currency: "UZS",
      discountAmount: 12000,
    },

    stats: {
      rating: 4.8,
      reviewCount: 4100,
      salesCount: 15000,
    },

    images: {
      cover: "/books/the-alchemist/cover.jpg",
      thumbnail: "/books/the-alchemist/thumbnail.jpg",
    },

    details: {
      language: ["uz"],
      format: "paperback",
      paperFormat: "60x84/16",
      pageCount: 224,
      isbn: 9789943076543,
      publishedYear: 2022,
      publisher: "Yangi asr avlodi",
    },

    stockStatus: "in-stock",
    stockCount: 300,

    isHero: true,
    isBestseller: true,
    isNew: false,

    createdAt: "2024-05-12T00:00:00.000Z",
  },
];
