// KIA AUTO CENTER — Special Promotions & Campaigns
// Owner: Nasriddinova Dilfuza

import { KIA_LOCAL_IMAGES } from './vehicleImages';

export interface Offer {
  id: string;
  badge: {
    uz: string;
    ru: string;
    en: string;
  };
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  details: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  image: any;
  validUntil: string;
}

export const KIA_OFFERS: Offer[] = [
  {
    id: 'offer-0-percent',
    badge: {
      uz: '0% MUDDATLI TO‘LOV',
      ru: 'РАССРОЧКА 0%',
      en: '0% INSTALLMENT'
    },
    title: {
      uz: 'KIA K5 va Sonet uchun 0% muddatli to‘lov dasturi',
      ru: 'Программа 0% рассрочки на KIA K5 и Sonet',
      en: '0% Installment Program for KIA K5 & Sonet'
    },
    description: {
      uz: 'Boshlang‘ich to‘lov 40% bo‘lganda, 24 oygacha bo‘lgan muddatga 0% ustama bilan xarid qiling.',
      ru: 'При первоначальном взносе от 40% оформите рассрочку на срок до 24 месяцев без переплат.',
      en: 'Pay 40% down and enjoy up to 24 months zero-interest installment plan.'
    },
    details: {
      uz: [
        'Ortiqcha to‘lovlarsiz foizsiz shartlar',
        '2 soat ichida bank tasdig‘i',
        'KASKO sug‘urtasi sovg‘a sifatida',
        'Barcha rasmiy salonlarda amal qiladi'
      ],
      ru: [
        'Честная рассрочка без скрытых комиссий',
        'Одобрение в течение 2 часов',
        'Полис КАСКО в подарок',
        'Действует во всех филиалах сети'
      ],
      en: [
        'Zero hidden fees or extra interest',
        'Bank approval within 2 hours',
        'Complimentary comprehensive insurance',
        'Valid at all official dealership centers'
      ]
    },
    image: KIA_LOCAL_IMAGES['kia-k5'],
    validUntil: '2026-12-31'
  },
  {
    id: 'offer-trade-in-bonus',
    badge: {
      uz: '+50 000 000 SO‘M BONUS',
      ru: '+50 000 000 СУМ БОНУС',
      en: '+50,000,000 UZS BONUS'
    },
    title: {
      uz: 'Eski avtomobilingizni yangi KIA Sportage’ga almashtiring',
      ru: 'Обменяйте свой автомобиль на новый KIA Sportage с выгодой',
      en: 'Trade-in your current car for a brand new KIA Sportage'
    },
    description: {
      uz: 'Trade-In dasturi orqali avtomobilingizni bozor bahosida baholatib, 50 000 000 so‘mgacha qo‘shimcha zavod bonusi oling.',
      ru: 'Сдайте свой текущий автомобиль по рыночной стоимости и получите прямую выгоду до 50 000 000 сум.',
      en: 'Trade in your vehicle at market value and get an instant bonus up to 50,000,000 UZS.'
    },
    details: {
      uz: [
        'Har qanday rusumdagi avtomobillar qabul qilinadi',
        '30 daqiqada bepul professional baholash',
        'Hujjatlarni bir kunda to‘liq rasmiylashtirish'
      ],
      ru: [
        'Принимаем любые марки и модели автомобилей',
        'Бесплатная диагностика и оценка за 30 минут',
        'Оформление всех документов за 1 рабочий день'
      ],
      en: [
        'All makes and models accepted',
        'Free professional appraisal in 30 minutes',
        'Same-day paperwork completion'
      ]
    },
    image: KIA_LOCAL_IMAGES['kia-sportage'],
    validUntil: '2026-12-31'
  },
  {
    id: 'offer-warranty',
    badge: {
      uz: '5 YIL KAFOLAT + 3 YIL TO',
      ru: '5 ЛЕТ ГАРАНТИИ + 3 ГОДА ТО',
      en: '5 YEARS WARRANTY + 3 YRS MAINTENANCE'
    },
    title: {
      uz: 'Rasmiy 5 yil yoki 150 000 km kafolat va bepul servis',
      ru: 'Официальная гарантия 5 лет или 150 000 км и ТО',
      en: 'Official 5-Year / 150,000 km Warranty & Service'
    },
    description: {
      uz: 'Barcha yangi KIA avtomobillariga zavod tomonidan 5 yil yoki 150 000 km kafolat hamda 3 yillik bepul texnik ko‘rik beriladi.',
      ru: 'На все новые автомобили KIA предоставляется надежная гарантия качества и 3 года сервиса.',
      en: 'All new KIA vehicles come with peace of mind backed by factory 5-year coverage and complimentary service.'
    },
    details: {
      uz: [
        '24/7 Roadside Assistance yo‘lda yordam xizmati',
        'Faqat original ehtiyot qismlar va sarflovchilar',
        'Sertifikatlangan professional mutaxassislar'
      ],
      ru: [
        'Круглосуточная помощь на дорогах 24/7',
        'Только оригинальные запасные части',
        'Сертифицированные сервисные инженеры'
      ],
      en: [
        '24/7 Roadside Assistance coverage across Uzbekistan',
        '100% genuine factory parts',
        'Master-certified KIA technicians'
      ]
    },
    image: KIA_LOCAL_IMAGES['kia-sorento'],
    validUntil: '2026-12-31'
  }
];
