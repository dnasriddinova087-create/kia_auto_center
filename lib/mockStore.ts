// Central Data Store & Storage Persistence for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import AsyncStorage from '@react-native-async-storage/async-storage';
import { KIA_VEHICLES } from '../constants/vehicles';
import { KIA_BRANCHES } from '../constants/branches';
import {
  Vehicle,
  Lead,
  TestDriveRequest,
  ServiceRequest,
  TradeInRequest,
  SiteSettings,
  DashboardStats,
  CustomerRecord,
  SaleTransaction,
  AdminEmployee,
  AdminNotification,
  InventoryMovement,
  FinanceOffer,
} from '../types';

const STORAGE_KEYS = {
  VEHICLES: 'kia_store_vehicles_v2',
  LEADS: 'kia_store_leads_v2',
  TEST_DRIVES: 'kia_store_test_drives_v2',
  SERVICES: 'kia_store_services_v2',
  TRADE_INS: 'kia_store_trade_ins_v2',
  CUSTOMERS: 'kia_store_customers_v3',
  SALES: 'kia_store_sales_v2',
  EMPLOYEES: 'kia_store_employees_v2',
  INVENTORY: 'kia_store_inventory_v2',
  FINANCE: 'kia_store_finance_v2',
  NOTIFICATIONS: 'kia_store_notifications_v2',
  SETTINGS: 'kia_store_settings_v2',
};

export const DEFAULT_SETTINGS: SiteSettings = {
  dealershipName: 'KIA AUTO CENTER',
  owner: 'Nasriddinova Dilfuza',
  phone: '+998 71 200 05 25',
  emergencyPhone: '+998 90 123 45 67',
  email: 'info@kia-autocenter.uz',
  addressMain: 'Toshkent sh., Sergeli tumani, Yangi Sergeli ko‘chasi, 24-uy',
  defaultLoanInterestRate: 18.5,
  defaultLoanMinDownPaymentPct: 20,
  currency: 'UZS',
  usdToUzsRate: 12900,
  warrantyYears: 5,
  warrantyKm: 150000,
};

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    customerName: 'Javohir Alimov',
    phone: '+998 90 987 65 43',
    email: 'javohir@example.uz',
    vehicleId: 'kia-k5',
    vehicleName: 'KIA K5 GT Line+',
    branchId: 'branch-sergeli',
    source: 'web_catalog',
    leadType: 'loan',
    status: 'new',
    budgetUzs: 468000000,
    assignedManager: 'Alisher Shodiyev',
    notes: 'Kredit orqali 3 yillik to‘lovga qiziqmoqda',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead-2',
    customerName: 'Nilufar Rahimova',
    phone: '+998 97 712 34 56',
    email: 'nilufar@example.uz',
    vehicleId: 'kia-sportage',
    vehicleName: 'KIA Sportage X-Line',
    branchId: 'branch-rohat',
    source: 'mobile_app',
    leadType: 'purchase',
    status: 'contacted',
    budgetUzs: 510000000,
    assignedManager: 'Alisher Shodiyev',
    notes: 'X-Line AWD komplektatsiyasi, rang oq perlamutr kerak',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'lead-3',
    customerName: 'Sardor Karimov',
    phone: '+998 93 500 11 22',
    vehicleId: 'kia-sonet',
    vehicleName: 'KIA Sonet Prestige',
    branchId: 'branch-samarkand',
    source: 'test_drive_form',
    leadType: 'test_drive',
    status: 'test_drive_scheduled',
    budgetUzs: 255000000,
    assignedManager: 'Sohib Yoqubov',
    notes: 'Samarqand filialida test-drayv belgilandi',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'lead-4',
    customerName: 'Bekzod Toshmatov',
    phone: '+998 99 888 77 66',
    vehicleId: 'kia-k8',
    vehicleName: 'KIA K8 Signature VIP',
    branchId: 'branch-sergeli',
    source: 'direct_call',
    leadType: 'purchase',
    status: 'contract_signed',
    budgetUzs: 795000000,
    assignedManager: 'Alisher Shodiyev',
    notes: 'Shartnoma imzolandi, to‘lov kutilmoqda',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'lead-5',
    customerName: 'Zarina Rustamova',
    phone: '+998 91 222 33 44',
    vehicleId: 'kia-seltos',
    vehicleName: 'KIA Seltos Style',
    branchId: 'branch-sergeli',
    source: 'web_catalog',
    leadType: 'trade_in',
    status: 'in_negotiation',
    budgetUzs: 380000000,
    assignedManager: 'Alisher Shodiyev',
    notes: 'Mavjud Tracker 2 avtomobilini baholatmoqchi',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

const INITIAL_TEST_DRIVES: TestDriveRequest[] = [
  {
    id: 'td-1',
    fullName: 'Sardor Karimov',
    phone: '+998 93 500 11 22',
    driverLicenseNumber: 'AA 1234567',
    vehicleId: 'kia-sonet',
    vehicleName: 'KIA Sonet',
    branchId: 'branch-samarkand',
    branchName: 'KIA Samarqand Rasmiy Markazi',
    preferredDate: '2026-11-06',
    preferredTime: '14:00',
    assignedStaff: 'Sohib Yoqubov',
    status: 'confirmed',
    notes: 'Mijoz 14:00 da keladi',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'td-2',
    fullName: 'Olim Vohidov',
    phone: '+998 91 333 44 55',
    driverLicenseNumber: 'AB 7654321',
    vehicleId: 'kia-k5',
    vehicleName: 'KIA K5',
    branchId: 'branch-sergeli',
    branchName: 'KIA Sergeli Bosh Avtosaloni',
    preferredDate: '2026-11-07',
    preferredTime: '11:30',
    assignedStaff: 'Alisher Shodiyev',
    status: 'pending',
    notes: 'GT Line bilan tanishmoqchi',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'td-3',
    fullName: 'Madina Usmonova',
    phone: '+998 90 777 88 99',
    driverLicenseNumber: 'AC 9988776',
    vehicleId: 'kia-sorento',
    vehicleName: 'KIA Sorento',
    branchId: 'branch-rohat',
    branchName: 'KIA Rohat Avtosaloni & Servis',
    preferredDate: '2026-11-08',
    preferredTime: '16:00',
    assignedStaff: 'Jasur Beknazarov',
    status: 'confirmed',
    notes: 'Oila bilan 7 o‘rinli komplektatsiyani sinab ko‘rmoqchi',
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_SERVICES: ServiceRequest[] = [
  {
    id: 'srv-1',
    fullName: 'Farhod Umarov',
    phone: '+998 94 620 90 80',
    vehicleModel: 'KIA Sportage 2024',
    licensePlate: '01 A 777 BA',
    vin: 'KNAB1234567890123',
    mileageKm: 15000,
    serviceType: 'Davriy texnik xizmat (TO-1)',
    technicianName: 'Bobur Rustamov (Bosh usta)',
    branchId: 'branch-rohat',
    branchName: 'KIA Rohat Avtosaloni & Servis',
    preferredDate: '2026-11-08',
    preferredTime: '10:00',
    status: 'in_progress',
    estimatedCostUzs: 1850000,
    notes: 'Moy, filtrlar va tormoz kolodkalari tekshiruvi',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'srv-2',
    fullName: 'Shaxlo Karimova',
    phone: '+998 90 111 22 33',
    vehicleModel: 'KIA K5 2023',
    licensePlate: '01 B 123 CA',
    vin: 'KNAK9876543210987',
    mileageKm: 30000,
    serviceType: 'Kompyuter diagnostikasi va konditsioner',
    technicianName: 'Sherzod Aliyev',
    branchId: 'branch-sergeli',
    branchName: 'KIA Sergeli Bosh Avtosaloni',
    preferredDate: '2026-11-09',
    preferredTime: '15:00',
    status: 'accepted',
    estimatedCostUzs: 950000,
    notes: 'Salon filtri almashtirish',
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_TRADE_INS: TradeInRequest[] = [
  {
    id: 'ti-1',
    fullName: 'Aziz Mahmudov',
    phone: '+998 97 450 12 34',
    currentCarBrand: 'Chevrolet',
    currentCarModel: 'Malibu 2 Turbo',
    currentCarYear: 2022,
    currentCarMileage: 48000,
    currentCarCondition: 'excellent',
    targetVehicleId: 'kia-k8',
    targetVehicleName: 'KIA K8',
    estimatedValueUzs: 310000000,
    status: 'in_progress',
    notes: 'Avtomobil toza, kraskasi yo‘q. 15 000 000 so‘m Trade-In bonus berildi.',
    createdAt: new Date().toISOString(),
  },
];

// Real registered customers only (no fake samples)
const INITIAL_CUSTOMERS: CustomerRecord[] = [];

const INITIAL_SALES: SaleTransaction[] = [
  {
    id: 'sale-1',
    contractNumber: 'KIA-2026-001',
    customerName: 'Dilshod Ergashev',
    customerPhone: '+998 99 987 65 43',
    customerEmail: 'customer@kia-autocenter.uz',
    vehicleId: 'kia-k5',
    vehicleName: 'KIA K5 GT Line+',
    basePriceUzs: 478000000,
    discountUzs: 10000000,
    finalPriceUzs: 468000000,
    paymentMethod: 'auto_loan',
    salesManager: 'Alisher Shodiyev',
    status: 'completed',
    saleDate: '2026-02-20',
    notes: 'Avtomobil to‘liq topshirildi, 5 yillik kafolat faollashtirildi.',
  },
  {
    id: 'sale-2',
    contractNumber: 'KIA-2026-002',
    customerName: 'Nilufar Rahimova',
    customerPhone: '+998 97 712 34 56',
    customerEmail: 'nilufar@example.uz',
    vehicleId: 'kia-sportage',
    vehicleName: 'KIA Sportage X-Line AWD',
    basePriceUzs: 525000000,
    discountUzs: 15000000,
    finalPriceUzs: 510000000,
    paymentMethod: 'cash',
    salesManager: 'Alisher Shodiyev',
    status: 'completed',
    saleDate: '2026-03-05',
    notes: 'Oq perlamutr, 100% to‘lov amalga oshirildi.',
  },
  {
    id: 'sale-3',
    contractNumber: 'KIA-2026-003',
    customerName: 'Bekzod Toshmatov',
    customerPhone: '+998 99 888 77 66',
    customerEmail: 'bekzod@vip.uz',
    vehicleId: 'kia-k8',
    vehicleName: 'KIA K8 Signature VIP',
    basePriceUzs: 815000000,
    discountUzs: 20000000,
    finalPriceUzs: 795000000,
    paymentMethod: 'bank_transfer',
    salesManager: 'Alisher Shodiyev',
    status: 'contract_signed',
    saleDate: '2026-03-22',
    notes: 'Shartnoma imzolandi, bank o‘tkazmasi kutilmoqda.',
  },
];

const INITIAL_EMPLOYEES: AdminEmployee[] = [
  {
    id: 'emp-1',
    fullName: 'Nasriddinova Dilfuza',
    email: 'admin@kia-autocenter.uz',
    phone: '+998 71 200 05 25',
    role: 'super_admin',
    department: 'Boshqaruv Kengashi (Loyiha Egasi)',
    isActive: true,
    createdAt: '2025-10-01T00:00:00Z',
  },
  {
    id: 'emp-2',
    fullName: 'Alisher Shodiyev',
    email: 'sales@kia-autocenter.uz',
    phone: '+998 90 123 45 67',
    role: 'sales_manager',
    department: 'Sotuv Departamenti',
    isActive: true,
    createdAt: '2025-11-15T00:00:00Z',
  },
  {
    id: 'emp-3',
    fullName: 'Bobur Rustamov',
    email: 'service@kia-autocenter.uz',
    phone: '+998 94 620 90 80',
    role: 'service_manager',
    department: 'Texnik Xizmat Ko‘rsatish',
    isActive: true,
    createdAt: '2025-12-01T00:00:00Z',
  },
  {
    id: 'emp-4',
    fullName: 'Kamola Karimova',
    email: 'consultant@kia-autocenter.uz',
    phone: '+998 93 500 11 22',
    role: 'consultant',
    department: 'Mijozlar bilan Aloqa (Call Center)',
    isActive: true,
    createdAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'emp-5',
    fullName: 'Ulug‘bek Salimov',
    email: 'reports@kia-autocenter.uz',
    phone: '+998 99 333 22 11',
    role: 'report_viewer',
    department: 'Moliya va Auditorlik',
    isActive: true,
    createdAt: '2026-02-01T00:00:00Z',
  },
];

const INITIAL_INVENTORY: InventoryMovement[] = [
  {
    id: 'inv-1',
    vehicleId: 'kia-k5',
    vehicleName: 'KIA K5 GT Line+',
    color: 'Snow White Pearl',
    type: 'arrival',
    quantity: 5,
    previousStock: 0,
    newStock: 5,
    performedBy: 'Nasriddinova Dilfuza',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'inv-2',
    vehicleId: 'kia-k5',
    vehicleName: 'KIA K5 GT Line+',
    color: 'Snow White Pearl',
    type: 'sale',
    quantity: 1,
    previousStock: 5,
    newStock: 4,
    performedBy: 'Alisher Shodiyev',
    createdAt: '2026-03-05T15:00:00Z',
  },
  {
    id: 'inv-3',
    vehicleId: 'kia-sportage',
    vehicleName: 'KIA Sportage X-Line',
    color: 'Gravity Gray',
    type: 'arrival',
    quantity: 8,
    previousStock: 0,
    newStock: 8,
    performedBy: 'Nasriddinova Dilfuza',
    createdAt: '2026-03-10T12:00:00Z',
  },
];

const INITIAL_FINANCE_OFFERS: FinanceOffer[] = [
  {
    id: 'fin-1',
    bankName: 'Ipak Yo‘li Banki',
    title: 'Imtiyozli Rasmiy KIA Avtokredit',
    interestRatePct: 17.5,
    minDownPaymentPct: 20,
    maxTermMonths: 60,
    specialDiscountUzs: 15000000,
    description: 'Yillik 17.5% dan boshlanuvchi foiz stavkasi va 5 yilgacha kredit muddati.',
    isActive: true,
    expiryDate: '2026-12-31',
  },
  {
    id: 'fin-2',
    bankName: 'SQB (O‘zsanoatqurilishbank)',
    title: '0% Muddatli To‘lov Dasturi (Rassrochka)',
    interestRatePct: 0,
    minDownPaymentPct: 40,
    maxTermMonths: 24,
    specialDiscountUzs: 0,
    description: '40% boshlang‘ich to‘lov bilan 24 oyga 0% ustama bilan avtomobil xarid qiling.',
    isActive: true,
    expiryDate: '2026-06-30',
  },
  {
    id: 'fin-3',
    bankName: 'Kapitalbank',
    title: 'Ekspress Avtokredit (1 kunda)',
    interestRatePct: 19.0,
    minDownPaymentPct: 15,
    maxTermMonths: 48,
    specialDiscountUzs: 10000000,
    description: 'Faqat pasport bilan 1 ish kunida avtokredit rasmiylashtirish imkoniyati.',
    isActive: true,
    expiryDate: '2026-12-31',
  },
];

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'Yangi Avtomobil Xaridi Arizasi',
    message: 'Javohir Alimov KIA K5 uchun kredit arizasi qoldirdi (+998 90 987 65 43)',
    type: 'lead',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    link: '/admin/crm',
  },
  {
    id: 'notif-2',
    title: 'Test-drayvga yangi yozilish',
    message: 'Sardor Karimov KIA Sonet modelini Samarqand filialida sinab ko‘rmoqchi.',
    type: 'test_drive',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    link: '/admin/test-drives',
  },
  {
    id: 'notif-3',
    title: 'Servis markaziga navbat',
    message: 'Farhod Umarov Sportage 2024 avtomobiliga TO-1 xizmatiga yozildi.',
    type: 'service',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    link: '/admin/service',
  },
  {
    id: 'notif-4',
    title: 'Muvaffaqiyatli Sotuv Rasmiylashtirildi',
    message: 'KIA-2026-002 shartnomasi bo‘yicha Sportage X-Line sotildi (510 mln so‘m).',
    type: 'sale',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    link: '/admin/sales',
  },
];

class DataStore {
  private vehicles: Vehicle[] = [...KIA_VEHICLES];
  private leads: Lead[] = [...INITIAL_LEADS];
  private testDrives: TestDriveRequest[] = [...INITIAL_TEST_DRIVES];
  private services: ServiceRequest[] = [...INITIAL_SERVICES];
  private tradeIns: TradeInRequest[] = [...INITIAL_TRADE_INS];
  private customers: CustomerRecord[] = [...INITIAL_CUSTOMERS];
  private sales: SaleTransaction[] = [...INITIAL_SALES];
  private employees: AdminEmployee[] = [...INITIAL_EMPLOYEES];
  private inventory: InventoryMovement[] = [...INITIAL_INVENTORY];
  private financeOffers: FinanceOffer[] = [...INITIAL_FINANCE_OFFERS];
  private notifications: AdminNotification[] = [...INITIAL_NOTIFICATIONS];
  private settings: SiteSettings = { ...DEFAULT_SETTINGS };
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    try {
      const [v, l, td, s, ti, cust, sl, emp, inv, fin, notif, sett] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.VEHICLES),
        AsyncStorage.getItem(STORAGE_KEYS.LEADS),
        AsyncStorage.getItem(STORAGE_KEYS.TEST_DRIVES),
        AsyncStorage.getItem(STORAGE_KEYS.SERVICES),
        AsyncStorage.getItem(STORAGE_KEYS.TRADE_INS),
        AsyncStorage.getItem(STORAGE_KEYS.CUSTOMERS),
        AsyncStorage.getItem(STORAGE_KEYS.SALES),
        AsyncStorage.getItem(STORAGE_KEYS.EMPLOYEES),
        AsyncStorage.getItem(STORAGE_KEYS.INVENTORY),
        AsyncStorage.getItem(STORAGE_KEYS.FINANCE),
        AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS),
        AsyncStorage.getItem(STORAGE_KEYS.SETTINGS),
      ]);

      if (v) this.vehicles = JSON.parse(v);
      if (l) this.leads = JSON.parse(l);
      if (td) this.testDrives = JSON.parse(td);
      if (s) this.services = JSON.parse(s);
      if (ti) this.tradeIns = JSON.parse(ti);
      if (cust) this.customers = JSON.parse(cust);
      if (sl) this.sales = JSON.parse(sl);
      if (emp) this.employees = JSON.parse(emp);
      if (inv) this.inventory = JSON.parse(inv);
      if (fin) this.financeOffers = JSON.parse(fin);
      if (notif) this.notifications = JSON.parse(notif);
      if (sett) this.settings = JSON.parse(sett);
    } catch {
      // Fallback to in-memory initial state
    } finally {
      this.initialized = true;
    }
  }

  // Vehicles
  async getVehicles(): Promise<Vehicle[]> {
    await this.init();
    return [...this.vehicles];
  }

  async getVehicleById(id: string): Promise<Vehicle | undefined> {
    await this.init();
    return this.vehicles.find((v) => v.id === id);
  }

  async addVehicle(vehicle: Vehicle): Promise<Vehicle> {
    await this.init();
    this.vehicles.unshift(vehicle);
    await AsyncStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(this.vehicles));
    return vehicle;
  }

  async updateVehicle(id: string, partial: Partial<Vehicle>): Promise<Vehicle | null> {
    await this.init();
    const index = this.vehicles.findIndex((v) => v.id === id);
    if (index === -1) return null;
    this.vehicles[index] = { ...this.vehicles[index], ...partial };
    await AsyncStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(this.vehicles));
    return this.vehicles[index];
  }

  async deleteVehicle(id: string): Promise<boolean> {
    await this.init();
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(this.vehicles));
    return true;
  }

  // Leads & CRM
  async getLeads(): Promise<Lead[]> {
    await this.init();
    return [...this.leads];
  }

  async addLead(leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    await this.init();
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    await AsyncStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(this.leads));

    // Auto notification
    await this.addNotification({
      title: 'Yangi Ariza Qabul Qilindi',
      message: `${newLead.customerName} — ${newLead.vehicleName || 'KIA'} (${newLead.leadType})`,
      type: 'lead',
      isRead: false,
      link: '/admin/crm',
    });

    return newLead;
  }

  async updateLeadStatus(id: string, status: any, notes?: string, assignedManager?: string): Promise<Lead | null> {
    await this.init();
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) return null;
    this.leads[index] = {
      ...this.leads[index],
      status,
      ...(notes !== undefined ? { notes } : {}),
      ...(assignedManager !== undefined ? { assignedManager } : {}),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(this.leads));
    return this.leads[index];
  }

  // Test Drives
  async getTestDrives(): Promise<TestDriveRequest[]> {
    await this.init();
    return [...this.testDrives];
  }

  async addTestDrive(data: Omit<TestDriveRequest, 'id' | 'createdAt'>): Promise<TestDriveRequest> {
    await this.init();
    const item: TestDriveRequest = {
      ...data,
      id: `td-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.testDrives.unshift(item);
    await AsyncStorage.setItem(STORAGE_KEYS.TEST_DRIVES, JSON.stringify(this.testDrives));

    await this.addNotification({
      title: 'Yangi Test-Drayv Buyurtmasi',
      message: `${item.fullName} — ${item.vehicleName} (${item.preferredDate} ${item.preferredTime})`,
      type: 'test_drive',
      isRead: false,
      link: '/admin/test-drives',
    });

    return item;
  }

  async updateTestDrive(id: string, status: any, assignedStaff?: string): Promise<TestDriveRequest | null> {
    await this.init();
    const index = this.testDrives.findIndex((td) => td.id === id);
    if (index === -1) return null;
    this.testDrives[index] = {
      ...this.testDrives[index],
      status,
      ...(assignedStaff ? { assignedStaff } : {}),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.TEST_DRIVES, JSON.stringify(this.testDrives));
    return this.testDrives[index];
  }

  // Services
  async getServices(): Promise<ServiceRequest[]> {
    await this.init();
    return [...this.services];
  }

  async addService(data: Omit<ServiceRequest, 'id' | 'createdAt'>): Promise<ServiceRequest> {
    await this.init();
    const item: ServiceRequest = {
      ...data,
      id: `srv-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.services.unshift(item);
    await AsyncStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(this.services));

    await this.addNotification({
      title: 'Yangi Servis Buyurtmasi',
      message: `${item.fullName} — ${item.vehicleModel} (${item.serviceType})`,
      type: 'service',
      isRead: false,
      link: '/admin/service',
    });

    return item;
  }

  async updateService(id: string, partial: Partial<ServiceRequest>): Promise<ServiceRequest | null> {
    await this.init();
    const index = this.services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    this.services[index] = { ...this.services[index], ...partial };
    await AsyncStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(this.services));
    return this.services[index];
  }

  // Trade-Ins
  async getTradeIns(): Promise<TradeInRequest[]> {
    await this.init();
    return [...this.tradeIns];
  }

  async addTradeIn(data: Omit<TradeInRequest, 'id' | 'createdAt'>): Promise<TradeInRequest> {
    await this.init();
    const item: TradeInRequest = {
      ...data,
      id: `ti-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.tradeIns.unshift(item);
    await AsyncStorage.setItem(STORAGE_KEYS.TRADE_INS, JSON.stringify(this.tradeIns));

    await this.addNotification({
      title: 'Yangi Trade-In Baholash',
      message: `${item.fullName} — ${item.currentCarBrand} ${item.currentCarModel} (${item.currentCarYear})`,
      type: 'lead',
      isRead: false,
      link: '/admin/crm',
    });

    return item;
  }

  async updateTradeIn(id: string, status: any, estimatedValueUzs?: number): Promise<TradeInRequest | null> {
    await this.init();
    const index = this.tradeIns.findIndex((ti) => ti.id === id);
    if (index === -1) return null;
    this.tradeIns[index] = {
      ...this.tradeIns[index],
      status,
      ...(estimatedValueUzs ? { estimatedValueUzs } : {}),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.TRADE_INS, JSON.stringify(this.tradeIns));
    return this.tradeIns[index];
  }

  // Customers
  async getCustomers(): Promise<CustomerRecord[]> {
    await this.init();
    return [...this.customers];
  }

  async addCustomer(customer: Omit<CustomerRecord, 'id' | 'registeredAt'>): Promise<CustomerRecord> {
    await this.init();
    const newCustomer: CustomerRecord = {
      ...customer,
      id: `cust-${Date.now()}`,
      registeredAt: new Date().toISOString(),
    };
    this.customers.unshift(newCustomer);
    await AsyncStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(this.customers));
    return newCustomer;
  }

  async updateCustomer(id: string, partial: Partial<CustomerRecord>): Promise<CustomerRecord | null> {
    await this.init();
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.customers[index] = { ...this.customers[index], ...partial };
    await AsyncStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(this.customers));
    return this.customers[index];
  }

  async toggleBlockCustomer(id: string): Promise<CustomerRecord | null> {
    await this.init();
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) return null;
    const current = this.customers[index].status;
    this.customers[index].status = current === 'active' ? 'blocked' : 'active';
    await AsyncStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(this.customers));
    return this.customers[index];
  }

  // Sales
  async getSales(): Promise<SaleTransaction[]> {
    await this.init();
    return [...this.sales];
  }

  async createSale(saleData: Omit<SaleTransaction, 'id'>): Promise<SaleTransaction> {
    await this.init();
    const newSale: SaleTransaction = {
      ...saleData,
      id: `sale-${Date.now()}`,
    };
    this.sales.unshift(newSale);
    await AsyncStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(this.sales));

    // Update customer stats
    const custIndex = this.customers.findIndex((c) => c.fullName === newSale.customerName);
    if (custIndex !== -1) {
      this.customers[custIndex].totalPurchases += 1;
      this.customers[custIndex].totalSpentUzs += newSale.finalPriceUzs;
      await AsyncStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(this.customers));
    }

    // Add notification
    await this.addNotification({
      title: 'Yangi Avtomobil Sotildi',
      message: `${newSale.contractNumber}: ${newSale.vehicleName} — ${newSale.finalPriceUzs.toLocaleString()} so‘m`,
      type: 'sale',
      isRead: false,
      link: '/admin/sales',
    });

    return newSale;
  }

  // Employees
  async getEmployees(): Promise<AdminEmployee[]> {
    await this.init();
    return [...this.employees];
  }

  async addEmployee(emp: Omit<AdminEmployee, 'id' | 'createdAt'>): Promise<AdminEmployee> {
    await this.init();
    const newEmp: AdminEmployee = {
      ...emp,
      id: `emp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.employees.unshift(newEmp);
    await AsyncStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(this.employees));
    return newEmp;
  }

  async updateEmployee(id: string, partial: Partial<AdminEmployee>): Promise<AdminEmployee | null> {
    await this.init();
    const index = this.employees.findIndex((e) => e.id === id);
    if (index === -1) return null;
    this.employees[index] = { ...this.employees[index], ...partial };
    await AsyncStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(this.employees));
    return this.employees[index];
  }

  // Inventory
  async getInventoryMovements(): Promise<InventoryMovement[]> {
    await this.init();
    return [...this.inventory];
  }

  async addInventoryMovement(mov: Omit<InventoryMovement, 'id' | 'createdAt'>): Promise<InventoryMovement> {
    await this.init();
    const newMov: InventoryMovement = {
      ...mov,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.inventory.unshift(newMov);
    await AsyncStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(this.inventory));
    return newMov;
  }

  // Finance Offers
  async getFinanceOffers(): Promise<FinanceOffer[]> {
    await this.init();
    return [...this.financeOffers];
  }

  async addFinanceOffer(offer: Omit<FinanceOffer, 'id'>): Promise<FinanceOffer> {
    await this.init();
    const newOffer: FinanceOffer = {
      ...offer,
      id: `fin-${Date.now()}`,
    };
    this.financeOffers.unshift(newOffer);
    await AsyncStorage.setItem(STORAGE_KEYS.FINANCE, JSON.stringify(this.financeOffers));
    return newOffer;
  }

  async updateFinanceOffer(id: string, partial: Partial<FinanceOffer>): Promise<FinanceOffer | null> {
    await this.init();
    const index = this.financeOffers.findIndex((f) => f.id === id);
    if (index === -1) return null;
    this.financeOffers[index] = { ...this.financeOffers[index], ...partial };
    await AsyncStorage.setItem(STORAGE_KEYS.FINANCE, JSON.stringify(this.financeOffers));
    return this.financeOffers[index];
  }

  // Notifications
  async getNotifications(): Promise<AdminNotification[]> {
    await this.init();
    return [...this.notifications];
  }

  async addNotification(notif: Omit<AdminNotification, 'id' | 'createdAt'>): Promise<AdminNotification> {
    await this.init();
    const newNotif: AdminNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.notifications.unshift(newNotif);
    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(this.notifications));
    return newNotif;
  }

  async markNotificationRead(id: string): Promise<void> {
    await this.init();
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notifications[index].isRead = true;
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(this.notifications));
    }
  }

  async markAllNotificationsRead(): Promise<void> {
    await this.init();
    this.notifications.forEach((n) => (n.isRead = true));
    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(this.notifications));
  }

  // Settings
  async getSettings(): Promise<SiteSettings> {
    await this.init();
    return { ...this.settings };
  }

  async updateSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
    await this.init();
    this.settings = { ...this.settings, ...partial };
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    return { ...this.settings };
  }

  // Dashboard dynamic calculations
  async getDashboardStats(): Promise<DashboardStats> {
    await this.init();
    const totalVehicles = this.vehicles.length;
    const availableVehicles = this.vehicles.filter((v) => v.status === 'available').length;
    const soldVehicles = this.vehicles.filter((v) => v.status === 'sold').length + this.sales.length;
    const reservedVehicles = this.vehicles.filter((v) => v.status === 'reserved').length;
    const totalCustomers = this.customers.length;
    const newLeadsCount = this.leads.filter((l) => l.status === 'new').length;
    const testDrivesCount = this.testDrives.length;
    const servicesCount = this.services.length;
    const monthlySalesCount = this.sales.length;
    const monthlyRevenueUzs = this.sales.reduce((sum, s) => sum + s.finalPriceUzs, 0);
    const totalRevenueUzs = monthlyRevenueUzs + 1773000000; // Total cumulative dealership revenue

    return {
      totalVehicles,
      availableVehicles,
      soldVehicles,
      reservedVehicles,
      totalCustomers,
      newLeadsCount,
      testDrivesCount,
      servicesCount,
      monthlySalesCount,
      monthlyRevenueUzs,
      totalRevenueUzs,
    };
  }
}

export const mockStore = new DataStore();
