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
  | 'sales_manager'
  | 'consultant'
  | 'service_manager'
  | 'report_viewer'
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
  | 'in_negotiation'
  | 'test_drive_scheduled'
  | 'confirmed'
  | 'contract_signed'
  | 'completed'
  | 'cancelled';

export type LeadType =
  | 'purchase'
  | 'loan'
  | 'trade_in'
  | 'test_drive'
  | 'service'
  | 'consultation'
  | 'callback';

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
  assignedManager?: string;
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
  assignedStaff?: string;
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
  vin?: string;
  mileageKm?: number;
  serviceType: string;
  technicianName?: string;
  branchId: string;
  branchName: string;
  preferredDate: string;
  preferredTime: string;
  status: 'new' | 'accepted' | 'in_progress' | 'waiting_parts' | 'ready' | 'delivered' | 'cancelled';
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
  warrantyYears: number;
  warrantyKm: number;
}

export interface DashboardStats {
  totalVehicles: number;
  availableVehicles: number;
  soldVehicles: number;
  reservedVehicles: number;
  totalCustomers: number;
  newLeadsCount: number;
  testDrivesCount: number;
  servicesCount: number;
  monthlySalesCount: number;
  monthlyRevenueUzs: number;
  totalRevenueUzs: number;
}

export interface SaleTransaction {
  id: string;
  contractNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  vehicleId: string;
  vehicleName: string;
  basePriceUzs: number;
  discountUzs: number;
  finalPriceUzs: number;
  paymentMethod: 'cash' | 'bank_transfer' | 'auto_loan' | 'installment';
  salesManager: string;
  status: 'completed' | 'pending_payment' | 'contract_signed' | 'cancelled';
  saleDate: string;
  notes?: string;
}

export interface CustomerRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  registeredAt: string;
  totalPurchases: number;
  totalSpentUzs: number;
  totalRequests: number;
  status: 'active' | 'blocked';
  notes?: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'test_drive' | 'service' | 'stock' | 'sale' | 'system';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface InventoryMovement {
  id: string;
  vehicleId: string;
  vehicleName: string;
  color: string;
  type: 'arrival' | 'sale' | 'reservation' | 'adjustment';
  quantity: number;
  previousStock: number;
  newStock: number;
  performedBy: string;
  createdAt: string;
}

export interface FinanceOffer {
  id: string;
  bankName: string;
  title: string;
  interestRatePct: number;
  minDownPaymentPct: number;
  maxTermMonths: number;
  specialDiscountUzs?: number;
  description: string;
  isActive: boolean;
  expiryDate: string;
}

export interface AdminEmployee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  isActive: boolean;
  createdAt: string;
}

export type { Vehicle, VehicleSpec, VehicleTrim, Branch, Offer };
