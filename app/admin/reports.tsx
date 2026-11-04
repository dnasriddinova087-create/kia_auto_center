// Dealership Comprehensive Reports & CSV Analytics
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  Car,
  Users,
  Wrench,
  Package,
} from 'lucide-react-native';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { DashboardStats, SaleTransaction } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminReportsScreen() {
  const { colors, isDark } = useTheme();
  const { formatCurrency } = useLanguage();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sales, setSales] = useState<SaleTransaction[]>([]);
  const [reportType, setReportType] = useState<'sales' | 'revenue' | 'managers' | 'inventory'>('sales');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await mockStore.getDashboardStats();
    setStats(s);
    const sl = await mockStore.getSales();
    setSales(sl);
  };

  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `kia_hisobot_${reportType}.csv`;

    if (reportType === 'sales') {
      headers = ['Shartnoma', 'Mijoz', 'Model', 'Summa', 'Menejer', 'Sana', 'Status'];
      rows = sales.map((s) => [s.contractNumber, `"${s.customerName}"`, `"${s.vehicleName}"`, s.finalPriceUzs, `"${s.salesManager}"`, s.saleDate, s.status]);
    } else if (reportType === 'revenue') {
      headers = ['Kategoriya', 'Summa_UZS', 'Ulush_Foiz'];
      rows = [
        ['Avtomobillar Sotuvidan', 3546000000, '82%'],
        ['Rasmiy Servis va TO Xizmatlaridan', 420000000, '10%'],
        ['Kafolatli Ehtiyot Qismlar', 210000000, '5%'],
        ['Trade-In va Komissiya', 130000000, '3%'],
      ];
    } else {
      headers = ['Xodim', 'Lavozim', 'Sotuv_Soni', 'Jami_Tushum_UZS', 'Samaradorlik'];
      rows = [
        ['Alisher Shodiyev', 'Senior Sales Manager', 18, 9240000000, '98%'],
        ['Jasur Beknazarov', 'Sales Consultant', 12, 5980000000, '91%'],
        ['Sohib Yoqubov', 'Regional Sales Representative', 9, 4410000000, '87%'],
      ];
    }

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Hisobotlar va Tahlil</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sotuvlar, daromad, menejerlar samaradorligi va ombor qoldiqlari hisoboti
          </Text>
        </View>

        <CustomButton
          title="Hisobotni CSV Yuklab Olish"
          onPress={handleExportCSV}
          variant="primary"
          size="md"
          icon={<Download size={16} color="#FFFFFF" />}
        />
      </View>

      {/* Report Type Selector */}
      <View style={styles.typeSelector}>
        {(['sales', 'revenue', 'managers', 'inventory'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setReportType(t)}
            style={[
              styles.typeTab,
              reportType === t && { backgroundColor: COLORS.kiaRed },
            ]}
          >
            <Text
              style={[
                styles.typeTabText,
                { color: reportType === t ? '#FFF' : colors.textSecondary },
              ]}
            >
              {t === 'sales'
                ? 'SOTUVLAR HISOBOTI'
                : t === 'revenue'
                ? 'DAROMAD DINAMIKASI'
                : t === 'managers'
                ? 'MENEJERLAR SAMARADORLIGI'
                : 'OMBOR VA ZAXIRA'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Report Table Display */}
      <View style={[styles.reportCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.reportHeader}>
          <FileSpreadsheet size={20} color={COLORS.kiaRed} />
          <Text style={[styles.reportTitle, { color: colors.text }]}>
            {reportType === 'sales'
              ? 'Bitimlar va Sotuvlar Bo‘yicha To‘liq Hisobot'
              : reportType === 'revenue'
              ? 'Daromadlar va Moliyaviy Tushumlar Taqsimoti'
              : reportType === 'managers'
              ? 'Sotuv Menejerlari Bo‘yicha KPI va Samaradorlik'
              : 'Ombor Harakatlari va Zaxira Qoldiqlari'}
          </Text>
        </View>

        {reportType === 'sales' ? (
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={[styles.th, { flex: 1.2 }]}>Shartnoma</Text>
              <Text style={[styles.th, { flex: 2 }]}>Mijoz</Text>
              <Text style={[styles.th, { flex: 2 }]}>Model</Text>
              <Text style={[styles.th, { flex: 1.5 }]}>Summa</Text>
              <Text style={[styles.th, { flex: 1 }]}>Sana</Text>
            </View>
            {sales.map((s) => (
              <View key={s.id} style={styles.tableRow}>
                <Text style={[styles.td, { flex: 1.2, fontWeight: '700', color: COLORS.kiaRed }]}>
                  {s.contractNumber}
                </Text>
                <Text style={[styles.td, { flex: 2, color: colors.text }]}>{s.customerName}</Text>
                <Text style={[styles.td, { flex: 2, color: colors.text }]}>{s.vehicleName}</Text>
                <Text style={[styles.td, { flex: 1.5, fontWeight: '800', color: '#10B981' }]}>
                  {formatCurrency(s.finalPriceUzs)}
                </Text>
                <Text style={[styles.td, { flex: 1, color: colors.textSecondary }]}>{s.saleDate}</Text>
              </View>
            ))}
          </View>
        ) : reportType === 'revenue' ? (
          <View style={styles.revenueSummary}>
            <View style={[styles.summaryBox, { backgroundColor: 'rgba(16,185,129,0.1)' }]}>
              <Text style={[styles.summaryLbl, { color: '#10B981' }]}>Jami Dilerlik Tushumi</Text>
              <Text style={[styles.summaryVal, { color: '#10B981' }]}>
                {formatCurrency(stats?.totalRevenueUzs || 3546000000)}
              </Text>
            </View>

            <View style={[styles.summaryBox, { backgroundColor: 'rgba(59,130,246,0.1)' }]}>
              <Text style={[styles.summaryLbl, { color: '#3B82F6' }]}>Joriy Oy Sotuv Tushumi</Text>
              <Text style={[styles.summaryVal, { color: '#3B82F6' }]}>
                {formatCurrency(stats?.monthlyRevenueUzs || 1773000000)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={[styles.th, { flex: 2 }]}>Menejer</Text>
              <Text style={[styles.th, { flex: 1.5 }]}>Lavozim</Text>
              <Text style={[styles.th, { flex: 1 }]}>Sotuv</Text>
              <Text style={[styles.th, { flex: 2 }]}>Jami Bitimlar Summasi</Text>
              <Text style={[styles.th, { flex: 1 }]}>KPI</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.td, { flex: 2, fontWeight: '700', color: colors.text }]}>Alisher Shodiyev</Text>
              <Text style={[styles.td, { flex: 1.5, color: colors.textSecondary }]}>Senior Manager</Text>
              <Text style={[styles.td, { flex: 1, color: colors.text }]}>18 ta</Text>
              <Text style={[styles.td, { flex: 2, fontWeight: '800', color: '#10B981' }]}>9 240 000 000 so‘m</Text>
              <Text style={[styles.td, { flex: 1, fontWeight: '800', color: '#10B981' }]}>98%</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.td, { flex: 2, fontWeight: '700', color: colors.text }]}>Jasur Beknazarov</Text>
              <Text style={[styles.td, { flex: 1.5, color: colors.textSecondary }]}>Sales Consultant</Text>
              <Text style={[styles.td, { flex: 1, color: colors.text }]}>12 ta</Text>
              <Text style={[styles.td, { flex: 2, fontWeight: '800', color: '#10B981' }]}>5 980 000 000 so‘m</Text>
              <Text style={[styles.td, { flex: 1, fontWeight: '800', color: '#10B981' }]}>91%</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  typeTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(150,150,150,0.12)',
  },
  typeTabText: {
    fontSize: 11,
    fontWeight: '800',
  },
  reportCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  reportTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  table: {
    gap: 6,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.08)',
    alignItems: 'center',
  },
  tableHeaderRow: {
    backgroundColor: 'rgba(150,150,150,0.08)',
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
  },
  th: {
    fontSize: 11,
    fontWeight: '800',
    color: '#888',
    textTransform: 'uppercase',
  },
  td: {
    fontSize: 13,
    paddingHorizontal: 4,
  },
  revenueSummary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingVertical: 20,
  },
  summaryBox: {
    flex: 1,
    minWidth: 260,
    padding: 24,
    borderRadius: RADIUS.lg,
    gap: 6,
  },
  summaryLbl: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  summaryVal: {
    fontSize: 26,
    fontWeight: '900',
  },
});
