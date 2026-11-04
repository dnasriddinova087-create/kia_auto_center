// Admin Service Bookings Management
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Wrench, Phone, Calendar, Check, X, Building, Car } from 'lucide-react-native';
import { StatusBadge } from '../../components/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { ServiceRequest } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminServicesScreen() {
  const { colors, isDark } = useTheme();
  const { t, formatCurrency } = useLanguage();
  const [services, setServices] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const list = await mockStore.getServices();
    setServices([...list]);
  };

  const handleUpdateStatus = async (id: string, st: ServiceRequest['status']) => {
    await mockStore.updateServiceStatus(id, st);
    await loadServices();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('adminServices')} ({services.length})
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Texnik xizmat ko‘rsatish va ta’mirlash buyurtmalarini boshqarish
          </Text>
        </View>

        <View style={styles.list}>
          {services.map((srv) => (
            <View
              key={srv.id}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.topRow}>
                <View>
                  <Text style={[styles.vehicleModel, { color: COLORS.kiaRed }]}>
                    {srv.vehicleModel}
                  </Text>
                  <Text style={[styles.serviceType, { color: colors.text }]}>
                    {srv.serviceType}
                  </Text>
                </View>
                <StatusBadge status={srv.status} />
              </View>

              <View style={styles.detailRow}>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  Mijoz: <Text style={{ color: colors.text, fontWeight: '700' }}>{srv.fullName}</Text> ({srv.phone})
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Car size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  Davlat raqami: {srv.licensePlate || 'Ko‘rsatilmagan'} • Yurgan masofa: {srv.mileageKm} km
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Building size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {srv.branchName}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Calendar size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  Sana: {srv.preferredDate} {srv.preferredTime}
                </Text>
              </View>

              {srv.estimatedCostUzs && (
                <Text style={[styles.costText, { color: COLORS.success }]}>
                  Taxminiy qiymat: {formatCurrency(srv.estimatedCostUzs)}
                </Text>
              )}

              {/* Status Update Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  onPress={() => handleUpdateStatus(srv.id, 'confirmed')}
                  style={[styles.btn, { backgroundColor: '#D1FAE5' }]}
                >
                  <Check size={14} color="#065F46" />
                  <Text style={[styles.btnText, { color: '#065F46' }]}>Tasdiqlash</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleUpdateStatus(srv.id, 'completed')}
                  style={[styles.btn, { backgroundColor: isDark ? '#333' : '#E5E7EB' }]}
                >
                  <Check size={14} color={colors.text} />
                  <Text style={[styles.btnText, { color: colors.text }]}>Bajarildi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleUpdateStatus(srv.id, 'cancelled')}
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
    marginBottom: 8,
  },
  vehicleModel: {
    fontSize: 14,
    fontWeight: '800',
  },
  serviceType: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  detailText: {
    fontSize: 13,
  },
  costText: {
    fontSize: 14,
    fontWeight: '800',
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
