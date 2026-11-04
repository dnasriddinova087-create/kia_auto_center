// KIA AUTO CENTER — Official Dealership Branches in Uzbekistan
// Owner: Nasriddinova Dilfuza

export interface Branch {
  id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  address: {
    uz: string;
    ru: string;
    en: string;
  };
  city: string;
  phone: string;
  email: string;
  workingHours: {
    uz: string;
    ru: string;
    en: string;
  };
  isMain: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const KIA_BRANCHES: Branch[] = [
  {
    id: 'branch-sergeli',
    name: {
      uz: 'KIA Sergeli Bosh Avtosaloni',
      ru: 'Главный Автосалон KIA Сергели',
      en: 'KIA Sergeli Flagship Center'
    },
    address: {
      uz: 'Toshkent sh., Sergeli tumani, Yangi Sergeli ko‘chasi, 24-uy',
      ru: 'г. Ташкент, Сергелийский район, ул. Янги Сергели, дом 24',
      en: 'Tashkent, Sergeli dist., Yangi Sergeli st., 24'
    },
    city: 'Toshkent',
    phone: '+998 71 200 05 25',
    email: 'sergeli@kia-autocenter.uz',
    workingHours: {
      uz: 'Dush-Shan: 09:00 - 20:00, Yak: 10:00 - 18:00',
      ru: 'Пн-Сб: 09:00 - 20:00, Вс: 10:00 - 18:00',
      en: 'Mon-Sat: 09:00 - 20:00, Sun: 10:00 - 18:00'
    },
    isMain: true,
    coordinates: {
      lat: 41.2289,
      lng: 69.2195
    }
  },
  {
    id: 'branch-rohat',
    name: {
      uz: 'KIA Rohat Avtosaloni & Servis',
      ru: 'Автосалон & Сервис KIA Рохат',
      en: 'KIA Rohat Showroom & Service'
    },
    address: {
      uz: 'Toshkent sh., Bektemir tumani, Ohangaron shossesi, 11',
      ru: 'г. Ташкент, Бектемирский район, Ахангаранское шоссе, 11',
      en: 'Tashkent, Bektemir dist., Akhangaran highway, 11'
    },
    city: 'Toshkent',
    phone: '+998 71 200 05 26',
    email: 'rohat@kia-autocenter.uz',
    workingHours: {
      uz: 'Dush-Shan: 09:00 - 19:00, Yak: 10:00 - 17:00',
      ru: 'Пн-Сб: 09:00 - 19:00, Вс: 10:00 - 17:00',
      en: 'Mon-Sat: 09:00 - 19:00, Sun: 10:00 - 17:00'
    },
    isMain: false,
    coordinates: {
      lat: 41.2721,
      lng: 69.3622
    }
  },
  {
    id: 'branch-samarkand',
    name: {
      uz: 'KIA Samarqand Rasmiy Markazi',
      ru: 'Официальный Центр KIA Самарканд',
      en: 'KIA Samarkand Official Center'
    },
    address: {
      uz: 'Samarqand sh., Gagarin ko‘chasi, 88-uy',
      ru: 'г. Самарканд, ул. Гагарина, дом 88',
      en: 'Samarkand, Gagarin st., 88'
    },
    city: 'Samarqand',
    phone: '+998 66 230 05 25',
    email: 'samarkand@kia-autocenter.uz',
    workingHours: {
      uz: 'Dush-Shan: 09:00 - 18:30, Yak: Dam olish',
      ru: 'Пн-Сб: 09:00 - 18:30, Вс: Выходной',
      en: 'Mon-Sat: 09:00 - 18:30, Sun: Closed'
    },
    isMain: false,
    coordinates: {
      lat: 39.6542,
      lng: 66.9597
    }
  },
  {
    id: 'branch-bukhara',
    name: {
      uz: 'KIA Buxoro Rasmiy Markazi',
      ru: 'Официальный Центр KIA Бухара',
      en: 'KIA Bukhara Official Center'
    },
    address: {
      uz: 'Buxoro sh., G‘ijduvon ko‘chasi, 45-uy',
      ru: 'г. Бухара, ул. Гиждуванская, дом 45',
      en: 'Bukhara, Gijduvan st., 45'
    },
    city: 'Buxoro',
    phone: '+998 65 220 05 25',
    email: 'bukhara@kia-autocenter.uz',
    workingHours: {
      uz: 'Dush-Shan: 09:00 - 18:30, Yak: Dam olish',
      ru: 'Пн-Сб: 09:00 - 18:30, Вс: Выходной',
      en: 'Mon-Sat: 09:00 - 18:30, Sun: Closed'
    },
    isMain: false,
    coordinates: {
      lat: 39.7747,
      lng: 64.4286
    }
  }
];
