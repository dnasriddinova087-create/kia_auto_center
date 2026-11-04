// Admin Dashboard Screen
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
} from 'lucide-react-native';
import { StatusBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { DashboardStats, Lead } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, formatCurrency } = useLanguage();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  useEffect(() => {
    mockStore.getDashboardStats().then(setStats);
    mockStore.getLeads().then((leads) => setRecentLeads(leads.slice(0, 5)));
  }, []);

  const isWide = width >= 900;
  const isDesktop = width >= 1200;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('adminDashboard')}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              KIA AUTO CENTER O‘zbekiston — Real vaqt monitoringi va boshqaruv
            </Text>
          </View>

          <CustomButton
            title="Avtomobil qo‘shish"
            onPress={() => router.push('/admin/vehicles' as any)}
            variant="primary"
            size="sm"
            icon={<Plus size={16} color="#FFFFFF" />}
          />
        </View>

        {/* 8 Metric KPI Cards Grid */}
        <View style={[styles.kpiGrid, isDesktop && styles.kpiGridDesktop, !isDesktop && isWide && styles.kpiGridTablet]}>
          {/* 1. Jami avtomobillar */}
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isDesktop && { width: '23.5%' },
              !isDesktop && isWide && { width: '48%' },
            ]}
          >
            <View style={styles.kpiTop}>
              <Car size={20} color={COLORS.kiaRed} />
              <Text style={styles.kpiChange}>+100% aktiv</Text>
            </View>
            <Text style={[styles.kpiNumber, { color: colors.text }]}>
              {stats?.totalVehicles ?? 11}
            </Text>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
              {t('statTotalVehicles')}
            </Text>
          </View>

          {/* 2. Mavjud avtomobillar */}
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isDesktop && { width: '23.5%' },
              !isDesktop && isWide && { width: '48%' },
            ]}
          >
            <View style={styles.kpiTop}>
              <CheckCircle2 size={20} color={COLORS.success} />
              <Text style={[styles.kpiChange, { color: COLORS.success }]}>Salonda bor</Text>
            </View>
            <Text style={[styles.kpiNumber, { color: colors.text }]}>
              {stats?.availableVehicles ?? 11}
            </Text>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
              {t('statAvailable')}
            </Text>
          </View>

          {/* 3. Sotilgan avtomobillar */}
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isDesktop && { width: '23.5%' },
              !isDesktop && isWide && { width: '48%' },
            ]}
          >
            <View style={styles.kpiTop}>
              <TrendingUp size={20} color="#3B82F6" />
              <Text style={[styles.kpiChange, { color: '#3B82F6' }]}>Bu yil</Text>
            </View>
            <Text style={[styles.kpiNumber, { color: colors.text }]}>
              {stats?.soldVehicles ?? 28}
            </Text>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
              {t('statSold')}
            </Text>
          </View>

          {/* 4. Jami mijozlar */}
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isDesktop && { width: '23.5%' },
              !isDesktop && isWide && { width: '48%' },
            ]}
          >
            <View style={styles.kpiTop}>
              <Users size={20} color="#8B5CF6" />
              <Text style={[styles.kpiChange, { color: '#8B5CF6' }]}>Bazadagi</Text>
            </View>
            <Text style={[styles.kpiNumber, { color: colors.text }]}>
              {stats?.totalCustomers ?? 156}
            </Text>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
              {t('statTotalCustomers')}
            </Text>
          </View>

          {/* 5. Yangi arizalar */}
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isDesktop && { width: '23.5%' },
              !isDesktop && isWide && { width: '48%' },
            ]}
          >
            <View style={styles.kpiTop}>
              <Users size={20} color={COLORS.warning} />
              <Text style={[styles.kpiChange, { color: COLORS.warning }]}>Kutilmoqda</Text>
            </View>
            <Text style={[styles.kpiNumber, { color: colors.text }]}>
              {stats?.newLeadsCount ?? 4}
            </Text>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
              {t('statNewLeads')}
            </Text>
          </View>

          {/* 6. Test-drayvlar */}
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isDesktop && { width: '23.5%' },
              !isDesktop && isWide && { width: '48%' },
            ]}
          >
            <View style={styles.kpiTop}>
              <Calendar size={20} color={COLORS.kiaRed} />
              <Text style={styles.kpiChange}>Ushbu hafta</Text>
            </View>
            <Text style={[styles.kpiNumber, { color: colors.text }]}>
              {stats?.testDrivesCount ?? 2}
            </Text>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
              {t('statTestDrives')}
            </Text>
          </View>

          {/* 7. Servis buyurtmalari */}
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isDesktop && { width: '23.5%' },
              !isDesktop && isWide && { width: '48%' },
            ]}
          >
            <View style={styles.kpiTop}>
              <Wrench size={20} color="#10B981" />
              <Text style={[styles.kpiChange, { color: '#10B981' }]}>Ustaxonada</Text>
            </View>
            <Text style={[styles.kpiNumber, { color: colors.text }]}>
              {stats?.servicesCount ?? 2}
            </Text>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
              {t('statServices')}
            </Text>
          </View>

          {/* 8. Oylik Daromad / Aylanma */}
          <View
            style={[
              styles.kpiCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isDesktop && { width: '23.5%' },
              !isDesktop && isWide && { width: '48%' },
            ]}
          >
            <View style={styles.kpiTop}>
              <DollarSign size={20} color={COLORS.kiaRed} />
              <Text style={[styles.kpiChange, { color: COLORS.kiaRed }]}>14 ta sotuv</Text>
            </View>
            <Text style={[styles.kpiNumber, { color: COLORS.kiaRed, fontSize: 18 }]}>
              {formatCurrency(stats?.monthlyRevenueUzs ?? 5890000000)}
            </Text>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
              {t('statMonthlyRevenue')}
            </Text>
          </View>
        </View>

        {/* Recent CRM Leads Table */}
        <View
          style={[
            styles.tableCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.tableHeaderRow}>
            <View>
              <Text style={[styles.tableTitle, { color: colors.text }]}>
                Yangi mijozlar va CRM arizalari
              </Text>
              <Text style={[styles.tableSub, { color: colors.textSecondary }]}>
                Veb-sayt va mobil ilovadan tushgan so‘nggi arizalar
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/admin/leads' as any)}
              style={styles.viewAllLeads}
            >
              <Text style={{ color: COLORS.kiaRed, fontSize: 13, fontWeight: '700' }}>
                Barcha arizalar
              </Text>
              <ArrowRight size={14} color={COLORS.kiaRed} />
            </TouchableOpacity>
          </View>

          <View style={styles.leadsList}>
            {recentLeads.map((lead) => (
              <View
                key={lead.id}
                style={[
                  styles.leadRow,
                  { borderBottomColor: 'rgba(150, 150, 150, 0.1)' },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.leadName, { color: colors.text }]}>
                    {lead.customerName}
                  </Text>
                  <Text style={[styles.leadDetails, { color: colors.textSecondary }]}>
                    {lead.phone} • {lead.vehicleName || 'Umumiy so‘rov'}
                  </Text>
                </View>

                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <StatusBadge status={lead.status} />
                  <Text style={[styles.leadDate, { color: colors.textMuted }]}>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  kpiGrid: {
    gap: 16,
    marginBottom: 28,
  },
  kpiGridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  kpiGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  kpiCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 18,
    width: '100%',
  },
  kpiTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  kpiChange: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
  },
  kpiNumber: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 2,
  },
  kpiLabel: {
    fontSize: 12,
  },
  tableCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  tableSub: {
    fontSize: 13,
    marginTop: 2,
  },
  viewAllLeads: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  leadsList: {
    gap: 2,
  },
  leadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  leadName: {
    fontSize: 15,
    fontWeight: '700',
  },
  leadDetails: {
    fontSize: 12,
    marginTop: 2,
  },
  leadDate: {
    fontSize: 11,
  },
});
