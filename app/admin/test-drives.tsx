// Admin Test-Drives Management
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Calendar, Phone, User, Check, X, Building } from 'lucide-react-native';
import { StatusBadge } from '../../components/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { TestDriveRequest } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminTestDrivesScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const [testDrives, setTestDrives] = useState<TestDriveRequest[]>([]);

  useEffect(() => {
    loadTestDrives();
  }, []);

  const loadTestDrives = async () => {
    const list = await mockStore.getTestDrives();
    setTestDrives([...list]);
  };

  const handleUpdateStatus = async (id: string, st: TestDriveRequest['status']) => {
    await mockStore.updateTestDriveStatus(id, st);
    await loadTestDrives();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('adminTestDrives')} ({testDrives.length})
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Mijozlarning test-drayv sinovlari jadvali va tasdiqlash
          </Text>
        </View>

        <View style={styles.list}>
          {testDrives.map((td) => (
            <View
              key={td.id}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.topRow}>
                <View>
                  <Text style={[styles.carName, { color: COLORS.kiaRed }]}>
                    {td.vehicleName}
                  </Text>
                  <Text style={[styles.customerName, { color: colors.text }]}>
                    {td.fullName}
                  </Text>
                </View>
                <StatusBadge status={td.status} />
              </View>

              <View style={styles.detailRow}>
                <Phone size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {td.phone}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Building size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {td.branchName}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Calendar size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  Sana: <Text style={{ color: colors.text, fontWeight: '700' }}>{td.preferredDate} {td.preferredTime}</Text>
                </Text>
              </View>

              {td.driverLicenseNumber && (
                <Text style={[styles.subNote, { color: colors.textMuted }]}>
                  Haydovchilik guvohnomasi: {td.driverLicenseNumber}
                </Text>
              )}

              {/* Status Update Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  onPress={() => handleUpdateStatus(td.id, 'confirmed')}
                  style={[styles.btn, { backgroundColor: '#D1FAE5' }]}
                >
                  <Check size={14} color="#065F46" />
                  <Text style={[styles.btnText, { color: '#065F46' }]}>Tasdiqlash</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleUpdateStatus(td.id, 'completed')}
                  style={[styles.btn, { backgroundColor: isDark ? '#333' : '#E5E7EB' }]}
                >
                  <Check size={14} color={colors.text} />
                  <Text style={[styles.btnText, { color: colors.text }]}>Bajarildi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleUpdateStatus(td.id, 'cancelled')}
                  style={[styles.btn, { backgroundColor: '#FEE2E2' }]}
                >
                  <X size={14} color="#991B1B" />
                  <Text style={[styles.btnText, { color: '#991B1B' }]}>Bekor qilish</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  list: {
    gap: 16,
  },
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  carName: {
    fontSize: 15,
    fontWeight: '800',
  },
  customerName: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  detailText: {
    fontSize: 13,
  },
  subNote: {
    fontSize: 12,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.1)',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  btnText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
