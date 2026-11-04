# KIA AUTO CENTER — Rasmiy Dilerlik Mobil va Veb Platformasi

> **Loyiha egasi:** Nasriddinova Dilfuza  
> **Platforma:** React Native / Expo SDK 52 / Expo Router / React Native Web  
> **GitHub Repository:** [https://github.com/dnasriddinova087-create/kia_auto_center.git](https://github.com/dnasriddinova087-create/kia_auto_center.git)  
> **Texnologiyalar:** TypeScript, Supabase PostgreSQL, Lucide Icons, TanStack Query, React Hook Form, Zod  

---

## 🚗 Loyiha Haqida

**KIA AUTO CENTER** — O‘zbekiston avtomobil bozori uchun maxsus ishlab chiqilgan rasmiy KIA dilerlik markazining yagona ekotizimi. Ushbu platforma ham mobil ilova (Android va iOS / Expo Go), ham zamonaviy veb-platforma (Desktop, Planshet, Mobil brauzer) sifatida ishlaydi.

### Asosiy Xususiyatlar:
- **11 ta Rasmiy KIA Modellari:** KIA K3, KIA K5, KIA K8, KIA K9, KIA Sonet, KIA Seltos, KIA Sportage, KIA Sorento, KIA Carens, KIA Carnival, KIA Bongo III.
- **Rasmiy 5 Yillik Zavod Kafolati:** Barcha avtomobillarga 5 yil yoki 150 000 km kafolat ko‘rsatilgan.
- **Interaktiv Avtokredit Kalkulyatori:** Boshlang‘ich to‘lov, kredit muddati, oylik to‘lov va jami foizlarni real vaqtda hisoblash hamda ariza yuborish.
- **Tezkor Trade-In Dasturi:** Hozirgi avtomobilni onlayn baholash va yangi KIA uchun 15 000 000 so‘m bonus olish imkoniyati.
- **Onlayn Test-Drayv:** Model, dilerlik filiali (Sergeli, Rohat, Samarqand, Buxoro), sana va vaqtni tanlab yozilish.
- **Rasmiy Servis Markazi:** TO-1, TO-2, moy almashtirish, kompyuter diagnostikasi va kafolatli ta’mirlashga onlayn bron qilish.
- **Modellarni Taqqoslash:** 3 tagacha KIA modelining dvigatel, quvvat, o‘lcham, klirens va narxlarini yonma-yon solishtirish.
- **Professional Admin Panel:** Super Admin, Sotuv menejeri va Servis menejeri uchun to‘liq CRM, arizalar nazorati, narxlar va filiallar boshqaruvi.
- **3 Tilli Tizim:** O‘zbek, Rus va Ingliz tillarida to‘liq lokalizatsiya.
- **Valyuta va Telefon Formati:** O‘zbekiston so‘mi (`UZS` / `so'm`) va `+998` telefon raqamlari.
- **Premium KIA Brend Dizayni:** KIA qora (`#111111`), oq (`#FFFFFF`) va mashhur KIA Red (`#C8102E`) ranglari, Light va Dark rejimlar.

---

## 🛠 O‘rnatish va Ishga Tushirish

### 1. Bog‘liqliklarni o‘rnatish:
```bash
npm install
```

### 2. Expo orqali ishga tushirish (Mobil va Web):
```bash
# Metro serverini ishga tushirish (QR kod orqali Expo Go ilovasida ochish)
npx expo start

# Masofadan Expo Go bilan ochish (Tunnel)
npx expo start --tunnel

# Brauzerda Web versiyani ochish
npx expo start --web
```

### 3. Vercel uchun Web Build:
```bash
npx expo export --platform web
```

---

## 🗄 Ma’lumotlar Bazasi va Supabase Arxitekturasi

Loyiha uchun `supabase/migrations/20261104_initial_schema.sql` faylida to‘liq PostgreSQL tuzilmasi, RLS xavfsizlik qoidalari va seed ma’lumotlar tayyorlangan:

1. `profiles` — Foydalanuvchilar profillari
2. `roles` & `permissions` — Tizim rollari va ruxsatlari
3. `vehicles` — 11 ta KIA modeli va ularning xususiyatlari
4. `vehicle_images` — Galereya rasmlari
5. `vehicle_specs` — Dvigatel, quvvat, o‘lchamlar
6. `vehicle_trims` — Komplektatsiyalar
7. `branches` — Dilerlik markazlari (Sergeli, Rohat, Samarqand, Buxoro)
8. `leads` — CRM va sotuv arizalari
9. `test_drive_requests` — Test-drayv arizalari
10. `service_requests` — Servis buyurtmalari
11. `trade_in_requests` — Trade-in baholash so‘rovlari
12. `orders` & `payments` — Avtomobil buyurtmalari va to‘lovlar
13. `favorites` — Saqlangan avtomobillar
14. `promotions` — Aksiya va maxsus takliflar
15. `employees` — Dilerlik xodimlari
16. `notifications` — Xabarnomalar
17. `reviews` — Mijozlar fikrlari
18. `activity_logs` — Tizim harakatlari
19. `site_settings` — Sayt global sozlamalari

### Muhit o‘zgaruvchilari (`.env`):
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

*Eslatma: Agar Supabase kalitlari kiritilmagan bo‘lsa ham, ilova avtonom rejimda (Local Mock Store) to‘liq ishlaydi va barcha amallarni saqlaydi.*

---

## 👥 Demo Kirish Profillari va Xodimlar Rollari (RBAC)

Platformada rolga asoslangan boshqaruv tizimi (Role-Based Access Control) to‘liq joriy qilingan:

- **Super Admin (Loyiha egasi):** `admin@kia-autocenter.uz` (Ism: **Nasriddinova Dilfuza**) — Barcha modullarga 100% cheklovsiz vakolat
- **Admin (Operatsion boshqaruvchi):** `manager@kia-autocenter.uz` (Ism: **Farrux Qodirov**) — Avtomobillar, arizalar, filiallar
- **Sotuv Menejeri (Sales Manager):** `sales@kia-autocenter.uz` (Ism: **Alisher Shodiyev**) — Shartnomalar, bitimlar va CRM
- **Servis Menejeri (Service Manager):** `service@kia-autocenter.uz` (Ism: **Bobur Rustamov**) — Ustaxonalar va TO buyurtmalari
- **Mijozlar Konsultanti (Consultant):** `consultant@kia-autocenter.uz` (Ism: **Kamola Karimova**) — Konsultatsiyalar va so‘rovlar
- **Auditor / Tahlilchi (Report Viewer):** `reports@kia-autocenter.uz` (Ism: **Ulug‘bek Salimov**) — Faqat statistik hisobotlar
- **Mijoz (Customer):** `customer@kia-autocenter.uz` (Ism: **Dilshod Ergashev**) — Shaxsiy kabinet va arizalar

---

## 🎛 Administrator Portali Bo‘limlari (`/admin`)

1. **Xavfsiz Kirish Portali (`/admin/login`):** Parol ko‘rsatish/yashirish, eslab qolish, parolni tiklash va server-side rol tekshiruvi.
2. **Dashboard (`/admin/dashboard`):** 10 ta asosiy KPI ko‘rsatkichi, oylik dinamika grafigi, ommabop modellar nisbati, yangi arizalar.
3. **Avtomobillar Floti (`/admin/vehicles`):** 11 ta modelning to‘liq CRUD boshqaruvi, narx, chegirma, ot kuchi, transmissiya, zaxira va statuslar.
4. **Mijozlar Bazasi (`/admin/customers`):** Xaridlar tarixi, hisobni bloklash / faollashtirish, qidiruv va tahrirlash.
5. **CRM Tizimi (`/admin/crm`):** Avto xaridi, test-drayv, kredit, trade-in va servis arizalari, statuslar tarixi, mas’ul menejer.
6. **Sotuvlar Bo‘limi (`/admin/sales`):** Yangi shartnoma rasmiylashtirish, to‘lov turlari, tushum hisob-kitobi va **CSV eksport**.
7. **Test-Drayv Boshqaruvi (`/admin/test-drives`):** Sana/vaqt ziddiyatlarini oldini olish, instruktor biriktirish, tasdiqlash va yakunlash.
8. **Servis Markazi (`/admin/service`):** TO-1, TO-2, diagnostika, usta biriktirish, narx belgilash va buyurtma statuslari.
9. **Xodimlar va Vakolatlar (`/admin/employees`):** Super Admin, Admin, Sales Manager, Service Manager, Consultant, Report Viewer boshqaruvi.
10. **Ombor va Zaxira (`/admin/inventory`):** Rang va model bo‘yicha qoldiqlar, kirim-chiqim loglari, zaxira harakati.
11. **Moliya va Kredit Takliflari (`/admin/finance`):** Hamkor banklar, imtiyozli foiz stavkalari, muddatli to‘lov (0% rassrochka).
12. **Filiallar (`/admin/branches`) va Kontent (`/admin/content`):** Dilerlik manzillari, xarita, reklama bannerlari va mijozlar fikrlari moderatsiyasi.
13. **Hisobotlar va Tahlil (`/admin/reports`):** Sotuvlar, tushum, menejerlar samaradorligi va **CSV formatida yuklab olish**.
14. **Bildirishnomalar Markazi (`/admin/notifications`):** Yangi arizalar va ombor o‘zgarishlari bo‘yicha real-time bildirishnomalar.
15. **Tizim Sozlamalari (`/admin/settings`):** Dilerlik ma’lumotlari, valyuta kursi va kafolat muddatlari.

---

## 🏢 Dilerlik Filiallari

1. **KIA Sergeli Bosh Avtosaloni** — Toshkent sh., Yangi Sergeli ko‘chasi, 24. Tel: `+998 71 200 05 25`
2. **KIA Rohat Avtosaloni & Servis** — Toshkent sh., Ohangaron shossesi, 11. Tel: `+998 71 200 05 26`
3. **KIA Samarqand Rasmiy Markazi** — Samarqand sh., Gagarin ko‘chasi, 88. Tel: `+998 66 230 05 25`
4. **KIA Buxoro Rasmiy Markazi** — Buxoro sh., G‘ijduvon ko‘chasi, 45. Tel: `+998 65 220 05 25`

---

## 📄 Litsenziya va Mualliflik

© 2026 **KIA AUTO CENTER UZBEKISTAN**. Barcha huquqlar himoyalangan.  
Loyiha egasi: **Nasriddinova Dilfuza**.
