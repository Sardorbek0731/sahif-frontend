import { Author } from "@/types/author";

export const authors: readonly Author[] = [
  {
    id: 1,
    slug: "otabek-mahkamov",
    name: "Otabek Mahkamov",
    image: "/authors/otabek-mahkamov.jpg",
    bio: {
      uz: "O'zbek yozuvchisi va sayyoh. 52 davlatga sayohat qilib, 100 dan ortiq jahon yulduzlari bilan uchrashgan.",
      en: "Uzbek writer and traveler who visited 52 countries and met over 100 world-famous personalities.",
      ru: "Узбекский писатель и путешественник, побывавший в 52 странах и встретившийся со 100 известными личностями.",
    },
  },
  {
    id: 2,
    slug: "antoine-de-saint-exupery",
    name: "Antoine de Saint-Exupéry",
    image: "/authors/antoine-de-saint-exupery.jpg",
    bio: {
      uz: "Fransuz yozuvchisi va uchuvchi. Uning 'Kichik shahzoda' asari dunyo bo'ylab 500 dan ortiq tilga tarjima qilingan.",
      en: "French writer and aviator, best known for his novella The Little Prince, translated into over 500 languages worldwide.",
      ru: "Французский писатель и лётчик, известный прежде всего повестью «Маленький принц», переведённой на более чем 500 языков.",
    },
  },
  {
    id: 3,
    slug: "walter-isaacson",
    name: "Walter Isaacson",
    image: "/authors/walter-isaacson.jpeg",
    bio: {
      uz: "Amerikalik yozuvchi va jurnalist. Steve Jobs, Albert Einstein va Leonardo da Vinci kabi buyuk shaxslar biografiyasini yozgan.",
      en: "American writer and journalist, known for biographies of Steve Jobs, Albert Einstein, and Leonardo da Vinci.",
      ru: "Американский писатель и журналист, автор биографий Стива Джобса, Альберта Эйнштейна и Леонардо да Винчи.",
    },
  },
  {
    id: 4,
    slug: "james-clear",
    name: "James Clear",
    image: "/authors/james-clear.jpg",
    bio: {
      uz: "Amerikalik yozuvchi va motivatsion spiker. 'Atom odatlar' kitobi dunyo bo'ylab 25 milliondan ortiq nusxada sotilgan.",
      en: "American author and motivational speaker. His book Atomic Habits has sold over 25 million copies worldwide.",
      ru: "Американский автор и мотивационный спикер. Его книга «Атомные привычки» продана тиражом более 25 миллионов экземпляров.",
    },
  },
  {
    id: 5,
    slug: "paulo-coelho",
    name: "Paulo Coelho",
    image: "/authors/paulo-coelho.jpeg",
    bio: {
      uz: "Braziliyalik yozuvchi. Uning 'Alkimyogar' asari 65 milliondan ortiq nusxada sotilgan va 80 dan ortiq tilga tarjima qilingan.",
      en: "Brazilian author best known for The Alchemist, which has sold over 65 million copies and been translated into 80+ languages.",
      ru: "Бразильский писатель, наиболее известный романом «Алхимик», проданным тиражом более 65 миллионов экземпляров.",
    },
  },
  {
    id: 6,
    slug: "robert-t-kiyosaki",
    name: "Robert T. Kiyosaki",
    image: "/authors/robert-t-kiyosaki.jpg",
    bio: {
      uz: "Amerikalik tadbirkor va yozuvchi. 'Boy ota, kambag'al ota' kitobi shaxsiy moliya sohasidagi eng ko'p sotilgan kitob.",
      en: "American entrepreneur and author. Rich Dad Poor Dad is the best-selling personal finance book of all time.",
      ru: "Американский предприниматель и писатель. «Богатый папа, бедный папа» — самая продаваемая книга о личных финансах.",
    },
  },
  {
    id: 7,
    slug: "george-orwell",
    name: "George Orwell",
    image: "/authors/george-orwell.jpg",
    bio: {
      uz: "Ingliz yozuvchisi va publitsist. '1984' va 'Hayvonlar fermasi' asarlari bilan jahon adabiyotiga katta hissa qo'shgan.",
      en: "English novelist and essayist, known for his dystopian novels 1984 and Animal Farm.",
      ru: "Английский писатель и публицист, известный антиутопическими романами «1984» и «Скотный двор».",
    },
  },
  {
    id: 8,
    slug: "dale-carnegie",
    name: "Dale Carnegie",
    image: "/authors/dale-carnegie.webp",
    bio: {
      uz: "Amerikalik yozuvchi va o'qituvchi. 'Do'st orttirish va odamlarga ta'sir qilish' kitobi 30 milliondan ortiq nusxada sotilgan.",
      en: "American writer and lecturer. How to Win Friends and Influence People has sold over 30 million copies worldwide.",
      ru: "Американский писатель и педагог. «Как завоёвывать друзей и оказывать влияние на людей» продана тиражом более 30 миллионов экземпляров.",
    },
  },
  {
    id: 9,
    slug: "fyodor-dostoevsky",
    name: "Fyodor Dostoevsky",
    image: "/authors/fyodor-dostoevsky.webp",
    bio: {
      uz: "Rus yozuvchisi va faylasuf. Jahon adabiyotining eng buyuk namoyandalridan biri. 'Jinoyat va jazo', 'Aka-uka Karamazovlar' asarlari bilan mashhur.",
      en: "Russian novelist and philosopher, one of the greatest writers in world literature, known for Crime and Punishment and The Brothers Karamazov.",
      ru: "Русский писатель и философ, один из величайших мастеров мировой литературы, автор «Преступления и наказания» и «Братьев Карамазовых».",
    },
  },
  {
    id: 10,
    slug: "napoleon-hill",
    name: "Napoleon Hill",
    image: "/authors/napoleon-hill.jpg",
    bio: {
      uz: "Amerikalik yozuvchi. 'O'ylang va boy bo'ling' kitobi shaxsiy rivojlanish sohasidagi eng ko'p sotilgan kitoblardan biri.",
      en: "American author. Think and Grow Rich is one of the best-selling self-help books of all time, with over 100 million copies sold.",
      ru: "Американский писатель. «Думай и богатей» — одна из самых продаваемых книг по саморазвитию, продана тиражом более 100 миллионов экземпляров.",
    },
  },
  {
    id: 11,
    slug: "f-scott-fitzgerald",
    name: "F. Scott Fitzgerald",
    bio: {
      uz: "Amerikalik yozuvchi. 'Buyuk Getsbi' romani bilan mashhur bo'lgan va Jazzdavri adabiyotining ramziga aylangan.",
      en: "American novelist and short story writer, widely regarded as one of the greatest American writers of the 20th century, known for The Great Gatsby.",
      ru: "Американский писатель, один из крупнейших представителей литературы «потерянного поколения», автор романа «Великий Гэтсби».",
    },
  },
  {
    id: 12,
    slug: "harper-lee",
    name: "Harper Lee",
    bio: {
      uz: "Amerikalik yozuvchi. 'Zag'izg'onni o'ldirish' romani uchun Pulitzer mukofotini olgan.",
      en: "American novelist best known for To Kill a Mockingbird, which won the Pulitzer Prize in 1961 and has become a classic of American literature.",
      ru: "Американская писательница, лауреат Пулитцеровской премии за роман «Убить пересмешника».",
    },
  },
  {
    id: 13,
    slug: "stephen-covey",
    name: "Stephen R. Covey",
    bio: {
      uz: "Amerikalik yozuvchi va biznes konsultant. 'Muvaffaqiyatli odamlarning 7 ta odati' kitobi 40 milliondan ortiq nusxada sotilgan.",
      en: "American educator, author, and businessman. The 7 Habits of Highly Effective People has sold over 40 million copies worldwide.",
      ru: "Американский педагог, писатель и бизнес-консультант. «7 навыков высокоэффективных людей» продана тиражом более 40 миллионов экземпляров.",
    },
  },
  {
    id: 14,
    slug: "yuval-noah-harari",
    name: "Yuval Noah Harari",
    bio: {
      uz: "Isroillik tarixchi va professor. 'Sapiens' kitobi insoniyat tarixini yangicha nuqtai nazardan yoritib bergan.",
      en: "Israeli historian and professor at the Hebrew University of Jerusalem. His book Sapiens became an international bestseller.",
      ru: "Израильский историк, профессор Иерусалимского еврейского университета, автор международного бестселлера «Sapiens».",
    },
  },
  {
    id: 15,
    slug: "eckhart-tolle",
    name: "Eckhart Tolle",
    bio: {
      uz: "Nemis-kanadalik ma'naviy muallif. 'Hozirgi lahzaning kuchi' kitobi ruhiy o'zgarishning yo'lini ko'rsatadi.",
      en: "German-born Canadian spiritual author and public speaker. The Power of Now has sold millions of copies worldwide.",
      ru: "Немецко-канадский духовный автор. «Сила настоящего момента» — одна из самых продаваемых книг по духовному развитию.",
    },
  },
  {
    id: 16,
    slug: "j-k-rowling",
    name: "J.K. Rowling",
    bio: {
      uz: "Ingliz yozuvchisi. Garri Potter seriyasi 80 dan ortiq tilga tarjima qilinib, 500 milliondan ortiq nusxada sotilgan.",
      en: "British author, best known for the Harry Potter fantasy series, which has sold over 500 million copies worldwide.",
      ru: "Британская писательница, наиболее известная серией книг о Гарри Поттере, проданной тиражом более 500 миллионов экземпляров.",
    },
  },
  {
    id: 17,
    slug: "j-r-r-tolkien",
    name: "J.R.R. Tolkien",
    bio: {
      uz: "Ingliz yozuvchi va filolog. 'Uzuklar hukmdori' va 'Xobbit' asarlari bilan zamonaviy fantastika janrini yaratgan.",
      en: "English writer and philologist, creator of Middle-earth. The Lord of the Rings and The Hobbit are among the best-selling novels ever written.",
      ru: "Английский писатель и филолог, создатель Средиземья. «Властелин колец» и «Хоббит» входят в число самых продаваемых книг в истории.",
    },
  },
  {
    id: 18,
    slug: "aldous-huxley",
    name: "Aldous Huxley",
    bio: {
      uz: "Ingliz yozuvchi va faylasuf. 'Jasur yangi dunyo' dystopik romani XX asrning eng muhim asarlaridan biri.",
      en: "English writer and philosopher. Brave New World is one of the most influential dystopian novels of the 20th century.",
      ru: "Английский писатель и философ. «О дивный новый мир» — одно из наиболее значимых антиутопических произведений XX века.",
    },
  },
  {
    id: 19,
    slug: "leo-tolstoy",
    name: "Leo Tolstoy",
    bio: {
      uz: "Rus yozuvchisi. 'Anna Karenina' va 'Urush va tinchlik' asarlari bilan jahon adabiyotining eng buyuk namoyandalaridan biri.",
      en: "Russian novelist, often cited as one of the greatest authors of all time, known for War and Peace and Anna Karenina.",
      ru: "Русский писатель, один из наиболее известных в мире, автор романов «Война и мир» и «Анна Каренина».",
    },
  },
  {
    id: 20,
    slug: "sun-tzu",
    name: "Sun Tzu",
    bio: {
      uz: "Qadimgi xitoy harbiy strategi va faylasuf. 'Urush san'ati' asari 2500 yildan beri o'z ahamiyatini yo'qotmagan.",
      en: "Ancient Chinese military general, strategist, and philosopher. The Art of War has influenced military and business strategy for over 2,500 years.",
      ru: "Древнекитайский военный стратег и философ. «Искусство войны» на протяжении 2500 лет остаётся одним из самых влиятельных трактатов о стратегии.",
    },
  },
  {
    id: 21,
    slug: "j-d-salinger",
    name: "J.D. Salinger",
    bio: {
      uz: "Amerikalik yozuvchi. 'The Catcher in the Rye' romani bilan mashhur bo'lgan va XX asr amerikan adabiyotining eng muhim asarlaridan birini yaratgan.",
      en: "American writer best known for his novel The Catcher in the Rye, one of the most influential works of 20th-century American literature.",
      ru: "Американский писатель, наиболее известный романом «Над пропастью во ржи», одним из самых влиятельных произведений американской литературы XX века.",
    },
  },
  {
    id: 22,
    slug: "mark-manson",
    name: "Mark Manson",
    bio: {
      uz: "Amerikalik muallif va blogger. Uning 'Ahamiyat bermaslik san'ati' kitobi 10 milliondan ortiq nusxada sotilgan va 65 tilga tarjima qilingan.",
      en: "American author and blogger. His book The Subtle Art of Not Giving a F*ck has sold over 10 million copies and been translated into 65 languages.",
      ru: "Американский автор и блогер. Его книга «Тонкое искусство пофигизма» продана тиражом более 10 миллионов экземпляров и переведена на 65 языков.",
    },
  },
  {
    id: 23,
    slug: "tara-westover",
    name: "Tara Westover",
    bio: {
      uz: "Amerikalik muallif va tarixchi. 'Educated' memuarlari bilan mashhur bo'lib, kitob New York Times bestseller ro'yxatida 2 yildan ortiq turgan.",
      en: "American author and historian. Her memoir Educated was a New York Times bestseller for over two years and has been translated into 45 languages.",
      ru: "Американская писательница и историк. Её мемуары «Образование» были бестселлером New York Times более двух лет и переведены на 45 языков.",
    },
  },
  {
    id: 24,
    slug: "marcus-aurelius",
    name: "Marcus Aurelius",
    bio: {
      uz: "Rim imperatori va stoik faylasuf. Uning 'Meditatsiyalar' asari shaxsiy falsafiy fikrlaridan iborat bo'lib, 2000 yildan beri o'qilmoqda.",
      en: "Roman Emperor and Stoic philosopher. His Meditations, a series of personal writings on Stoic philosophy, has been read for nearly 2,000 years.",
      ru: "Римский император и философ-стоик. Его «Размышления» — личные записи о стоической философии — читаются уже почти 2000 лет.",
    },
  },
  {
    id: 25,
    slug: "robert-greene",
    name: "Robert Greene",
    bio: {
      uz: "Amerikalik muallif. 'Hokimiyatning 48 qonuni' va boshqa kitoblari strategiya va insoniy tabiat haqida chuqur tushunchalar beradi.",
      en: "American author known for his books on strategy, power, and seduction. The 48 Laws of Power has sold millions of copies worldwide.",
      ru: "Американский автор, известный книгами о стратегии, власти и соблазнении. «48 законов власти» продана миллионными тиражами по всему миру.",
    },
  },
  {
    id: 26,
    slug: "viktor-frankl",
    name: "Viktor Frankl",
    bio: {
      uz: "Avstriyalik nevroloq, psixiatr va Holokost omon qolgani. 'Insonning ma'no izlashi' kitobi 12 milliondan ortiq nusxada sotilgan.",
      en: "Austrian neurologist, psychiatrist, and Holocaust survivor. His book Man's Search for Meaning has sold over 12 million copies worldwide.",
      ru: "Австрийский невролог, психиатр и узник концлагеря. Его книга «Человек в поисках смысла» продана тиражом более 12 миллионов экземпляров.",
    },
  },
  {
    id: 27,
    slug: "eric-ries",
    name: "Eric Ries",
    bio: {
      uz: "Amerikalik tadbirkor va muallif. 'The Lean Startup' kitobi startaplar va innovatsiyalar sohasida inqilob yaratgan.",
      en: "American entrepreneur and author. The Lean Startup revolutionized how startups are built and how new products are launched.",
      ru: "Американский предприниматель и автор. «Бизнес с нуля» произвёл революцию в подходе к созданию стартапов и запуску новых продуктов.",
    },
  },
  {
    id: 28,
    slug: "daniel-kahneman",
    name: "Daniel Kahneman",
    bio: {
      uz: "Isroil-amerikalik psixolog va Nobel mukofoti laureati. 'Tez va sekin fikrlash' kitobi inson qaror qabul qilish jarayonini o'rganadi.",
      en: "Israeli-American psychologist and Nobel Prize laureate. Thinking, Fast and Slow explores the two systems that drive the way we think.",
      ru: "Израильско-американский психолог, лауреат Нобелевской премии. «Думай медленно... решай быстро» исследует две системы мышления человека.",
    },
  },
  {
    id: 29,
    slug: "don-miguel-ruiz",
    name: "Don Miguel Ruiz",
    bio: {
      uz: "Meksikalik muallif va shamanism ustozi. 'To'rtta kelishuv' kitobi 10 milliondan ortiq nusxada sotilgan va shaxsiy erkinlik yo'lini ko'rsatadi.",
      en: "Mexican author and shaman. The Four Agreements has sold over 10 million copies and offers a code of conduct for personal freedom.",
      ru: "Мексиканский автор и шаман. «Четыре соглашения» продана тиражом более 10 миллионов экземпляров и предлагает кодекс личной свободы.",
    },
  },
];
