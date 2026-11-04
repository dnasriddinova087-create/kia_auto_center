// Global Type Definitions for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import { Vehicle, VehicleSpec, VehicleTrim } from '../constants/vehicles';
import { Branch } from '../constants/branches';
import { Offer } from '../constants/offers';

export type Language = 'uz' | 'ru' | 'en';
export type ThemeMode = 'dark' | 'light';

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'manager'
  | 'sales_consultant'
  | 'service_manager'
  | 'customer';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  preferredLanguage: Language;
  address?: string;
  city?: string;
  createdAt: string;
}

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'test_drive_scheduled'
  | 'negotiation'
  | 'contract_signed'
  | 'delivered'
  | 'cancelled';

export type LeadType = 'purchase' | 'loan' | 'trade_in' | 'test_drive' | 'general_inquiry';

export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  vehicleId?: string;
  vehicleName?: string;
  branchId?: string;
  source: string;
  leadType: LeadType;
  status: LeadStatus;
  budgetUzs?: number;
  notes?: string;
  createdAt: string;
}

export type RequestStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface TestDriveRequest {
  id: string;
  userId?: string;
  fullName: string;
  phone: string;
  driverLicenseNumber?: string;
  vehicleId: string;
  vehicleName: string;
  branchId: string;
  branchName: string;
  preferredDate: string;
  preferredTime: string;
  status: RequestStatus;
  notes?: string;
  createdAt: string;
}

export interface ServiceRequest {
  id: string;
  userId?: string;
  fullName: string;
  phone: string;
  vehicleModel: string;
  licensePlate?: string;
  mileageKm?: number;
  serviceType: string;
  branchId: string;
  branchName: string;
  preferredDate: string;
  preferredTime: string;
  status: RequestStatus;
  estimatedCostUzs?: number;
  notes?: string;
  createdAt: string;
}

export interface TradeInRequest {
  id: string;
  userId?: string;
  fullName: string;
  phone: string;
  currentCarBrand: string;
  currentCarModel: string;
  currentCarYear: number;
  currentCarMileage: number;
  currentCarCondition: 'excellent' | 'good' | 'fair';
  targetVehicleId?: string;
  targetVehicleName?: string;
  estimatedValueUzs?: number;
  status: RequestStatus;
  notes?: string;
  createdAt: string;
}

export interface SiteSettings {
  dealershipName: string;
  owner: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  addressMain: string;
  defaultLoanInterestRate: number; // e.g. 18.5
  defaultLoanMinDownPaymentPct: number; // e.g. 20
  currency: string;
  usdToUzsRate: number;
}

export interface DashboardStats {
  totalVehicles: number;
  availableVehicles: number;
  soldVehicles: number;
  totalCustomers: number;
  newLeadsCount: number;
  testDrivesCount: number;
  servicesCount: number;
  monthlySalesCount: number;
  monthlyRevenueUzs: number;
}

export type { Vehicle, VehicleSpec, VehicleTrim, Branch, Offer };
