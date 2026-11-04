// Full Automotive CRM & Lead Management System for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  Car,
  DollarSign,
  UserCheck,
  Edit3,
  X,
  MessageSquare,
} from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { StatusBadge } from '../../components/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { Lead, LeadStatus, LeadType } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminCrmScreen() {
  const { colors, isDark } = useTheme();
  const { formatCurrency } = useLanguage();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Edit fields
  const [newStatus, setNewStatus] = useState<LeadStatus>('new');
  const [manager, setManager] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const list = await mockStore.getLeads();
    setLeads(list);
  };

  const handleOpenEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
    setManager(lead.assignedManager || 'Alisher Shodiyev');
    setNotes(lead.notes || '');
    setModalOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedLead) return;
    await mockStore.updateLeadStatus(selectedLead.id, newStatus, notes, manager);
    await loadLeads();
    setModalOpen(false);
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.vehicleName && l.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || l.leadType === typeFilter;
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const allStatuses: { id: LeadStatus; label: string }[] = [
    { id: 'new', label: 'Yangi' },
    { id: 'contacted', label: 'Bog‘lanildi' },
    { id: 'in_negotiation', label: 'Muzokarada' },
    { id: 'test_drive_scheduled', label: 'Test-Drayv' },
    { id: 'confirmed', label: 'Tasdiqlandi' },
    { id: 'contract_signed', label: 'Shartnoma Imzolandi' },
    { id: 'completed', label: 'Yakunlandi' },
    { id: 'cancelled', label: 'Bekor Qilindi' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>CRM — Arizalar Boshqaruvi</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Jami {leads.length} ta xarid, kredit, test-drayv va servis arizalari nazorati
          </Text>
        </View>
      </View>

      {/* Filter and Search Bar */}
      <View style={[styles.filterBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.searchBox}>
          <CustomInput
            placeholder="Mijoz ismi, telefon yoki model bo‘yicha qidirish..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={<Search size={18} color={colors.textMuted} />}
            style={{ marginBottom: 0 }}
          />
        </View>

        {/* Lead Type Filters */}
        <View style={styles.pillsRow}>
          <Text style={[styles.pillsLabel, { color: colors.textSecondary }]}>Turi:</Text>
          {['all', 'purchase', 'loan', 'test_drive', 'trade_in', 'service'].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTypeFilter(t)}
              style={[
                styles.pillBtn,
                typeFilter === t && { backgroundColor: COLORS.kiaRed },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: typeFilter === t ? '#FFF' : colors.textSecondary },
                ]}
              >
                {t.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Status Filters */}
        <View style={styles.pillsRow}>
          <Text style={[styles.pillsLabel, { color: colors.textSecondary }]}>Status:</Text>
          {['all', 'new', 'contacted', 'in_negotiation', 'contract_signed'].map((st) => (
            <TouchableOpacity
              key={st}
              onPress={() => setStatusFilter(st)}
              style={[
                styles.pillBtn,
                statusFilter === st && { backgroundColor: isDark ? '#333' : '#E5E7EB' },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: statusFilter === st ? (isDark ? '#FFF' : '#111') : colors.textSecondary },
                ]}
              >
                {st.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

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
            <View style={styles.cardTop}>
              <View style={styles.leadIdTag}>
                <Text style={styles.leadIdText}>{lead.id.toUpperCase()}</Text>
              </View>

              <View style={styles.typeTag}>
                <Text style={styles.typeTagText}>
                  {lead.leadType === 'purchase'
                    ? 'AVTO XARIDI'
                    : lead.leadType === 'loan'
                    ? 'KREDIT ARIZASI'
                    : lead.leadType === 'test_drive'
                    ? 'TEST-DRAYV'
                    : lead.leadType === 'trade_in'
                    ? 'TRADE-IN'
                    : lead.leadType.toUpperCase()}
                </Text>
              </View>

              <View style={{ marginLeft: 'auto' }}>
                <StatusBadge status={lead.status} />
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={[styles.customerName, { color: colors.text }]}>
                {lead.customerName}
              </Text>

              <View style={styles.detailsRow}>
                <Phone size={13} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {lead.phone}
                </Text>
                {lead.vehicleName ? (
                  <>
                    <Car size={13} color={COLORS.kiaRed} style={{ marginLeft: 12 }} />
                    <Text style={[styles.detailText, { color: colors.text, fontWeight: '700' }]}>
                      {lead.vehicleName}
                    </Text>
                  </>
                ) : null}
              </View>

              {lead.budgetUzs ? (
                <View style={styles.budgetRow}>
                  <Text style={[styles.budgetLbl, { color: colors.textSecondary }]}>
                    Budjet / Summa:
                  </Text>
                  <Text style={[styles.budgetVal, { color: '#10B981' }]}>
                    {formatCurrency(lead.budgetUzs)}
                  </Text>
                </View>
              ) : null}

              {lead.assignedManager ? (
                <View style={styles.managerRow}>
                  <UserCheck size={13} color={colors.textSecondary} />
                  <Text style={[styles.managerText, { color: colors.textSecondary }]}>
                    Mas’ul Menejer: <Text style={{ color: colors.text, fontWeight: '700' }}>{lead.assignedManager}</Text>
                  </Text>
                </View>
              ) : null}

              {lead.notes ? (
                <View style={styles.notesBox}>
                  <MessageSquare size={13} color="#888" />
                  <Text style={[styles.notesText, { color: colors.textSecondary }]}>
                    {lead.notes}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.cardFooter}>
              <Text style={[styles.dateText, { color: colors.textMuted }]}>
                Yuborilgan sana: {new Date(lead.createdAt).toLocaleString('uz-UZ')}
              </Text>

              <TouchableOpacity
                onPress={() => handleOpenEdit(lead)}
                style={[styles.btnEdit, { backgroundColor: COLORS.kiaRed }]}
              >
                <Edit3 size={13} color="#FFFFFF" />
                <Text style={styles.btnEditText}>Status & Menejerni O‘zgartirish</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Edit Status Modal */}
      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Ariza Statusini Yangilash
              </Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <X size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSub, { color: colors.textSecondary }]}>
              Mijoz: {selectedLead?.customerName} ({selectedLead?.phone})
            </Text>

            <Text style={[styles.fieldTitle, { color: colors.text }]}>Statusni Tanlang:</Text>
            <View style={styles.statusGrid}>
              {allStatuses.map((st) => (
                <TouchableOpacity
                  key={st.id}
                  onPress={() => setNewStatus(st.id)}
                  style={[
                    styles.statusPillBtn,
                    newStatus === st.id && { backgroundColor: COLORS.kiaRed },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusPillText,
                      { color: newStatus === st.id ? '#FFF' : colors.textSecondary },
                    ]}
                  >
                    {st.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <CustomInput
              label="Mas’ul Sotuv Menejeri"
              placeholder="Alisher Shodiyev"
              value={manager}
              onChangeText={setManager}
            />

            <CustomInput
              label="Muzokara Izohlari"
              placeholder="Mijoz bilan bog‘lanildi, test-drayvga taklif qilindi..."
              value={notes}
              onChangeText={setNotes}
            />

            <View style={styles.modalActions}>
              <CustomButton title="Bekor qilish" onPress={() => setModalOpen(false)} variant="outline" size="md" />
              <CustomButton title="Statusni Saqlash" onPress={handleSaveStatus} variant="primary" size="md" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  filterBar: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  searchBox: {
    width: '100%',
  },
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillsLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  pillBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
  pillText: {
    fontSize: 10,
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
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  leadIdTag: {
    backgroundColor: 'rgba(150,150,150,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  leadIdText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#888',
  },
  typeTag: {
    backgroundColor: 'rgba(200, 16, 46, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  typeTagText: {
    color: COLORS.kiaRed,
    fontSize: 10,
    fontWeight: '800',
  },
  cardBody: {
    gap: 8,
    marginBottom: 14,
  },
  customerName: {
    fontSize: 17,
    fontWeight: '800',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 13,
  },
  budgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  budgetLbl: {
    fontSize: 12,
  },
  budgetVal: {
    fontSize: 13,
    fontWeight: '800',
  },
  managerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  managerText: {
    fontSize: 12,
  },
  notesBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(150,150,150,0.08)',
    padding: 10,
    borderRadius: RADIUS.sm,
  },
  notesText: {
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    paddingTop: 12,
    flexWrap: 'wrap',
    gap: 10,
  },
  dateText: {
    fontSize: 11,
  },
  btnEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  btnEditText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    maxWidth: 520,
    width: '100%',
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  modalSub: {
    fontSize: 13,
    marginBottom: 16,
  },
  fieldTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  statusPillBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(150,150,150,0.12)',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },
});

