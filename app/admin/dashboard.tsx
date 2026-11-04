// Professional KIA Dealership Admin Dashboard
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Car,
  CheckCircle2,
  Users,
  Calendar,
  Wrench,
  TrendingUp,
  DollarSign,
  Plus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Clock,
  Download,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react-native';
import { StatusBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { DashboardStats, Lead, SaleTransaction } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { formatCurrency } = useLanguage();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [sales, setSales] = useState<SaleTransaction[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await mockStore.getDashboardStats();
    setStats(s);
    const leads = await mockStore.getLeads();
    setRecentLeads(leads.slice(0, 5));
    const sl = await mockStore.getSales();
    setSales(sl.slice(0, 5));
  };

  const isWide = width >= 900;
  const isDesktop = width >= 1200;

  // Chart data: Monthly Sales Dynamics
  const monthlyDynamics = [
    { month: 'Noy', amount: 380, count: 8 },
    { month: 'Dek', amount: 520, count: 12 },
    { month: 'Yan', amount: 640, count: 14 },
    { month: 'Fev', amount: 890, count: 19 },
    { month: 'Mar', amount: 1240, count: 26 },
  ];

  // Model sales breakdown
  const modelBreakdown = [
    { model: 'KIA K5', percent: 34, count: 14, color: COLORS.kiaRed },
    { model: 'KIA Sportage', percent: 28, count: 11, color: '#3B82F6' },
    { model: 'KIA K8', percent: 18, count: 7, color: '#10B981' },
    { model: 'KIA Sorento', percent: 12, count: 5, color: '#F59E0B' },
    { model: 'KIA Sonet', percent: 8, count: 3, color: '#8B5CF6' },
  ];

  return (
    <View style={styles.content}>
      {/* Executive Header Banner */}
      <View style={styles.header}>
        <View>
          <View style={styles.badgeRow}>
            <View style={styles.badgeRed}>
              <Text style={styles.badgeRedText}>MARKAZIY BOSHQARUV</Text>
            </View>
            <Text style={[styles.ownerTag, { color: colors.textSecondary }]}>
              Dilerlik rahbari: <Text style={{ color: COLORS.kiaRed, fontWeight: '800' }}>Nasriddinova Dilfuza</Text>
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            KIA AUTO CENTER — Asosiy Ko‘rsatkichlar
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Real vaqtda avtosalon operatsiyalari, ombor, sotuvlar va CRM ko‘rsatkichlari
          </Text>
        </View>

        <View style={styles.headerActions}>
          <CustomButton
            title="Avtomobil Qo‘shish"
            onPress={() => router.push('/admin/vehicles')}
            variant="primary"
            size="md"
            icon={<Plus size={16} color="#FFFFFF" />}
          />
          <CustomButton
            title="Yangi Sotuv"
            onPress={() => router.push('/admin/sales')}
            variant="outline"
            size="md"
            icon={<ShoppingBag size={16} color={colors.text} />}
          />
        </View>
      </View>

      {/* 10 Asosiy Dashboard Ko'rsatkichlari */}
      <View style={[styles.kpiGrid, isWide && styles.kpiGridWide]}>
        {/* 1. Jami avtomobillar */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(200, 16, 46, 0.1)' }]}>
            <Car size={20} color={COLORS.kiaRed} />
          </View>
          <Text style={[styles.kpiValue, { color: colors.text }]}>
            {stats?.totalVehicles ?? 11}
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            1. Jami Avtomobillar
          </Text>
        </View>

        {/* 2. Sotuvdagi avtomobillar */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <CheckCircle2 size={20} color="#10B981" />
          </View>
          <Text style={[styles.kpiValue, { color: colors.text }]}>
            {stats?.availableVehicles ?? 9}
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            2. Sotuvdagi Zaxira
          </Text>
        </View>

        {/* 3. Sotilgan avtomobillar */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
            <ShoppingBag size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.kpiValue, { color: colors.text }]}>
            {stats?.soldVehicles ?? 5}
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            3. Sotilgan Avtomobillar
          </Text>
        </View>

        {/* 4. Bron qilingan */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
            <Clock size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.kpiValue, { color: colors.text }]}>
            {stats?.reservedVehicles ?? 2}
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            4. Bron Qilingan
          </Text>
        </View>

        {/* 5. Jami mijozlar */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(139, 92, 246, 0.1)' }]}>
            <Users size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.kpiValue, { color: colors.text }]}>
            {stats?.totalCustomers ?? 4}
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            5. Jami Mijozlar
          </Text>
        </View>

        {/* 6. Yangi arizalar */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
            <AlertCircle size={20} color="#EF4444" />
          </View>
          <Text style={[styles.kpiValue, { color: colors.text }]}>
            {stats?.newLeadsCount ?? 5}
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            6. Yangi CRM Arizalar
          </Text>
        </View>

        {/* 7. Test-drayv */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(236, 72, 153, 0.1)' }]}>
            <Calendar size={20} color="#EC4899" />
          </View>
          <Text style={[styles.kpiValue, { color: colors.text }]}>
            {stats?.testDrivesCount ?? 3}
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            7. Test-Drayv Buyurtmalari
          </Text>
        </View>

        {/* 8. Servis buyurtmalari */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(20, 184, 166, 0.1)' }]}>
            <Wrench size={20} color="#14B8A6" />
          </View>
          <Text style={[styles.kpiValue, { color: colors.text }]}>
            {stats?.servicesCount ?? 2}
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            8. Servis Buyurtmalari
          </Text>
        </View>

        {/* 9. Oylik sotuv */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(200, 16, 46, 0.1)' }]}>
            <TrendingUp size={20} color={COLORS.kiaRed} />
          </View>
          <Text style={[styles.kpiValue, { color: colors.text }]}>
            {stats?.monthlySalesCount ?? 3} dona
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            9. Joriy Oy Sotuv
          </Text>
        </View>

        {/* 10. Umumiy tushum */}
        <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.kpiIconWrap, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <DollarSign size={20} color="#10B981" />
          </View>
          <Text style={[styles.kpiValue, { color: '#10B981', fontSize: 18 }]} numberOfLines={1}>
            {formatCurrency(stats?.totalRevenueUzs || 3546000000)}
          </Text>
          <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
            10. Umumiy Tushum
          </Text>
        </View>
      </View>

      {/* Analytics & Charts Section */}
      <View style={[styles.chartsRow, isDesktop && styles.chartsRowDesktop]}>
        {/* Dynamic Sales Bar Chart */}
        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }, isDesktop && { flex: 1.6 }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Oylik Daromad Dinamikasi (Mln UZS)
              </Text>
              <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
                Oxirgi 5 oylik sotuv va tushum tahlili
              </Text>
            </View>
            <View style={styles.chartTag}>
              <TrendingUp size={14} color="#10B981" />
              <Text style={styles.chartTagText}>+38% O‘sish</Text>
            </View>
          </View>

          <View style={styles.barChartContainer}>
            {monthlyDynamics.map((item) => (
              <View key={item.month} style={styles.barGroup}>
                <Text style={[styles.barValue, { color: colors.textSecondary }]}>
                  {item.amount}m
                </Text>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: `${(item.amount / 1300) * 100}%`,
                        backgroundColor: COLORS.kiaRed,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.barLabel, { color: colors.text }]}>{item.month}</Text>
                <Text style={[styles.barSubLabel, { color: colors.textMuted }]}>
                  {item.count} ta
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Model Breakdown Pie / Progress Bars */}
        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }, isDesktop && { flex: 1.2 }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Eng Ko‘p Sotilgan KIA Modellari
              </Text>
              <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
                Ommabop modellar ulushi
              </Text>
            </View>
          </View>

          <View style={styles.modelList}>
            {modelBreakdown.map((item) => (
              <View key={item.model} style={styles.modelRow}>
                <View style={styles.modelRowTop}>
                  <Text style={[styles.modelName, { color: colors.text }]}>{item.model}</Text>
                  <Text style={[styles.modelCount, { color: colors.textSecondary }]}>
                    {item.count} ta ({item.percent}%)
                  </Text>
                </View>
                <View style={[styles.progressTrack, { backgroundColor: isDark ? '#222' : '#E5E7EB' }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${item.percent}%`, backgroundColor: item.color },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Recent Leads & Recent Sales Tables */}
      <View style={[styles.tablesRow, isDesktop && styles.tablesRowDesktop]}>
        {/* Recent CRM Leads */}
        <View style={[styles.tableCard, { backgroundColor: colors.card, borderColor: colors.border }, isDesktop && { flex: 1 }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Yangi CRM Arizalar
              </Text>
              <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
                Mijozlardan kelgan so‘nggi so‘rovlar
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/admin/crm')}>
              <Text style={{ color: COLORS.kiaRed, fontSize: 13, fontWeight: '700' }}>
                Barchasi ({stats?.newLeadsCount}) →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemsList}>
            {recentLeads.map((lead) => (
              <TouchableOpacity
                key={lead.id}
                onPress={() => router.push('/admin/crm')}
                style={styles.leadItem}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itemTitle, { color: colors.text }]}>
                    {lead.customerName}
                  </Text>
                  <Text style={[styles.itemSub, { color: colors.textSecondary }]}>
                    {lead.vehicleName || 'KIA'} • {lead.phone}
                  </Text>
                </View>
                <StatusBadge status={lead.status} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Sales Transactions */}
        <View style={[styles.tableCard, { backgroundColor: colors.card, borderColor: colors.border }, isDesktop && { flex: 1 }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                So‘nggi Sotuv Bitimlari
              </Text>
              <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
                Rasmiylashtirilgan shartnomalar
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/admin/sales')}>
              <Text style={{ color: COLORS.kiaRed, fontSize: 13, fontWeight: '700' }}>
                Sotuvlar Bo‘limi →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemsList}>
            {sales.map((sale) => (
              <TouchableOpacity
                key={sale.id}
                onPress={() => router.push('/admin/sales')}
                style={styles.leadItem}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itemTitle, { color: colors.text }]}>
                    {sale.contractNumber}: {sale.vehicleName}
                  </Text>
                  <Text style={[styles.itemSub, { color: colors.textSecondary }]}>
                    {sale.customerName} • {formatCurrency(sale.finalPriceUzs)}
                  </Text>
                </View>
                <StatusBadge status={sale.status} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    maxWidth: 1400,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
    flexWrap: 'wrap',
    gap: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  badgeRed: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  badgeRedText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  ownerTag: {
    fontSize: 13,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiGrid: {
    gap: 14,
    marginBottom: 28,
  },
  kpiGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  kpiCard: {
    flex: 1,
    minWidth: 160,
    maxWidth: 240,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 18,
  },
  kpiIconWrap: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartsRow: {
    gap: 20,
    marginBottom: 28,
  },
  chartsRowDesktop: {
    flexDirection: 'row',
  },
  chartCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  cardSub: {
    fontSize: 12,
    marginTop: 2,
  },
  chartTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  chartTagText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingTop: 20,
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  barValue: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  },
  barTrack: {
    width: 32,
    height: 110,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: RADIUS.sm,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: RADIUS.sm,
  },
  barLabel: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 8,
  },
  barSubLabel: {
    fontSize: 10,
  },
  modelList: {
    gap: 16,
  },
  modelRow: {
    gap: 6,
  },
  modelRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modelName: {
    fontSize: 13,
    fontWeight: '700',
  },
  modelCount: {
    fontSize: 12,
  },
  progressTrack: {
    height: 8,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
  tablesRow: {
    gap: 20,
  },
  tablesRowDesktop: {
    flexDirection: 'row',
  },
  tableCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  itemsList: {
    gap: 10,
  },
  leadItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.08)',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemSub: {
    fontSize: 12,
    marginTop: 2,
  },
});

