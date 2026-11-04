// Admin CRM & Leads Pipeline Management
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
import { Users, Phone, Mail, Calendar, Check, ChevronDown } from 'lucide-react-native';
import { StatusBadge } from '../../components/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { Lead, LeadStatus } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminLeadsScreen() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, formatCurrency } = useLanguage();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const list = await mockStore.getLeads();
    setLeads([...list]);
  };

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    await mockStore.updateLeadStatus(id, newStatus);
    await loadLeads();
  };

  const statuses: { id: string; label: string }[] = [
    { id: 'all', label: 'Barchasi' },
    { id: 'new', label: 'Yangi' },
    { id: 'contacted', label: 'Bog‘lanildi' },
    { id: 'test_drive_scheduled', label: 'Test-drayv' },
    { id: 'negotiation', label: 'Muzokara' },
    { id: 'contract_signed', label: 'Shartnoma' },
    { id: 'delivered', label: 'Topshirildi' },
    { id: 'cancelled', label: 'Bekor qilingan' },
  ];

  const filtered = leads.filter(
    (l) => filterStatus === 'all' || l.status === filterStatus
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('adminLeads')} ({filtered.length})
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Mijozlar bilan aloqa, sotuv voronkasi va arizalar monitoringi
          </Text>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {statuses.map((s) => {
            const isSelected = filterStatus === s.id;
            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => setFilterStatus(s.id)}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isSelected
                      ? COLORS.kiaRed
                      : isDark
                      ? '#222'
                      : '#E5E7EB',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    { color: isSelected ? '#FFF' : colors.text },
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Leads Table / Cards */}
        <View style={styles.list}>
          {filtered.map((lead) => (
            <View
              key={lead.id}
              style={[
                styles.leadCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.leadHeader}>
                <View>
                  <Text style={[styles.customerName, { color: colors.text }]}>
                    {lead.customerName}
                  </Text>
                  <Text style={[styles.carInfo, { color: COLORS.kiaRed }]}>
                    {lead.vehicleName || 'Umumiy konsultatsiya'}
                  </Text>
                </View>
                <StatusBadge status={lead.status} />
              </View>

              <View style={styles.detailRow}>
                <Phone size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {lead.phone}
                </Text>
              </View>

              {lead.budgetUzs && (
                <View style={styles.detailRow}>
                  <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                    Byudjet / Narx: <Text style={{ color: colors.text, fontWeight: '700' }}>{formatCurrency(lead.budgetUzs)}</Text>
                  </Text>
                </View>
              )}

              {lead.notes && (
                <Text style={[styles.notesBox, { color: colors.textSecondary, backgroundColor: isDark ? '#1C1C1C' : '#F9FAFB' }]}>
                  Izoh: {lead.notes}
                </Text>
              )}

              {/* Status Update Quick Buttons */}
              <View style={styles.statusButtons}>
                <Text style={[styles.statusActionLabel, { color: colors.textMuted }]}>
                  Holatni o‘zgartirish:
                </Text>
                <View style={styles.statusBtnsRow}>
                  {(['new', 'contacted', 'test_drive_scheduled', 'contract_signed', 'cancelled'] as LeadStatus[]).map((st) => (
                    <TouchableOpacity
                      key={st}
                      onPress={() => handleUpdateStatus(lead.id, st)}
                      style={[
                        styles.stBtn,
                        lead.status === st && { backgroundColor: COLORS.kiaRed },
                        lead.status !== st && { backgroundColor: isDark ? '#262626' : '#E5E7EB' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.stBtnText,
                          { color: lead.status === st ? '#FFF' : colors.text },
                        ]}
                      >
                        {st.replace(/_/g, ' ')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  filterScroll: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    marginRight: 8,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    gap: 16,
  },
  leadCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  customerName: {
    fontSize: 17,
    fontWeight: '800',
  },
  carInfo: {
    fontSize: 13,
    fontWeight: '600',
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
  notesBox: {
    fontSize: 12,
    padding: 10,
    borderRadius: RADIUS.sm,
    marginTop: 10,
  },
  statusButtons: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.1)',
  },
  statusActionLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  statusBtnsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  stBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  stBtnText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
