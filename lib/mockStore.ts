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
} from '../types';

const STORAGE_KEYS = {
  VEHICLES: 'kia_store_vehicles_v1',
  LEADS: 'kia_store_leads_v1',
  TEST_DRIVES: 'kia_store_test_drives_v1',
  SERVICES: 'kia_store_services_v1',
  TRADE_INS: 'kia_store_trade_ins_v1',
  SETTINGS: 'kia_store_settings_v1',
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
    notes: 'Shartnoma imzolandi, to‘lov kutilmoqda',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
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
    status: 'pending',
    notes: 'GT Line bilan tanishmoqchi',
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
    mileageKm: 15000,
    serviceType: 'Davriy texnik xizmat ko‘rsatish (TO-1)',
    branchId: 'branch-rohat',
    branchName: 'KIA Rohat Avtosaloni & Servis',
    preferredDate: '2026-11-08',
    preferredTime: '10:00',
    status: 'confirmed',
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
    mileageKm: 30000,
    serviceType: 'Kompyuter diagnostikasi va konditsioner xizmati',
    branchId: 'branch-sergeli',
    branchName: 'KIA Sergeli Bosh Avtosaloni',
    preferredDate: '2026-11-09',
    preferredTime: '15:00',
    status: 'pending',
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
    notes: 'Avtomobil toza, kraskasi yo‘q',
    createdAt: new Date().toISOString(),
  },
];

class DataStore {
  private vehicles: Vehicle[] = [...KIA_VEHICLES];
  private leads: Lead[] = [...INITIAL_LEADS];
  private testDrives: TestDriveRequest[] = [...INITIAL_TEST_DRIVES];
  private services: ServiceRequest[] = [...INITIAL_SERVICES];
  private tradeIns: TradeInRequest[] = [...INITIAL_TRADE_INS];
  private settings: SiteSettings = { ...DEFAULT_SETTINGS };
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    try {
      const [v, l, td, s, ti, st] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.VEHICLES),
        AsyncStorage.getItem(STORAGE_KEYS.LEADS),
        AsyncStorage.getItem(STORAGE_KEYS.TEST_DRIVES),
        AsyncStorage.getItem(STORAGE_KEYS.SERVICES),
        AsyncStorage.getItem(STORAGE_KEYS.TRADE_INS),
        AsyncStorage.getItem(STORAGE_KEYS.SETTINGS),
      ]);

      if (v) this.vehicles = JSON.parse(v);
      if (l) this.leads = JSON.parse(l);
      if (td) this.testDrives = JSON.parse(td);
      if (s) this.services = JSON.parse(s);
      if (ti) this.tradeIns = JSON.parse(ti);
      if (st) this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(st) };
    } catch {
      // Fallback silently to initial memory data
    }
    this.initialized = true;
  }

  // Vehicles
  async getVehicles(): Promise<Vehicle[]> {
    await this.init();
    return this.vehicles;
  }

  async getVehicleById(id: string): Promise<Vehicle | undefined> {
    await this.init();
    return this.vehicles.find((v) => v.id === id || v.modelCode === id.toLowerCase());
  }

  async saveVehicle(vehicle: Vehicle): Promise<Vehicle> {
    await this.init();
    const index = this.vehicles.findIndex((v) => v.id === vehicle.id);
    if (index >= 0) {
      this.vehicles[index] = vehicle;
    } else {
      this.vehicles.unshift(vehicle);
    }
    await AsyncStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(this.vehicles));
    return vehicle;
  }

  async deleteVehicle(id: string): Promise<boolean> {
    await this.init();
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(this.vehicles));
    return true;
  }

  // Leads
  async getLeads(): Promise<Lead[]> {
    await this.init();
    return this.leads;
  }

  async createLead(leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    await this.init();
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    await AsyncStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(this.leads));
    return newLead;
  }

  async updateLeadStatus(id: string, status: Lead['status']): Promise<Lead | undefined> {
    await this.init();
    const lead = this.leads.find((l) => l.id === id);
    if (lead) {
      lead.status = status;
      await AsyncStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(this.leads));
    }
    return lead;
  }

  // Test Drives
  async getTestDrives(): Promise<TestDriveRequest[]> {
    await this.init();
    return this.testDrives;
  }

  async createTestDrive(data: Omit<TestDriveRequest, 'id' | 'createdAt'>): Promise<TestDriveRequest> {
    await this.init();
    const item: TestDriveRequest = {
      ...data,
      id: `td-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.testDrives.unshift(item);
    await AsyncStorage.setItem(STORAGE_KEYS.TEST_DRIVES, JSON.stringify(this.testDrives));

    // Also register as a lead in CRM
    await this.createLead({
      customerName: data.fullName,
      phone: data.phone,
      vehicleId: data.vehicleId,
      vehicleName: data.vehicleName,
      branchId: data.branchId,
      source: 'test_drive_booking',
      leadType: 'test_drive',
      status: 'new',
      notes: `Test-drayv: ${data.preferredDate} ${data.preferredTime}. Haydovchilik guvohnomasi: ${data.driverLicenseNumber || 'kiritilmagan'}`,
    });

    return item;
  }

  async updateTestDriveStatus(id: string, status: TestDriveRequest['status']): Promise<void> {
    await this.init();
    const item = this.testDrives.find((t) => t.id === id);
    if (item) {
      item.status = status;
      await AsyncStorage.setItem(STORAGE_KEYS.TEST_DRIVES, JSON.stringify(this.testDrives));
    }
  }

  // Services
  async getServices(): Promise<ServiceRequest[]> {
    await this.init();
    return this.services;
  }

  async createService(data: Omit<ServiceRequest, 'id' | 'createdAt'>): Promise<ServiceRequest> {
    await this.init();
    const item: ServiceRequest = {
      ...data,
      id: `srv-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.services.unshift(item);
    await AsyncStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(this.services));
    return item;
  }

  async updateServiceStatus(id: string, status: ServiceRequest['status']): Promise<void> {
    await this.init();
    const item = this.services.find((s) => s.id === id);
    if (item) {
      item.status = status;
      await AsyncStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(this.services));
    }
  }

  // Trade In
  async getTradeIns(): Promise<TradeInRequest[]> {
    await this.init();
    return this.tradeIns;
  }

  async createTradeIn(data: Omit<TradeInRequest, 'id' | 'createdAt'>): Promise<TradeInRequest> {
    await this.init();
    const item: TradeInRequest = {
      ...data,
      id: `ti-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.tradeIns.unshift(item);
    await AsyncStorage.setItem(STORAGE_KEYS.TRADE_INS, JSON.stringify(this.tradeIns));

    // Register as lead
    await this.createLead({
      customerName: data.fullName,
      phone: data.phone,
      vehicleId: data.targetVehicleId,
      vehicleName: data.targetVehicleName,
      source: 'trade_in_appraisal',
      leadType: 'trade_in',
      status: 'new',
      budgetUzs: data.estimatedValueUzs,
      notes: `Trade-In: ${data.currentCarBrand} ${data.currentCarModel} (${data.currentCarYear}), Yurgan masofa: ${data.currentCarMileage} km`,
    });

    return item;
  }

  // Settings
  async getSettings(): Promise<SiteSettings> {
    await this.init();
    return this.settings;
  }

  async updateSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
    await this.init();
    this.settings = { ...this.settings, ...newSettings };
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    return this.settings;
  }

  // Stats
  async getDashboardStats(): Promise<DashboardStats> {
    await this.init();
    const totalVehicles = this.vehicles.length;
    const availableVehicles = this.vehicles.filter((v) => v.status === 'available').length;
    const soldVehicles = this.vehicles.filter((v) => v.status === 'sold').length + 28;
    const totalCustomers = this.leads.length + 152;
    const newLeadsCount = this.leads.filter((l) => l.status === 'new').length;
    const testDrivesCount = this.testDrives.length;
    const servicesCount = this.services.length;
    const monthlySalesCount = 14;
    const monthlyRevenueUzs = 5890000000; // ~5.89 Milliard so'm

    return {
      totalVehicles,
      availableVehicles,
      soldVehicles,
      totalCustomers,
      newLeadsCount,
      testDrivesCount,
      servicesCount,
      monthlySalesCount,
      monthlyRevenueUzs,
    };
  }
}

export const mockStore = new DataStore();
