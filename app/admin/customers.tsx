// Admin Customer Relationship & Accounts Management
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
  UserCheck,
  UserX,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  Plus,
  Edit2,
  X,
  ShieldAlert,
} from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { CustomerRecord } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminCustomersScreen() {
  const { colors, isDark } = useTheme();
  const { formatCurrency } = useLanguage();

  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCust, setSelectedCust] = useState<CustomerRecord | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const list = await mockStore.getCustomers();
    setCustomers(list);
  };

  const handleOpenAdd = () => {
    setSelectedCust(null);
    setFullName('');
    setPhone('+998 ');
    setEmail('');
    setNotes('');
    setModalOpen(true);
  };

  const handleOpenEdit = (c: CustomerRecord) => {
    setSelectedCust(c);
    setFullName(c.fullName);
    setPhone(c.phone);
    setEmail(c.email);
    setNotes(c.notes || '');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!fullName.trim() || !phone.trim()) return;

    if (selectedCust) {
      await mockStore.updateCustomer(selectedCust.id, {
        fullName,
        phone,
        email,
        notes,
      });
    } else {
      await mockStore.addCustomer({
        fullName,
        phone,
        email,
        totalPurchases: 0,
        totalSpentUzs: 0,
        totalRequests: 1,
        status: 'active',
        notes,
      });
    }

    await loadCustomers();
    setModalOpen(false);
  };

  const handleToggleBlock = async (id: string) => {
    await mockStore.toggleBlockCustomer(id);
    await loadCustomers();
  };

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Mijozlar Boshqaruvi</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Jami {customers.length} nafar mijoz ma’lumotlar bazasida
          </Text>
        </View>

        <CustomButton
          title="Yangi Mijoz Qo‘shish"
          onPress={handleOpenAdd}
          variant="primary"
          size="md"
          icon={<Plus size={16} color="#FFFFFF" />}
        />
      </View>

      {/* Filter and Search Bar */}
      <View style={[styles.filterBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.searchBox}>
          <CustomInput
            placeholder="Ism, telefon raqami yoki email bo‘yicha qidirish..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={<Search size={18} color={colors.textMuted} />}
            style={{ marginBottom: 0 }}
          />
        </View>

        <View style={styles.filterPills}>
          {(['all', 'active', 'blocked'] as const).map((st) => (
            <TouchableOpacity
              key={st}
              onPress={() => setStatusFilter(st)}
              style={[
                styles.filterBtn,
                statusFilter === st && { backgroundColor: COLORS.kiaRed },
              ]}
            >
              <Text
                style={[
                  styles.filterBtnText,
                  { color: statusFilter === st ? '#FFF' : colors.textSecondary },
                ]}
              >
                {st === 'all' ? 'BARCHASI' : st === 'active' ? 'FAOL MIJOZLAR' : 'BLOKLANGANLAR'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Customer List */}
      <View style={styles.list}>
        {filtered.map((c) => (
          <View
            key={c.id}
            style={[
              styles.customerCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.avatarWrap}>
                <Text style={styles.avatarText}>{c.fullName.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={[styles.custName, { color: colors.text }]}>{c.fullName}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      { backgroundColor: c.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        { color: c.status === 'active' ? '#10B981' : '#EF4444' },
                      ]}
                    >
                      {c.status === 'active' ? 'FAOL' : 'BLOKLANGAN'}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Phone size={13} color={colors.textSecondary} />
                  <Text style={[styles.infoText, { color: colors.textSecondary }]}>{c.phone}</Text>
                  <Mail size={13} color={colors.textSecondary} style={{ marginLeft: 10 }} />
                  <Text style={[styles.infoText, { color: colors.textSecondary }]}>{c.email}</Text>
                </View>
              </View>
            </View>

            {/* Stats row */}
            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Text style={[styles.statVal, { color: colors.text }]}>{c.totalPurchases} ta</Text>
                <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Avto xaridi</Text>
              </View>
              <View style={styles.statCol}>
                <Text style={[styles.statVal, { color: '#10B981' }]}>
                  {formatCurrency(c.totalSpentUzs)}
                </Text>
                <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Jami to‘lov</Text>
              </View>
              <View style={styles.statCol}>
                <Text style={[styles.statVal, { color: colors.text }]}>{c.totalRequests} ta</Text>
                <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Arizalar</Text>
              </View>
            </View>

            {c.notes ? (
              <Text style={[styles.notesText, { color: colors.textSecondary }]}>
                Izoh: {c.notes}
              </Text>
            ) : null}

            {/* Actions */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                onPress={() => handleOpenEdit(c)}
                style={[styles.btnAction, { backgroundColor: isDark ? '#222' : '#F3F4F6' }]}
              >
                <Edit2 size={14} color={colors.text} />
                <Text style={[styles.btnActionText, { color: colors.text }]}>Tahrirlash</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleToggleBlock(c.id)}
                style={[
                  styles.btnAction,
                  {
                    backgroundColor: c.status === 'active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  },
                ]}
              >
                {c.status === 'active' ? (
                  <>
                    <UserX size={14} color="#EF4444" />
                    <Text style={[styles.btnActionText, { color: '#EF4444' }]}>Akkauntni Bloklash</Text>
                  </>
                ) : (
                  <>
                    <UserCheck size={14} color="#10B981" />
                    <Text style={[styles.btnActionText, { color: '#10B981' }]}>Faollashtirish</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Modal */}
      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {selectedCust ? 'Mijoz Ma’lumotlarini Tahrirlash' : 'Yangi Mijoz Qo‘shish'}
              </Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <X size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <CustomInput label="Ism va Familiya" placeholder="Dilshod Ergashev" value={fullName} onChangeText={setFullName} />
            <CustomInput label="Telefon Raqami" placeholder="+998 90 123 45 67" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <CustomInput label="Elektron Pochta" placeholder="dilshod@example.uz" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <CustomInput label="Mijoz haqida izoh" placeholder="KIA K5 xaridiga qiziqmoqda" value={notes} onChangeText={setNotes} />

            <View style={styles.modalActions}>
              <CustomButton title="Bekor qilish" onPress={() => setModalOpen(false)} variant="outline" size="md" />
              <CustomButton title="Saqlash" onPress={handleSave} variant="primary" size="md" />
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
  filterPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  filterBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  list: {
    gap: 16,
  },
  customerCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.kiaRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  custName: {
    fontSize: 17,
    fontWeight: '800',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  infoText: {
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
    paddingVertical: 12,
    marginBottom: 12,
    gap: 24,
  },
  statCol: {
    gap: 2,
  },
  statVal: {
    fontSize: 14,
    fontWeight: '800',
  },
  statLbl: {
    fontSize: 11,
  },
  notesText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
  },
  btnActionText: {
    fontSize: 12,
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
    maxWidth: 480,
    width: '100%',
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },
});

