// Language & Internationalization Context for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
}

const STORAGE_KEY = 'kia_language_preference';

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  uz: {
    // Brand & General
    brandName: 'KIA AUTO CENTER',
    brandTagline: 'Movement that inspires — Ilhomlantiruvchi harakat',
    ownerLabel: 'Rasmiy diler rahbari: Nasriddinova Dilfuza',
    rightsReserved: 'Barcha huquqlar himoyalangan',
    currencySymbol: "so'm",

    // Navigation
    navHome: 'Bosh sahifa',
    navCatalog: 'Modellar',
    navCalculator: 'Kredit',
    navCompare: 'Taqqoslash',
    navTestDrive: 'Test-drayv',
    navService: 'Servis',
    navTradeIn: 'Trade-in',
    navOffers: 'Aksiyalar',
    navAbout: 'Biz haqimizda',
    navContact: 'Aloqa',
    navCabinet: 'Kabinet',
    navFavorites: 'Sevimlilar',
    navAdmin: 'Admin Panel',
    navLogin: 'Kirish',
    navRegister: "Ro'yxatdan o'tish",
    navLogout: 'Chiqish',

    // Hero & Home
    heroTitle: 'Yangi avlod KIA avtomobillari',
    heroSubtitle: 'O‘zbekistondagi rasmiy dilerlik markazi. 5 yil yoki 150 000 km zavod kafolati, qulay kredit va bepul test-drayv.',
    heroBtnExplore: 'Katalogni ko‘rish',
    heroBtnTestDrive: 'Test-drayvga yozilish',
    heroBtnCredit: 'Kredit hisoblash',

    // Home Sections
    sectionModelsTitle: 'KIA Modellar qatori',
    sectionModelsSubtitle: 'Har bir maqsad va xarakter uchun mukammal moslik',
    sectionOffersTitle: 'Maxsus takliflar va aksiyalar',
    sectionOffersSubtitle: 'Foydali xarid qilish uchun ajoyib imkoniyatlar',
    sectionAdvantagesTitle: 'Nega aynan KIA AUTO CENTER?',
    sectionCalculatorTitle: 'Avtokredit kalkulyatori',
    sectionCalculatorSubtitle: 'Oylik to‘lov va boshlang‘ich to‘lovni real hisoblang',
    sectionBranchesTitle: 'Bizning dilerlik markazlarimiz',

    // Advantages
    adv1Title: 'Rasmiy 5 yil kafolat',
    adv1Desc: 'Barcha yangi KIA modellariga 5 yil yoki 150 000 km kafolat beriladi.',
    adv2Title: '0% muddatli to‘lov',
    adv2Desc: 'Maxsus shartlar asosida ortiqcha foizlarsiz qulay to‘lov rejasi.',
    adv3Title: 'Tezkor Trade-In',
    adv3Desc: 'Eski avtomobilingizni 30 daqiqada baholab, yangi KIA ga almashtiring.',
    adv4Title: 'Sertifikatlangan servis',
    adv4Desc: 'Faqat original ehtiyot qismlar va tajribali professional muhandislar.',

    // Catalog & Filters
    filterAll: 'Barchasi',
    filterSedan: 'Sedanlar',
    filterCrossover: 'Krossoverlar',
    filterSuv: 'Yo‘ltanlamaslar',
    filterMinivan: 'Minivenlar',
    filterCommercial: 'Tijorat',
    searchPlaceholder: 'Model nomini qidiring (masalan: K5, Sportage)...',
    sortByPriceAsc: 'Narx: arzondan qimmatga',
    sortByPriceDesc: 'Narx: qimmatdan arzonga',
    sortByPower: 'Quvvat bo‘yicha',
    fromPrice: 'dan',
    inStock: 'Mavjud',
    detailsBtn: 'Batafsil',
    calculateLoanBtn: 'Kredit hisoblash',
    bookTestDriveBtn: 'Test-drayv',

    // Specs Labels
    specEngine: 'Dvigatel',
    specPower: 'Quvvat',
    specTorque: 'Aylanish momenti',
    specTransmission: 'Uzatmalar qutisi',
    specDrive: 'Uzatma',
    specAccel: '0-100 km/s',
    specConsumption: 'Yoqilg‘i sarfi',
    specDimensions: 'O‘lchamlari',
    specTrunk: 'Yukxona',
    specGroundClearance: 'Klirens',

    // Loan Calculator
    calcSelectCar: 'Avtomobilni tanlang',
    calcPrice: 'Avtomobil narxi',
    calcDownPayment: 'Boshlang‘ich to‘lov',
    calcTermMonths: 'Kredit muddati',
    calcInterestRate: 'Yillik foiz stavkasi',
    calcMonthlyPayment: 'Oylik to‘lov',
    calcTotalCredit: 'Kredit summasi',
    calcTotalRepayment: 'Jami to‘lanadigan summa',
    calcOverpayment: 'Ortiqcha to‘lov',
    calcSubmitBtn: 'Kredit olish uchun ariza topshirish',
    monthsCount: 'oy',

    // Forms & Inputs
    formFullName: 'To‘liq ism va familiya',
    formPhone: 'Telefon raqami (+998...)',
    formEmail: 'Elektron pochta (ixtiyoriy)',
    formBranch: 'Dilerlik markazini tanlang',
    formDate: 'Qulay sana',
    formTime: 'Qulay vaqt',
    formNotes: 'Qo‘shimcha izoh',
    formDriverLicense: 'Haydovchilik guvohnomasi raqami',
    formSubmit: 'Yuborish',
    formSuccessTitle: 'Arizangiz qabul qilindi!',
    formSuccessMsg: 'Tez orada mutaxassisimiz siz bilan bog‘lanadi.',

    // Service Center
    serviceTitle: 'KIA Rasmiy Servis Markazi',
    serviceSubtitle: 'Professional texnik xizmat va original ehtiyot qismlar',
    serviceTypeMaintenance: 'Rejali texnik xizmat (TO)',
    serviceTypeOil: 'Moy va filtrlar almashtirish',
    serviceTypeDiagnostics: 'Kompyuter diagnostikasi',
    serviceTypeBrakes: 'Tormoz tizimi servisi',
    serviceTypeRepair: 'Kafolatli va joriy ta’mirlash',
    serviceMileage: 'Avtomobil yurgan masofasi (km)',
    servicePlate: 'Davlat raqami (masalan: 01 A 777 AA)',

    // Trade In
    tradeInTitle: 'Trade-In: Yangi KIA ga oson almashtirish',
    tradeInSubtitle: 'Hozirgi avtomobilingizni bozor narxida baholab bering',
    currentCarBrand: 'Avtomobilingiz rusumi',
    currentCarModel: 'Modeli',
    currentCarYear: 'Ishlab chiqarilgan yili',
    currentCarMileage: 'Yurgan masofasi (km)',
    currentCarCondition: 'Holati',
    conditionExcellent: 'A’lo (bo‘yalmagan, nuqsonsiz)',
    conditionGood: 'Yaxshi (mayda tirnalishlar bor)',
    conditionFair: 'Qoniqarli',
    estimatedValuation: 'Taxminiy baholash narxi',
    tradeInSubmit: 'Baholashga ariza berish',

    // Admin
    adminDashboard: 'Boshqaruv Paneli',
    adminVehicles: 'Avtomobillar boshqaruvi',
    adminLeads: 'Mijozlar va CRM',
    adminTestDrives: 'Test-drayvlar',
    adminServices: 'Servis buyurtmalari',
    adminBranches: 'Filiallar',
    adminSettings: 'Sayt sozlamalari',
    statTotalVehicles: 'Jami avtomobillar',
    statAvailable: 'Mavjud avtomobillar',
    statSold: 'Sotilgan avtomobillar',
    statTotalCustomers: 'Jami mijozlar',
    statNewLeads: 'Yangi arizalar',
    statTestDrives: 'Test-drayvlar',
    statServices: 'Servis arizalari',
    statMonthlyRevenue: 'Oylik aylanma',
    statMonthlySales: 'Oylik sotuvlar soni',
    addNewCar: 'Yangi avtomobil qo‘shish',
    editCar: 'Avtomobilni tahrirlash',
    saveChanges: 'Saqlash',
    cancel: 'Bekor qilish',
    delete: 'O‘chirish',
  },
  ru: {
    // Brand & General
    brandName: 'KIA AUTO CENTER',
    brandTagline: 'Movement that inspires — Движение, которое вдохновляет',
    ownerLabel: 'Владелец официального центра: Насриддинова Дильфуза',
    rightsReserved: 'Все права защищены',
    currencySymbol: 'сум',

    // Navigation
    navHome: 'Главная',
    navCatalog: 'Модели',
    navCalculator: 'Кредит',
    navCompare: 'Сравнение',
    navTestDrive: 'Тест-драйв',
    navService: 'Сервис',
    navTradeIn: 'Trade-in',
    navOffers: 'Акции',
    navAbout: 'О нас',
    navContact: 'Контакты',
    navCabinet: 'Кабинет',
    navFavorites: 'Избранное',
    navAdmin: 'Админ-панель',
    navLogin: 'Войти',
    navRegister: 'Регистрация',
    navLogout: 'Выйти',

    // Hero & Home
    heroTitle: 'Новое поколение автомобилей KIA',
    heroSubtitle: 'Официальный дилерский центр в Узбекистане. 5 лет или 150 000 км заводской гарантии, выгодный автокредит и бесплатный тест-драйв.',
    heroBtnExplore: 'Смотреть каталог',
    heroBtnTestDrive: 'Записаться на тест-драйв',
    heroBtnCredit: 'Рассчитать кредит',

    // Home Sections
    sectionModelsTitle: 'Модельный ряд KIA',
    sectionModelsSubtitle: 'Идеальный выбор для любых целей и характера',
    sectionOffersTitle: 'Специальные предложения и акции',
    sectionOffersSubtitle: 'Отличные возможности для выгодной покупки',
    sectionAdvantagesTitle: 'Почему именно KIA AUTO CENTER?',
    sectionCalculatorTitle: 'Кредитный калькулятор',
    sectionCalculatorSubtitle: 'Рассчитайте ежемесячный платеж и первоначальный взнос',
    sectionBranchesTitle: 'Наши дилерские центры',

    // Advantages
    adv1Title: 'Официальная гарантия 5 лет',
    adv1Desc: 'На все новые автомобили KIA предоставляется гарантия 5 лет или 150 000 км.',
    adv2Title: 'Рассрочка 0%',
    adv2Desc: 'Выгодные программы без переплат на специальные модели.',
    adv3Title: 'Быстрый Trade-In',
    adv3Desc: 'Бесплатная оценка вашего авто за 30 минут с выгодой на новый KIA.',
    adv4Title: 'Сертифицированный сервис',
    adv4Desc: 'Только оригинальные запчасти и сертифицированные инженеры.',

    // Catalog & Filters
    filterAll: 'Все',
    filterSedan: 'Седаны',
    filterCrossover: 'Кроссоверы',
    filterSuv: 'Внедорожники',
    filterMinivan: 'Минивэны',
    filterCommercial: 'Коммерческие',
    searchPlaceholder: 'Поиск модели (например: K5, Sportage)...',
    sortByPriceAsc: 'Цена: по возрастанию',
    sortByPriceDesc: 'Цена: по убыванию',
    sortByPower: 'По мощности',
    fromPrice: 'от',
    inStock: 'В наличии',
    detailsBtn: 'Подробнее',
    calculateLoanBtn: 'Рассчитать кредит',
    bookTestDriveBtn: 'Тест-драйв',

    // Specs Labels
    specEngine: 'Двигатель',
    specPower: 'Мощность',
    specTorque: 'Крутящий момент',
    specTransmission: 'Коробка передач',
    specDrive: 'Привод',
    specAccel: '0-100 км/ч',
    specConsumption: 'Расход топлива',
    specDimensions: 'Габариты',
    specTrunk: 'Багажник',
    specGroundClearance: 'Клиренс',

    // Loan Calculator
    calcSelectCar: 'Выберите автомобиль',
    calcPrice: 'Стоимость автомобиля',
    calcDownPayment: 'Первоначальный взнос',
    calcTermMonths: 'Срок кредитования',
    calcInterestRate: 'Годовая ставка',
    calcMonthlyPayment: 'Ежемесячный платеж',
    calcTotalCredit: 'Сумма кредита',
    calcTotalRepayment: 'Общая сумма выплат',
    calcOverpayment: 'Переплата',
    calcSubmitBtn: 'Подать заявку на автокредит',
    monthsCount: 'мес.',

    // Forms & Inputs
    formFullName: 'ФИО полностью',
    formPhone: 'Номер телефона (+998...)',
    formEmail: 'Электронная почта (необязательно)',
    formBranch: 'Выберите дилерский центр',
    formDate: 'Удобная дата',
    formTime: 'Удобное время',
    formNotes: 'Дополнительные пожелания',
    formDriverLicense: 'Номер водительского удостоверения',
    formSubmit: 'Отправить заявку',
    formSuccessTitle: 'Заявка успешно принята!',
    formSuccessMsg: 'Наш менеджер свяжется с вами в ближайшее время.',

    // Service Center
    serviceTitle: 'Официальный Сервисный Центр KIA',
    serviceSubtitle: 'Профессиональное техническое обслуживание и оригинальные детали',
    serviceTypeMaintenance: 'Регулярное ТО',
    serviceTypeOil: 'Замена масла и фильтров',
    serviceTypeDiagnostics: 'Компьютерная диагностика',
    serviceTypeBrakes: 'Обслуживание тормозной системы',
    serviceTypeRepair: 'Гарантийный и текущий ремонт',
    serviceMileage: 'Пробег автомобиля (км)',
    servicePlate: 'Гос. номер (например: 01 A 777 AA)',

    // Trade In
    tradeInTitle: 'Trade-In: Легкий обмен на новый KIA',
    tradeInSubtitle: 'Оцените ваш текущий автомобиль по честной рыночной цене',
    currentCarBrand: 'Марка вашего автомобиля',
    currentCarModel: 'Модель',
    currentCarYear: 'Год выпуска',
    currentCarMileage: 'Пробег (км)',
    currentCarCondition: 'Состояние',
    conditionExcellent: 'Отличное (без окрасов, без дефектов)',
    conditionGood: 'Хорошее (мелкие сколы/царапины)',
    conditionFair: 'Удовлетворительное',
    estimatedValuation: 'Предварительная оценка',
    tradeInSubmit: 'Отправить на оценку',

    // Admin
    adminDashboard: 'Панель управления',
    adminVehicles: 'Управление автомобилями',
    adminLeads: 'Клиенты и CRM',
    adminTestDrives: 'Тест-драйвы',
    adminServices: 'Заявки сервиса',
    adminBranches: 'Филиалы',
    adminSettings: 'Настройки сайта',
    statTotalVehicles: 'Всего автомобилей',
    statAvailable: 'В наличии',
    statSold: 'Продано',
    statTotalCustomers: 'Всего клиентов',
    statNewLeads: 'Новые заявки',
    statTestDrives: 'Тест-драйвы',
    statServices: 'Заявки сервиса',
    statMonthlyRevenue: 'Месячная выручка',
    statMonthlySales: 'Продажи за месяц',
    addNewCar: 'Добавить автомобиль',
    editCar: 'Редактировать автомобиль',
    saveChanges: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
  },
  en: {
    // Brand & General
    brandName: 'KIA AUTO CENTER',
    brandTagline: 'Movement that inspires',
    ownerLabel: 'Official Dealership Owner: Nasriddinova Dilfuza',
    rightsReserved: 'All rights reserved',
    currencySymbol: 'UZS',

    // Navigation
    navHome: 'Home',
    navCatalog: 'Models',
    navCalculator: 'Finance',
    navCompare: 'Compare',
    navTestDrive: 'Test Drive',
    navService: 'Service',
    navTradeIn: 'Trade-in',
    navOffers: 'Offers',
    navAbout: 'About Us',
    navContact: 'Contact',
    navCabinet: 'Account',
    navFavorites: 'Saved',
    navAdmin: 'Admin Panel',
    navLogin: 'Sign In',
    navRegister: 'Sign Up',
    navLogout: 'Sign Out',

    // Hero & Home
    heroTitle: 'New Generation KIA Vehicles',
    heroSubtitle: 'Official dealership center in Uzbekistan. 5-year or 150,000 km warranty, attractive financing, and complimentary test drives.',
    heroBtnExplore: 'Explore Models',
    heroBtnTestDrive: 'Book Test Drive',
    heroBtnCredit: 'Calculate Finance',

    // Home Sections
    sectionModelsTitle: 'KIA Vehicle Lineup',
    sectionModelsSubtitle: 'Designed to inspire every journey',
    sectionOffersTitle: 'Special Promotions',
    sectionOffersSubtitle: 'Exclusive advantages on your new KIA purchase',
    sectionAdvantagesTitle: 'Why Choose KIA AUTO CENTER?',
    sectionCalculatorTitle: 'Auto Loan Calculator',
    sectionCalculatorSubtitle: 'Calculate your exact monthly payments and terms',
    sectionBranchesTitle: 'Our Dealership Locations',

    // Advantages
    adv1Title: '5-Year Factory Warranty',
    adv1Desc: 'All brand new KIA vehicles are covered by 5 years or 150,000 km warranty.',
    adv2Title: '0% Installment Plans',
    adv2Desc: 'Special zero-interest financing available on selected models.',
    adv3Title: 'Fast Trade-In',
    adv3Desc: 'Free professional appraisal in 30 minutes towards your new KIA.',
    adv4Title: 'Certified Service',
    adv4Desc: '100% genuine KIA parts and certified service engineers.',

    // Catalog & Filters
    filterAll: 'All Models',
    filterSedan: 'Sedans',
    filterCrossover: 'Crossovers',
    filterSuv: 'SUVs',
    filterMinivan: 'Minivans',
    filterCommercial: 'Commercial',
    searchPlaceholder: 'Search model (e.g. K5, Sportage)...',
    sortByPriceAsc: 'Price: Low to High',
    sortByPriceDesc: 'Price: High to Low',
    sortByPower: 'By Horsepower',
    fromPrice: 'from',
    inStock: 'In Stock',
    detailsBtn: 'Details',
    calculateLoanBtn: 'Finance',
    bookTestDriveBtn: 'Test Drive',

    // Specs Labels
    specEngine: 'Engine',
    specPower: 'Horsepower',
    specTorque: 'Torque',
    specTransmission: 'Transmission',
    specDrive: 'Drivetrain',
    specAccel: '0-100 km/h',
    specConsumption: 'Fuel Economy',
    specDimensions: 'Dimensions',
    specTrunk: 'Cargo Capacity',
    specGroundClearance: 'Ground Clearance',

    // Loan Calculator
    calcSelectCar: 'Select Model',
    calcPrice: 'Vehicle Price',
    calcDownPayment: 'Down Payment',
    calcTermMonths: 'Loan Duration',
    calcInterestRate: 'Annual Interest Rate',
    calcMonthlyPayment: 'Monthly Payment',
    calcTotalCredit: 'Total Loan Amount',
    calcTotalRepayment: 'Total Repayment',
    calcOverpayment: 'Total Interest',
    calcSubmitBtn: 'Submit Loan Application',
    monthsCount: 'mo.',

    // Forms & Inputs
    formFullName: 'Full Name',
    formPhone: 'Phone Number (+998...)',
    formEmail: 'Email Address (optional)',
    formBranch: 'Select Dealership Center',
    formDate: 'Preferred Date',
    formTime: 'Preferred Time',
    formNotes: 'Additional Notes',
    formDriverLicense: 'Driver License Number',
    formSubmit: 'Submit Request',
    formSuccessTitle: 'Request Received!',
    formSuccessMsg: 'Our manager will contact you promptly.',

    // Service Center
    serviceTitle: 'KIA Official Service Center',
    serviceSubtitle: 'Master technician care and genuine factory components',
    serviceTypeMaintenance: 'Scheduled Maintenance',
    serviceTypeOil: 'Engine Oil & Filter Service',
    serviceTypeDiagnostics: 'Computer Diagnostics',
    serviceTypeBrakes: 'Brake System Service',
    serviceTypeRepair: 'Warranty & Mechanical Repair',
    serviceMileage: 'Odometer (km)',
    servicePlate: 'License Plate (e.g. 01 A 777 AA)',

    // Trade In
    tradeInTitle: 'Trade-In: Upgrade to a New KIA',
    tradeInSubtitle: 'Get a top-market appraisal for your current vehicle',
    currentCarBrand: 'Current Vehicle Make',
    currentCarModel: 'Model',
    currentCarYear: 'Year',
    currentCarMileage: 'Odometer (km)',
    currentCarCondition: 'Condition',
    conditionExcellent: 'Excellent (Flawless, original paint)',
    conditionGood: 'Good (Minor wear)',
    conditionFair: 'Fair',
    estimatedValuation: 'Estimated Trade-In Value',
    tradeInSubmit: 'Request Valuation',

    // Admin
    adminDashboard: 'Dashboard',
    adminVehicles: 'Vehicle Fleet',
    adminLeads: 'CRM & Leads',
    adminTestDrives: 'Test Drives',
    adminServices: 'Service Bookings',
    adminBranches: 'Branches',
    adminSettings: 'Settings',
    statTotalVehicles: 'Total Fleet',
    statAvailable: 'Available Units',
    statSold: 'Sold Units',
    statTotalCustomers: 'Total Clients',
    statNewLeads: 'New Leads',
    statTestDrives: 'Test Drives',
    statServices: 'Service Appointments',
    statMonthlyRevenue: 'Monthly Revenue',
    statMonthlySales: 'Monthly Sales',
    addNewCar: 'Add Vehicle',
    editCar: 'Edit Vehicle',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    delete: 'Delete',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'uz',
  setLanguage: () => {},
  t: (key: string) => key,
  formatCurrency: (amount: number) => `${amount} so'm`,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('uz');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === 'uz' || saved === 'ru' || saved === 'en') {
        setLanguageState(saved);
      }
    });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    AsyncStorage.setItem(STORAGE_KEY, lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['uz']?.[key] || key;
  };

  const formatCurrency = (amount: number): string => {
    const formatted = Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    if (language === 'en') {
      return `${formatted} UZS`;
    }
    return `${formatted} ${TRANSLATIONS[language].currencySymbol}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
