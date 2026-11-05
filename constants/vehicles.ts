// KIA AUTO CENTER — Official Fleet & Vehicle Specifications
// Owner: Nasriddinova Dilfuza

export interface VehicleSpec {
  engineCapacity: number; // liters, e.g. 2.0
  powerHp: number; // HP
  torqueNm: number;
  fuelType: 'petrol' | 'diesel' | 'hybrid';
  transmission: string;
  driveType: 'FWD' | 'AWD' | 'RWD';
  acceleration0100: number; // seconds
  topSpeedKmh: number;
  fuelConsumptionCombined: number; // L/100km
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  wheelbaseMm: number;
  groundClearanceMm: number;
  trunkCapacityLiters: number;
}

export interface VehicleTrim {
  id: string;
  name: string;
  priceUzs: number;
  features: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  inStock: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  modelCode: string;
  year: number;
  bodyType: 'sedan' | 'suv' | 'crossover' | 'minivan' | 'commercial';
  basePriceUzs: number;
  specialPriceUzs?: number;
  status: 'available' | 'reserved' | 'sold' | 'incoming';
  isFeatured: boolean;
  isSpecialOffer: boolean;
  warrantyYears: number;
  warrantyKm: number;
  mainImage: string;
  gallery: string[];
  specs: VehicleSpec;
  trims: VehicleTrim[];
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  tagline: {
    uz: string;
    ru: string;
    en: string;
  };
}

export const KIA_VEHICLES: Vehicle[] = [
  {
    id: 'kia-k3',
    name: 'KIA K3',
    modelCode: 'k3',
    year: 2026,
    bodyType: 'sedan',
    basePriceUzs: 275000000,
    specialPriceUzs: 265000000,
    status: 'available',
    isFeatured: true,
    isSpecialOffer: true,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'Zamonaviy shahar sedani — dinamik va qulay',
      ru: 'Современный городской седан — динамичный и комфортный',
      en: 'Modern city sedan — dynamic and comfortable'
    },
    description: {
      uz: 'Yangi avlod KIA K3 o‘zining sportcha dizayni, ilg‘or xavfsizlik tizimlari va keng salon qulayligi bilan shahar hayotiga to‘la moslashgan.',
      ru: 'Новое поколение KIA K3 с ярким спортивным дизайном, передовыми системами безопасности и просторным салоном.',
      en: 'The new generation KIA K3 combines sporty exterior lines, advanced safety tech, and premium interior space.'
    },
    specs: {
      engineCapacity: 1.6,
      powerHp: 128,
      torqueNm: 155,
      fuelType: 'petrol',
      transmission: '6 AT',
      driveType: 'FWD',
      acceleration0100: 10.4,
      topSpeedKmh: 195,
      fuelConsumptionCombined: 6.8,
      lengthMm: 4645,
      widthMm: 1800,
      heightMm: 1440,
      wheelbaseMm: 2700,
      groundClearanceMm: 150,
      trunkCapacityLiters: 502
    },
    trims: [
      {
        id: 'k3-comfort',
        name: 'Comfort',
        priceUzs: 275000000,
        inStock: true,
        features: {
          uz: ['Konditsioner', 'LED kunduzgi chiroqlar', '8 dyuymli multimedia', 'Kruiz-kontrol'],
          ru: ['Кондиционер', 'LED дневные ходовые огни', '8-дюймовый экран', 'Круиз-контроль'],
          en: ['Air conditioning', 'LED DRL', '8-inch touchscreen', 'Cruise control']
        }
      },
      {
        id: 'k3-luxe',
        name: 'Luxe',
        priceUzs: 298000000,
        inStock: true,
        features: {
          uz: ['Iqlim nazorati', 'Orqa kamera', 'Old o‘rindiqlar isitgichi', 'Apple CarPlay / Android Auto'],
          ru: ['Климат-контроль', 'Камера заднего вида', 'Подогрев сидений', 'Apple CarPlay / Android Auto'],
          en: ['Dual climate control', 'Rearview camera', 'Heated seats', 'Apple CarPlay / Android Auto']
        }
      },
      {
        id: 'k3-gtline',
        name: 'GT Line',
        priceUzs: 325000000,
        inStock: true,
        features: {
          uz: ['Sport kuzov to‘plami', '17 dyuymli qotishma disklar', 'Charm qoplamali salon', 'Drive Wise assistenti'],
          ru: ['Спортивный обвес', '17" литые диски', 'Кожаный салон', 'Комплекс Drive Wise'],
          en: ['Sport body kit', '17" alloy wheels', 'Leather upholstery', 'Drive Wise safety suite']
        }
      }
    ]
  },
  {
    id: 'kia-k5',
    name: 'KIA K5',
    modelCode: 'k5',
    year: 2026,
    bodyType: 'sedan',
    basePriceUzs: 369900000,
    specialPriceUzs: 359900000,
    status: 'available',
    isFeatured: true,
    isSpecialOffer: true,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'Biznes klass yetakchisi — nafislik va quvvat',
      ru: 'Лидер бизнес-класса — элегантность и мощь',
      en: 'Business class benchmark — elegance and power'
    },
    description: {
      uz: 'KIA K5 — bu futuristik dizayn, 2.5 litrli Smartstream dvigateli va zamonaviy raqamli kokpit uyg‘unligi. Yo‘lda betakror ko‘rinish kafolatlangan.',
      ru: 'KIA K5 восхищает экспрессивным силуэтом fastback, мощным 2.5-литровым двигателем и богатым оснащением.',
      en: 'The KIA K5 captivates with its fastback silhouette, powerful 2.5L engine, and state-of-the-art panoramic digital cockpit.'
    },
    specs: {
      engineCapacity: 2.5,
      powerHp: 194,
      torqueNm: 246,
      fuelType: 'petrol',
      transmission: '8 AT',
      driveType: 'FWD',
      acceleration0100: 8.6,
      topSpeedKmh: 210,
      fuelConsumptionCombined: 7.2,
      lengthMm: 4905,
      widthMm: 1860,
      heightMm: 1445,
      wheelbaseMm: 2850,
      groundClearanceMm: 155,
      trunkCapacityLiters: 510
    },
    trims: [
      {
        id: 'k5-comfort',
        name: 'Comfort',
        priceUzs: 369900000,
        inStock: true,
        features: {
          uz: ['LED faralar', 'Dual zona iqlim', '8 dyuymli ekran', 'Smart Key'],
          ru: ['LED оптика', '2-зонный климат', '8" мультимедиа', 'Бесключевой доступ'],
          en: ['LED headlights', 'Dual-zone climate', '8" display', 'Smart Key']
        }
      },
      {
        id: 'k5-prestige',
        name: 'Prestige',
        priceUzs: 415000000,
        inStock: true,
        features: {
          uz: ['10.25 dyuymli ekran', 'Bose premium audio (12 dinamik)', 'Ventilatsiyali o‘rindiqlar', 'Simsiz zaryadlash'],
          ru: ['10.25" навигация', 'Акустика Bose (12 динамиков)', 'Вентиляция передних сидений', 'Беспроводная зарядка'],
          en: ['10.25" navigation', 'Bose 12-speaker sound', 'Ventilated front seats', 'Wireless charging']
        }
      },
      {
        id: 'k5-gtline',
        name: 'GT Line+',
        priceUzs: 458000000,
        inStock: true,
        features: {
          uz: ['Panoramali lyuk', '360 gradus kameralar', 'Proektsion displey HUD', 'Drive Wise to‘liq to‘plami'],
          ru: ['Панорамная крыша', 'Круговой обзор 360°', 'Проекционный дисплей HUD', 'Полный комплекс Drive Wise'],
          en: ['Panoramic sunroof', '360 Surround View', 'Head-Up Display', 'Full Drive Wise ADAS']
        }
      }
    ]
  },
  {
    id: 'kia-k8',
    name: 'KIA K8',
    modelCode: 'k8',
    year: 2026,
    bodyType: 'sedan',
    basePriceUzs: 689900000,
    status: 'available',
    isFeatured: true,
    isSpecialOffer: false,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'Premium darajadagi flagman sedan — mutlaq qulaylik',
      ru: 'Флагманский премиум-седан — абсолютный комфорт',
      en: 'Executive flagship sedan — the pinnacle of luxury'
    },
    description: {
      uz: 'KIA K8 — ilg‘or dizayn falsafasini o‘zida mujassam etgan nufuzli sedan. 3.5 litrli V6 dvigatel va Meridia Sound akustikasi bilan ta’minlangan.',
      ru: 'KIA K8 объединяет представительский статус, мощный двигатель 3.5L V6 и премиальную отделку кожей Nappa.',
      en: 'The KIA K8 embodies automotive sophistication, featuring a 3.5L V6 engine and Meridian high-fidelity audio system.'
    },
    specs: {
      engineCapacity: 3.5,
      powerHp: 300,
      torqueNm: 359,
      fuelType: 'petrol',
      transmission: '8 AT',
      driveType: 'FWD',
      acceleration0100: 6.9,
      topSpeedKmh: 240,
      fuelConsumptionCombined: 9.3,
      lengthMm: 5015,
      widthMm: 1875,
      heightMm: 1455,
      wheelbaseMm: 2895,
      groundClearanceMm: 150,
      trunkCapacityLiters: 510
    },
    trims: [
      {
        id: 'k8-prestige',
        name: 'Prestige',
        priceUzs: 689900000,
        inStock: true,
        features: {
          uz: ['Egilgan panoramik ekran 12.3"+12.3"', 'Meridian Audio (14 dinamik)', 'Ergo Motion massajli o‘rindiq'],
          ru: ['Изогнутый дисплей 12.3"+12.3"', 'Акустика Meridian 14 динамиков', 'Сиденье с массажем Ergo Motion'],
          en: ['Dual curved 12.3" displays', 'Meridian 14-speaker sound', 'Ergo Motion massage driver seat']
        }
      },
      {
        id: 'k8-signature',
        name: 'Signature VIP',
        priceUzs: 765000000,
        inStock: true,
        features: {
          uz: ['Nappa charmi', 'Elektron adaptiv osma (ECS)', 'Orqa yo‘lovchilar uchun boshqaruv paneli', 'Avtomatik parkovka'],
          ru: ['Кожа Nappa', 'Электронная подвеска ECS', 'VIP-пульт управления для задних пассажиров', 'Автопарковщик RSPA'],
          en: ['Nappa leather', 'Electronic suspension ECS', 'Rear VIP console controls', 'Remote Smart Parking RSPA']
        }
      }
    ]
  },
  {
    id: 'kia-k9',
    name: 'KIA K9',
    modelCode: 'k9',
    year: 2026,
    bodyType: 'sedan',
    basePriceUzs: 990000000,
    status: 'available',
    isFeatured: false,
    isSpecialOffer: false,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'Lyuks sinfidagi oliy darajadagi limuzin',
      ru: 'Президентский представительский класс',
      en: 'Presidential luxury sedan experience'
    },
    description: {
      uz: 'KIA K9 — brendning eng hashamatli modeli. To‘liq g‘ildirakli uzatma (AWD), V6 3.3 Turbo dvigatel va xususiy samolyot darajasidagi ikkinchi qator qulayligi.',
      ru: 'KIA K9 — абсолютный флагман бренда с полным приводом AWD, турбомотором V6 и непревзойденной шумоизоляцией.',
      en: 'The pinnacle of luxury: AWD platform, V6 twin-turbo powertrain, and first-class rear executive lounge.'
    },
    specs: {
      engineCapacity: 3.3,
      powerHp: 370,
      torqueNm: 510,
      fuelType: 'petrol',
      transmission: '8 AT',
      driveType: 'AWD',
      acceleration0100: 5.7,
      topSpeedKmh: 240,
      fuelConsumptionCombined: 11.5,
      lengthMm: 5140,
      widthMm: 1915,
      heightMm: 1490,
      wheelbaseMm: 3105,
      groundClearanceMm: 150,
      trunkCapacityLiters: 455
    },
    trims: [
      {
        id: 'k9-exclusive',
        name: 'Exclusive AWD',
        priceUzs: 990000000,
        inStock: true,
        features: {
          uz: ['AWD to‘liq uzatma', 'Lexicon Reference akustikasi (17 dinamik)', 'Tabiiy yog‘och qoplamasi', 'Ikkita orqa multimedia ekrani'],
          ru: ['Полный привод AWD', 'Акустика Lexicon (17 динамиков)', 'Отделка натуральным деревом', 'Задние развлекательные мониторы'],
          en: ['AWD all-wheel drive', 'Lexicon 17-speaker audio', 'Real open-pore wood trim', 'Dual rear entertainment screens']
        }
      }
    ]
  },
  {
    id: 'kia-sonet',
    name: 'KIA Sonet',
    modelCode: 'sonet',
    year: 2026,
    bodyType: 'crossover',
    basePriceUzs: 189900000,
    specialPriceUzs: 185000000,
    status: 'available',
    isFeatured: true,
    isSpecialOffer: true,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'Shaharning ixcham va chaqqon krossoveri',
      ru: 'Компактный и маневренный городской кроссовер',
      en: 'Compact and agile urban crossover'
    },
    description: {
      uz: 'O‘zbekistonda yig‘iladigan KIA Sonet — yuqori klirens (205 mm), tejamkor 1.5 dvigatel va jozibador narx uyg‘unligi.',
      ru: 'KIA Sonet локализован в Узбекистане — высокий клиренс 205 мм, экономичный расход топлива и надежный вариатор IVT.',
      en: 'Locally assembled in Uzbekistan, Sonet offers 205mm ground clearance, exceptional economy, and smart compact agility.'
    },
    specs: {
      engineCapacity: 1.5,
      powerHp: 115,
      torqueNm: 144,
      fuelType: 'petrol',
      transmission: 'IVT',
      driveType: 'FWD',
      acceleration0100: 11.0,
      topSpeedKmh: 175,
      fuelConsumptionCombined: 6.2,
      lengthMm: 4120,
      widthMm: 1790,
      heightMm: 1625,
      wheelbaseMm: 2500,
      groundClearanceMm: 205,
      trunkCapacityLiters: 392
    },
    trims: [
      {
        id: 'sonet-classic',
        name: 'Classic',
        priceUzs: 189900000,
        inStock: true,
        features: {
          uz: ['2 ta xavfsizlik yostig‘i', 'Konditsioner', 'ABS + ESC', 'Orqa parkovka sensorlari'],
          ru: ['2 подушки безопасности', 'Кондиционер', 'ABS + ESC', 'Задние парктроники'],
          en: ['Dual airbags', 'Air conditioning', 'ABS + ESC', 'Rear parking sensors']
        }
      },
      {
        id: 'sonet-luxe',
        name: 'Luxe',
        priceUzs: 232000000,
        inStock: true,
        features: {
          uz: ['8 dyuymli ekran', 'Orqa kamera', 'Iqlim nazorati', 'Yengil qotishma disklar 16"'],
          ru: ['8" мультимедиа экран', 'Камера заднего вида', 'Климат-контроль', 'Литые диски 16"'],
          en: ['8" infotainment screen', 'Rear camera', 'Automatic climate', '16" alloy wheels']
        }
      },
      {
        id: 'sonet-prestige',
        name: 'Prestige',
        priceUzs: 255000000,
        inStock: true,
        features: {
          uz: ['Ventilatsiyali o‘rindiqlar', 'Bose audio', 'Lyuk', 'Simsiz telefon zaryadlash'],
          ru: ['Вентиляция сидений', 'Премиум аудио Bose', 'Люк', 'Беспроводная зарядка'],
          en: ['Ventilated seats', 'Bose premium audio', 'Sunroof', 'Wireless phone charger']
        }
      }
    ]
  },
  {
    id: 'kia-seltos',
    name: 'KIA Seltos',
    modelCode: 'seltos',
    year: 2026,
    bodyType: 'crossover',
    basePriceUzs: 339900000,
    specialPriceUzs: 329000000,
    status: 'available',
    isFeatured: true,
    isSpecialOffer: false,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'O‘ziga ishongan va zamonaviy oilaviy krossover',
      ru: 'Уверенный и современный семейный кроссовер',
      en: 'Confident and versatile compact crossover'
    },
    description: {
      uz: 'KIA Seltos zamonaviy texnologiyalarni qulaylik bilan uyg‘unlashtiradi: 2.0L motor, AWD to‘liq uzatma opsiyasi va keng yukxona.',
      ru: 'KIA Seltos предлагает идеальный баланс между динамикой, вместительностью и вездеходными возможностями.',
      en: 'KIA Seltos delivers an ideal blend of commanding capability, intelligent tech, and upscale interior room.'
    },
    specs: {
      engineCapacity: 2.0,
      powerHp: 149,
      torqueNm: 180,
      fuelType: 'petrol',
      transmission: 'IVT',
      driveType: 'FWD',
      acceleration0100: 9.6,
      topSpeedKmh: 190,
      fuelConsumptionCombined: 6.9,
      lengthMm: 4390,
      widthMm: 1800,
      heightMm: 1615,
      wheelbaseMm: 2630,
      groundClearanceMm: 190,
      trunkCapacityLiters: 468
    },
    trims: [
      {
        id: 'seltos-style',
        name: 'Style',
        priceUzs: 320000000,
        inStock: true,
        features: {
          uz: ['17" disklar', 'LED chiroqlar', '10.25 dyuymli ekran', 'Kalitsiz kirish'],
          ru: ['17" диски', 'LED оптика', '10.25" мультимедиа', 'Бесключевой доступ'],
          en: ['17" wheels', 'LED lighting', '10.25" screen', 'Keyless entry']
        }
      },
      {
        id: 'seltos-prestige',
        name: 'Prestige AWD',
        priceUzs: 365000000,
        inStock: true,
        features: {
          uz: ['AWD to‘liq uzatma', 'Bose audiotizimi', 'Ko‘rinmas zonalar nazorati', 'Charm salon'],
          ru: ['Полный привод AWD', 'Аудио Bose', 'Мониторинг слепых зон', 'Кожаная отделка'],
          en: ['AWD system', 'Bose audio', 'Blind-spot collision avoidance', 'Leather interior']
        }
      }
    ]
  },
  {
    id: 'kia-sportage',
    name: 'KIA Sportage',
    modelCode: 'sportage',
    year: 2026,
    bodyType: 'suv',
    basePriceUzs: 419900000,
    specialPriceUzs: 409900000,
    status: 'available',
    isFeatured: true,
    isSpecialOffer: true,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'Afsonaviy bestseller — kelajak dizayni bugun',
      ru: 'Легендарный бестселлер — дизайн будущего сегодня',
      en: 'The iconic bestseller — inspiring innovation'
    },
    description: {
      uz: 'Yangi KIA Sportage — butun O‘zbekistonda eng ommabop premium krossover. Boomerang shaklidagi LED chiroqlar, ulkan kavisli ekran va AWD uzatma.',
      ru: 'Новый KIA Sportage впечатляет футуристичным дизайном, просторным салоном и богатейшим списком опций.',
      en: 'The bold new KIA Sportage redefines the SUV segment with futuristic aesthetics, AWD prowess, and dual curved screens.'
    },
    specs: {
      engineCapacity: 2.5,
      powerHp: 190,
      torqueNm: 242,
      fuelType: 'petrol',
      transmission: '8 AT',
      driveType: 'AWD',
      acceleration0100: 9.4,
      topSpeedKmh: 197,
      fuelConsumptionCombined: 7.9,
      lengthMm: 4660,
      widthMm: 1865,
      heightMm: 1660,
      wheelbaseMm: 2755,
      groundClearanceMm: 181,
      trunkCapacityLiters: 540
    },
    trims: [
      {
        id: 'sportage-luxe',
        name: 'Luxe 2.0',
        priceUzs: 419900000,
        inStock: true,
        features: {
          uz: ['LED faralar', 'Dual iqlim', 'Orqa kamera', 'Old/orqa isitgichlar'],
          ru: ['LED фары', 'Двухзонный климат', 'Камера заднего вида', 'Теплые опции'],
          en: ['LED lights', 'Dual climate', 'Rear camera', 'Heated front & rear seats']
        }
      },
      {
        id: 'sportage-prestige',
        name: 'Prestige 2.5 AWD',
        priceUzs: 465000000,
        inStock: true,
        features: {
          uz: ['AWD uzatma', 'Kavisli panorama ekran', '18" disklar', 'Elektr yukxona eshigi'],
          ru: ['Полный привод AWD', 'Изогнутый панорамный дисплей', '18" диски', 'Электропривод багажника'],
          en: ['AWD system', 'Panoramic curved display', '18" wheels', 'Smart power tailgate']
        }
      },
      {
        id: 'sportage-xline',
        name: 'X-Line AWD',
        priceUzs: 510000000,
        inStock: true,
        features: {
          uz: ['Harman Kardon audio', 'Panoramali tom', '360 kameralar', 'Drive Wise to‘liq xavfsizlik'],
          ru: ['Аудиосистема Harman Kardon', 'Панорамная крыша', 'Круговой обзор 360', 'Drive Wise ADAS'],
          en: ['Harman Kardon sound', 'Panoramic sunroof', '360 Surround View', 'Full Drive Wise ADAS']
        }
      }
    ]
  },
  {
    id: 'kia-sorento',
    name: 'KIA Sorento',
    modelCode: 'sorento',
    year: 2026,
    bodyType: 'suv',
    basePriceUzs: 569900000,
    status: 'available',
    isFeatured: true,
    isSpecialOffer: false,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: '7 o‘rinli mukammal oilaviy flagman yo‘ltanlamas',
      ru: 'Премиальный 7-местный семейный внедорожник',
      en: 'Refined 7-seat family flagship SUV'
    },
    description: {
      uz: 'KIA Sorento — mustahkam tuzilma, 3.5L V6 dvigatel, 7 kishilik keng salon va har qanday yo‘l sharoitiga moslashuvchan Terrain Mode tizimi.',
      ru: 'KIA Sorento воплощает мощь, комфорт и безопасность для всей семьи благодаря 7 посадочным местам и системе полного привода.',
      en: 'The 7-passenger Sorento offers commanding presence, V6 performance, and versatile seating for family expeditions.'
    },
    specs: {
      engineCapacity: 3.5,
      powerHp: 272,
      torqueNm: 331,
      fuelType: 'petrol',
      transmission: '8 AT',
      driveType: 'AWD',
      acceleration0100: 8.0,
      topSpeedKmh: 210,
      fuelConsumptionCombined: 10.0,
      lengthMm: 4810,
      widthMm: 1900,
      heightMm: 1695,
      wheelbaseMm: 2815,
      groundClearanceMm: 176,
      trunkCapacityLiters: 910
    },
    trims: [
      {
        id: 'sorento-prestige',
        name: 'Prestige 7-seats AWD',
        priceUzs: 569900000,
        inStock: true,
        features: {
          uz: ['7 o‘rinli salon', 'Bose akustika', 'Ventilatsiyali o‘rindiqlar', 'Ko‘r zonalar monitori'],
          ru: ['7-местный салон', 'Аудио Bose', 'Вентиляция кресел', 'Контроль слепых зон'],
          en: ['7-seat configuration', 'Bose audio', 'Ventilated seats', 'Blind-spot monitoring']
        }
      },
      {
        id: 'sorento-premium',
        name: 'Premium+ AWD',
        priceUzs: 645000000,
        inStock: true,
        features: {
          uz: ['Nappa charmi', 'Proektsion displey', 'Panoramali lyuk', 'Raqamli kalit va masofaviy parkovka'],
          ru: ['Кожа Nappa', 'Проекционный дисплей HUD', 'Панорамный люк', 'Умная дистанционная парковка'],
          en: ['Nappa leather', 'HUD head-up display', 'Panoramic glass roof', 'Remote Smart Parking Assist']
        }
      }
    ]
  },
  {
    id: 'kia-carens',
    name: 'KIA Carens',
    modelCode: 'carens',
    year: 2026,
    bodyType: 'minivan',
    basePriceUzs: 310000000,
    status: 'available',
    isFeatured: false,
    isSpecialOffer: false,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'Zamonaviy oilaviy rekreatsion avtomobil',
      ru: 'Инновационный семейный минивэн для дальних поездок',
      en: 'Recreational family transporter for everyday comfort'
    },
    description: {
      uz: 'KIA Carens — oilaviy sayohatlar uchun yaratilgan 7 o‘rinli innovatsion krossover-miniven. Kam yonilg‘i sarfi va ko‘p funksiyali o‘rindiqlar tartibi.',
      ru: 'KIA Carens предлагает 3 ряда сидений, продуманную эргономику и высокий уровень пассивной безопасности.',
      en: 'Featuring versatile 3-row seating and modern connectivity, Carens turns family travel into effortless joy.'
    },
    specs: {
      engineCapacity: 1.5,
      powerHp: 115,
      torqueNm: 144,
      fuelType: 'petrol',
      transmission: '6 AT',
      driveType: 'FWD',
      acceleration0100: 11.2,
      topSpeedKmh: 174,
      fuelConsumptionCombined: 6.5,
      lengthMm: 4540,
      widthMm: 1800,
      heightMm: 1700,
      wheelbaseMm: 2780,
      groundClearanceMm: 195,
      trunkCapacityLiters: 492
    },
    trims: [
      {
        id: 'carens-comfort',
        name: 'Comfort 7-seats',
        priceUzs: 310000000,
        inStock: true,
        features: {
          uz: ['7 o‘rin', '6 ta xavfsizlik yostig‘i', 'Orqa konditsioner deflektorlari', '8 dyuymli multimedia'],
          ru: ['7 мест', '6 подушек безопасности', 'Дефлекторы кондиционера сзади', '8" экран'],
          en: ['7 seats', '6 airbags', 'Rear AC vents for all rows', '8" touchscreen']
        }
      }
    ]
  },
  {
    id: 'kia-carnival',
    name: 'KIA Carnival',
    modelCode: 'carnival',
    year: 2026,
    bodyType: 'minivan',
    basePriceUzs: 650000000,
    specialPriceUzs: 635000000,
    status: 'available',
    isFeatured: true,
    isSpecialOffer: true,
    warrantyYears: 5,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'Grand Utility Vehicle — biznes va oila uchun birinchi sinf',
      ru: 'Grand Utility Vehicle — первый класс для бизнеса и семьи',
      en: 'Grand Utility Vehicle — VIP first-class on wheels'
    },
    description: {
      uz: 'KIA Carnival — oddiy miniven emas, bu g‘ildiraklardagi shaxsiy biznes-jet. Relaxation Seats o‘rindiqlari, elektr suriluvchi eshiklar va 3.5L V6 dvigatel.',
      ru: 'KIA Carnival объединяет роскошь представительского седана с гигантским пространством премиум-вэна.',
      en: 'The Grand Utility Vehicle offers VIP lounge relaxation seats, power sliding doors, and uncompromising V6 refinement.'
    },
    specs: {
      engineCapacity: 3.5,
      powerHp: 249,
      torqueNm: 331,
      fuelType: 'petrol',
      transmission: '8 AT',
      driveType: 'FWD',
      acceleration0100: 8.5,
      topSpeedKmh: 190,
      fuelConsumptionCombined: 10.3,
      lengthMm: 5155,
      widthMm: 1995,
      heightMm: 1775,
      wheelbaseMm: 3090,
      groundClearanceMm: 182,
      trunkCapacityLiters: 627
    },
    trims: [
      {
        id: 'carnival-prestige',
        name: 'Prestige 8-seats',
        priceUzs: 650000000,
        inStock: true,
        features: {
          uz: ['8 o‘rinli salon', 'Elektr eshiklar va yukxona', 'Smart Cruise Control', 'Bose 12 dinamik'],
          ru: ['8-местный салон', 'Электропривод дверей и багажника', 'Smart Cruise Control', 'Bose 12 динамиков'],
          en: ['8-passenger cabin', 'Smart power sliding doors & tailgate', 'Smart Cruise Control', 'Bose 12-speaker audio']
        }
      },
      {
        id: 'carnival-limousine',
        name: 'Hi-Limousine 7-seats VIP',
        priceUzs: 790000000,
        inStock: true,
        features: {
          uz: ['Premium VIP Relaxation o‘rindiqlar', '21.5 dyuymli tom monitori', 'Nappa teri', 'Ikkita elektr lyuk'],
          ru: ['Кресла VIP Relaxation с оттоманками', '21.5" потолочный смарт-экран', 'Кожа Nappa', 'Двойной люк'],
          en: ['VIP Relaxation ottomans', '21.5" roof smart display', 'Premium Nappa leather', 'Dual panoramic sunroofs']
        }
      }
    ]
  },
  {
    id: 'kia-ev6',
    name: 'KIA EV6',
    modelCode: 'ev6',
    year: 2026,
    bodyType: 'crossover',
    basePriceUzs: 699000000,
    specialPriceUzs: 679000000,
    status: 'available',
    isFeatured: true,
    isSpecialOffer: true,
    warrantyYears: 7,
    warrantyKm: 150000,
    mainImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: '100% Elektr Krossover — 528 km masofa bir quvvatda',
      ru: '100% Электрический кроссовер — 528 км на одном заряде',
      en: '100% Electric Crossover — 528 km range on a single charge'
    },
    description: {
      uz: 'KIA EV6 — innovatsion E-GMP platformasida yaratilgan to‘liq elektr flagman. 800V o‘ta tezkor quvvatlash (18 daqiqada 80%), AWD ikki motorli qudrat va futuristik salon.',
      ru: 'KIA EV6 построен на революционной платформе E-GMP: сверхбыстрая зарядка 800V за 18 минут и динамика спорткара.',
      en: 'The all-electric KIA EV6 delivers exhilarating performance, 800V ultra-fast charging, and zero-emission innovation.'
    },
    specs: {
      engineCapacity: 0.0,
      powerHp: 325,
      torqueNm: 605,
      fuelType: 'electric',
      transmission: '1 AT (Reducer)',
      driveType: 'AWD',
      acceleration0100: 5.2,
      topSpeedKmh: 188,
      fuelConsumptionCombined: 16.5,
      lengthMm: 4680,
      widthMm: 1880,
      heightMm: 1550,
      wheelbaseMm: 2900,
      groundClearanceMm: 160,
      trunkCapacityLiters: 520
    },
    trims: [
      {
        id: 'ev6-earth',
        name: 'Earth AWD 77.4 kWh',
        priceUzs: 699000000,
        inStock: true,
        features: {
          uz: ['77.4 kVt/soat batareya', '800V ultra tezkor zaryad', 'Meridian Premium audio', 'V2L quvvat berish funksiyasi'],
          ru: ['Батарея 77.4 кВт·ч', 'Ультрабыстрая зарядка 800V', 'Премиум-звук Meridian', 'Функция V2L (Vehicle-to-Load)'],
          en: ['77.4 kWh battery', '800V ultra-fast charging', 'Meridian Premium sound', 'V2L bi-directional charging']
        }
      },
      {
        id: 'ev6-gtline',
        name: 'GT-Line AWD Dual Motor',
        priceUzs: 770000000,
        inStock: true,
        features: {
          uz: ['325 ot kuchi AWD', 'Sportiv GT-Line paket', 'AR proektsion displey', 'Drive Wise 2.0 avtonom assistent'],
          ru: ['325 л.с. AWD', 'Спортивный пакет GT-Line', 'AR проекционный дисплей', 'Drive Wise 2.0 ADAS'],
          en: ['325 hp AWD', 'Sporty GT-Line styling', 'AR Head-Up Display', 'Drive Wise 2.0 ADAS']
        }
      }
    ]
  },
  {
    id: 'kia-bongo',
    name: 'KIA Bongo III',
    modelCode: 'bongo',
    year: 2026,
    bodyType: 'commercial',
    basePriceUzs: 215000000,
    status: 'available',
    isFeatured: false,
    isSpecialOffer: false,
    warrantyYears: 3,
    warrantyKm: 100000,
    mainImage: 'https://images.unsplash.com/photo-1586191582056-a60965d1d6a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586191582056-a60965d1d6a9?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: {
      uz: 'Biznesingizning ishonchli va chidamli hamkori',
      ru: 'Надежный и выносливый коммерческий партнер для бизнеса',
      en: 'Tough, reliable commercial workhorse for business'
    },
    description: {
      uz: 'KIA Bongo III — kichik va o‘rta biznes uchun tengsiz yuk mashinasi. 1000 kg dan ortiq yuk ko‘tarish, chidamli dizel dvigateli va arzon servis.',
      ru: 'KIA Bongo — грузовой автомобиль с высокой грузоподъемностью, проверенным турбодизелем и низкой стоимостью владения.',
      en: 'The legendary light commercial vehicle built for heavy duty hauling, proven turbo-diesel power, and unbeatable durability.'
    },
    specs: {
      engineCapacity: 2.5,
      powerHp: 133,
      torqueNm: 260,
      fuelType: 'diesel',
      transmission: '6 MT',
      driveType: 'RWD',
      acceleration0100: 15.0,
      topSpeedKmh: 150,
      fuelConsumptionCombined: 8.5,
      lengthMm: 5125,
      widthMm: 1740,
      heightMm: 1970,
      wheelbaseMm: 2615,
      groundClearanceMm: 190,
      trunkCapacityLiters: 1200
    },
    trims: [
      {
        id: 'bongo-standard',
        name: 'Standard Cab 4x2',
        priceUzs: 215000000,
        inStock: true,
        features: {
          uz: ['1 tonna yuk ko‘tarish', 'Gidravlik rul', 'Konditsioner', 'Elektr oynalar'],
          ru: ['Грузоподъемность 1т', 'Гидроусилитель руля', 'Кондиционер', 'Электростеклоподъемники'],
          en: ['1-ton payload', 'Power steering', 'Air conditioning', 'Power windows']
        }
      },
      {
        id: 'bongo-double-cab',
        name: 'Double Cab 4x4',
        priceUzs: 250000000,
        inStock: true,
        features: {
          uz: ['6 kishilik salon', '4x4 to‘liq uzatma', 'Kuchaytirilgan ressorlar', 'Old tumanga qarshi chiroqlar'],
          ru: ['6-местная кабина', 'Полный привод 4х4', 'Усиленные рессоры', 'Противотуманные фары'],
          en: ['6-passenger cab', '4x4 drive', 'Heavy-duty leaf springs', 'Front fog lights']
        }
      }
    ]
  }
];
