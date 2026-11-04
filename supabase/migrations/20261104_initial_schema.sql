-- ====================================================================
-- KIA AUTO CENTER UZBEKISTAN — ENTERPRISE DATABASE SCHEMA
-- Owner: Nasriddinova Dilfuza
-- Platform: Mobile + Web Platform
-- Database: PostgreSQL / Supabase
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'admin',
  'manager',
  'sales_consultant',
  'service_manager',
  'customer'
);

CREATE TYPE vehicle_status AS ENUM (
  'available',
  'reserved',
  'sold',
  'incoming',
  'out_of_stock'
);

CREATE TYPE vehicle_body_type AS ENUM (
  'sedan',
  'suv',
  'crossover',
  'minivan',
  'commercial',
  'hatchback'
);

CREATE TYPE fuel_type AS ENUM (
  'petrol',
  'diesel',
  'hybrid',
  'electric'
);

CREATE TYPE transmission_type AS ENUM (
  'automatic',
  'manual',
  'dual_clutch',
  'cvt'
);

CREATE TYPE drive_type AS ENUM (
  'fwd',
  'rwd',
  'awd',
  '4wd'
);

CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'test_drive_scheduled',
  'negotiation',
  'contract_signed',
  'delivered',
  'cancelled'
);

CREATE TYPE request_status AS ENUM (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled'
);

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  role user_role DEFAULT 'customer' NOT NULL,
  avatar_url TEXT,
  preferred_language TEXT DEFAULT 'uz' CHECK (preferred_language IN ('uz', 'ru', 'en')),
  address TEXT,
  city TEXT DEFAULT 'Tashkent',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ROLES & PERMISSIONS
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name user_role UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  module TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
  role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- 5. BRANCHES TABLE (DEALERSHIP LOCATIONS)
CREATE TABLE IF NOT EXISTS public.branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  address_uz TEXT NOT NULL,
  address_ru TEXT NOT NULL,
  address_en TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  working_hours TEXT NOT NULL,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  is_main_branch BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- e.g. "KIA K5"
  model_code TEXT NOT NULL, -- "k5"
  generation TEXT,
  year INT NOT NULL DEFAULT 2026,
  body_type vehicle_body_type NOT NULL,
  base_price_uzs NUMERIC(15, 2) NOT NULL,
  special_price_uzs NUMERIC(15, 2),
  status vehicle_status DEFAULT 'available' NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_special_offer BOOLEAN DEFAULT FALSE,
  warranty_years INT DEFAULT 5,
  warranty_km INT DEFAULT 150000,
  main_image_url TEXT NOT NULL,
  description_uz TEXT,
  description_ru TEXT,
  description_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. VEHICLE IMAGES
CREATE TABLE IF NOT EXISTS public.vehicle_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  is_360_view BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. VEHICLE SPECS
CREATE TABLE IF NOT EXISTS public.vehicle_specs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE UNIQUE,
  engine_capacity_liters NUMERIC(3, 1) NOT NULL,
  power_hp INT NOT NULL,
  torque_nm INT NOT NULL,
  fuel_type fuel_type NOT NULL,
  transmission transmission_type NOT NULL,
  drive_type drive_type NOT NULL,
  acceleration_0_100 NUMERIC(3, 1),
  top_speed_kmh INT,
  fuel_consumption_combined NUMERIC(3, 1),
  fuel_tank_capacity_liters INT,
  length_mm INT,
  width_mm INT,
  height_mm INT,
  wheelbase_mm INT,
  ground_clearance_mm INT,
  trunk_capacity_liters INT,
  curb_weight_kg INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. VEHICLE TRIMS (COMPLEKTATSIYALAR)
CREATE TABLE IF NOT EXISTS public.vehicle_trims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  trim_name TEXT NOT NULL, -- e.g. "Comfort", "Luxe", "Style", "Prestige", "GT Line"
  price_uzs NUMERIC(15, 2) NOT NULL,
  features_uz JSONB DEFAULT '[]'::JSONB,
  features_ru JSONB DEFAULT '[]'::JSONB,
  features_en JSONB DEFAULT '[]'::JSONB,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. LEADS & CRM
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  source TEXT DEFAULT 'website', -- website, mobile_app, call, walk_in
  lead_type TEXT DEFAULT 'general_inquiry', -- purchase, loan, trade_in, test_drive
  status lead_status DEFAULT 'new' NOT NULL,
  assigned_employee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  budget_uzs NUMERIC(15, 2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TEST DRIVE REQUESTS
CREATE TABLE IF NOT EXISTS public.test_drive_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  driver_license_number TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  status request_status DEFAULT 'pending' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. SERVICE REQUESTS
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  vehicle_model TEXT NOT NULL,
  license_plate TEXT,
  mileage_km INT,
  service_type TEXT NOT NULL, -- periodic_maintenance, oil_change, brake_system, diagnostics, ac_service, repair
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  status request_status DEFAULT 'pending' NOT NULL,
  estimated_cost_uzs NUMERIC(15, 2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. TRADE-IN REQUESTS
CREATE TABLE IF NOT EXISTS public.trade_in_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  target_vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  current_car_brand TEXT NOT NULL,
  current_car_model TEXT NOT NULL,
  current_car_year INT NOT NULL,
  current_car_mileage INT NOT NULL,
  current_car_condition TEXT NOT NULL, -- excellent, good, fair
  estimated_value_uzs NUMERIC(15, 2),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  photos_urls JSONB DEFAULT '[]'::JSONB,
  status request_status DEFAULT 'pending' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE RESTRICT NOT NULL,
  trim_id UUID REFERENCES public.vehicle_trims(id) ON DELETE SET NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  payment_method TEXT NOT NULL, -- cash, bank_transfer, loan, trade_in_partial
  total_price_uzs NUMERIC(15, 2) NOT NULL,
  initial_payment_uzs NUMERIC(15, 2) DEFAULT 0,
  loan_term_months INT,
  monthly_payment_uzs NUMERIC(15, 2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'contract_ready', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  amount_uzs NUMERIC(15, 2) NOT NULL,
  payment_type TEXT NOT NULL, -- deposit, down_payment, full_payment, service_payment
  payment_provider TEXT DEFAULT 'bank_uz', -- payme, click, uzum, bank_wire
  transaction_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. FAVORITES
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, vehicle_id)
);

-- 17. PROMOTIONS & SPECIAL OFFERS
CREATE TABLE IF NOT EXISTS public.promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_uz TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_uz TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  description_en TEXT NOT NULL,
  badge_text TEXT, -- e.g. "0% KREDIT", "-15%", "SUPER TAKLIF"
  discount_percentage NUMERIC(4, 1),
  image_url TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. EMPLOYEES
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  position_uz TEXT NOT NULL,
  position_ru TEXT NOT NULL,
  position_en TEXT NOT NULL,
  hire_date DATE DEFAULT CURRENT_DATE,
  sales_count INT DEFAULT 0,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- info, success, warning, promo
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_trims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_drive_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_in_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ PERMISSIONS (Anyone can browse cars, branches, promotions, reviews)
CREATE POLICY "Public vehicles are viewable by everyone" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Public vehicle_images are viewable by everyone" ON public.vehicle_images FOR SELECT USING (true);
CREATE POLICY "Public vehicle_specs are viewable by everyone" ON public.vehicle_specs FOR SELECT USING (true);
CREATE POLICY "Public vehicle_trims are viewable by everyone" ON public.vehicle_trims FOR SELECT USING (true);
CREATE POLICY "Public branches are viewable by everyone" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Public promotions are viewable by everyone" ON public.promotions FOR SELECT USING (true);
CREATE POLICY "Public reviews are viewable by everyone" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings FOR SELECT USING (true);

-- USER PROFILE ACCESS
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- LEAD CREATION (Public can submit leads, inquiries, test drives, services)
CREATE POLICY "Anyone can create leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create test drives" ON public.test_drive_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create service requests" ON public.service_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create trade-in requests" ON public.trade_in_requests FOR INSERT WITH CHECK (true);

-- USER SPECIFIC DATA
CREATE POLICY "Users view own test drives" ON public.test_drive_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users view own service requests" ON public.service_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users view own trade-ins" ON public.trade_in_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users view own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- ADMIN / STAFF POLICIES (Helper function to check staff role)
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'admin', 'manager', 'sales_consultant', 'service_manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Staff can view all leads" ON public.leads FOR SELECT USING (public.is_staff());
CREATE POLICY "Staff can update leads" ON public.leads FOR UPDATE USING (public.is_staff());
CREATE POLICY "Staff can view all test drives" ON public.test_drive_requests FOR SELECT USING (public.is_staff());
CREATE POLICY "Staff can update test drives" ON public.test_drive_requests FOR UPDATE USING (public.is_staff());
CREATE POLICY "Staff can view all service requests" ON public.service_requests FOR SELECT USING (public.is_staff());
CREATE POLICY "Staff can update service requests" ON public.service_requests FOR UPDATE USING (public.is_staff());
CREATE POLICY "Staff can view all trade-ins" ON public.trade_in_requests FOR SELECT USING (public.is_staff());
CREATE POLICY "Staff can update trade-ins" ON public.trade_in_requests FOR UPDATE USING (public.is_staff());
CREATE POLICY "Staff can manage vehicles" ON public.vehicles FOR ALL USING (public.is_staff());
CREATE POLICY "Staff can manage trims" ON public.vehicle_trims FOR ALL USING (public.is_staff());
CREATE POLICY "Staff can manage specs" ON public.vehicle_specs FOR ALL USING (public.is_staff());
CREATE POLICY "Staff can manage images" ON public.vehicle_images FOR ALL USING (public.is_staff());
CREATE POLICY "Staff can manage settings" ON public.site_settings FOR ALL USING (public.is_staff());

-- ====================================================================
-- INITIAL SEED DATA (KIA UZBEKISTAN FLEET)
-- ====================================================================

-- SITE SETTINGS
INSERT INTO public.site_settings (key, value) VALUES
('general', '{
  "dealership_name": "KIA AUTO CENTER",
  "owner": "Nasriddinova Dilfuza",
  "phone": "+998 71 200 05 25",
  "emergency_phone": "+998 90 123 45 67",
  "email": "info@kia-autocenter.uz",
  "address_main": "Toshkent sh., Sergeli tumani, Yangi Sergeli ko‘chasi, 24-uy",
  "default_loan_interest_rate": 18.5,
  "default_loan_min_down_payment_pct": 20,
  "currency": "UZS"
}'::JSONB)
ON CONFLICT (key) DO NOTHING;

-- DEALERSHIP BRANCHES
INSERT INTO public.branches (name_uz, name_ru, name_en, address_uz, address_ru, address_en, city, phone, email, working_hours, is_main_branch) VALUES
('KIA Sergeli Bosh Filiali', 'Главный филиал KIA Сергели', 'KIA Sergeli Main Branch', 'Toshkent sh., Yangi Sergeli ko‘chasi, 24', 'г. Ташкент, ул. Янги Сергели, 24', 'Tashkent, Yangi Sergeli st., 24', 'Toshkent', '+998 71 200 05 25', 'sergeli@kia-autocenter.uz', 'Dush-Shan: 09:00 - 20:00, Yak: 10:00 - 18:00', true),
('KIA Rohat Avtosaloni', 'Автосалон KIA Рохат', 'KIA Rohat Showroom', 'Toshkent sh., Ohangaron shossesi, 11', 'г. Ташкент, Ахангаранское шоссе, 11', 'Tashkent, Akhangaran highway, 11', 'Toshkent', '+998 71 200 05 26', 'rohat@kia-autocenter.uz', 'Dush-Shan: 09:00 - 19:00, Yak: 10:00 - 17:00', false),
('KIA Samarqand Markazi', 'KIA Самарканд Центр', 'KIA Samarkand Center', 'Samarqand sh., Gagarin ko‘chasi, 88', 'г. Самарканд, ул. Гагарина, 88', 'Samarkand, Gagarin st., 88', 'Samarqand', '+998 66 230 05 25', 'samarkand@kia-autocenter.uz', 'Dush-Shan: 09:00 - 18:30', false),
('KIA Buxoro Markazi', 'KIA Бухара Центр', 'KIA Bukhara Center', 'Buxoro sh., G‘ijduvon ko‘chasi, 45', 'г. Бухара, ул. Гиждуванская, 45', 'Bukhara, Gijduvan st., 45', 'Buxoro', '+998 65 220 05 25', 'bukhara@kia-autocenter.uz', 'Dush-Shan: 09:00 - 18:30', false);
