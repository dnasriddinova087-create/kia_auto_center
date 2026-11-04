// Admin Test-Drives Management & Conflict Prevention
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
  Calendar,
  Phone,
  User,
  Check,
  X,
  Building,
  Car,
  Clock,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { StatusBadge } from '../../components/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { mockStore } from '../../lib/mockStore';
import { TestDriveRequest } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminTestDrivesScreen() {
  const { colors, isDark } = useTheme();

  const [testDrives, setTestDrives] = useState<TestDriveRequest[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTd, setSelectedTd] = useState<TestDriveRequest | null>(null);
  const [assignedStaff, setAssignedStaff] = useState('Alisher Shodiyev');
  const [status, setStatus] = useState<TestDriveRequest['status']>('confirmed');

  useEffect(() => {
    loadTestDrives();
  }, []);

  const loadTestDrives = async () => {
    const list = await mockStore.getTestDrives();
    setTestDrives([...list]);
  };

  const handleOpenEdit = (td: TestDriveRequest) => {
    setSelectedTd(td);
    setAssignedStaff(td.assignedStaff || 'Alisher Shodiyev');
    setStatus(td.status);
    setModalOpen(true);
  };

  const handleQuickStatus = async (id: string, st: TestDriveRequest['status']) => {
    await mockStore.updateTestDrive(id, st);
    await loadTestDrives();
  };

  const handleSaveModal = async () => {
    if (!selectedTd) return;
    await mockStore.updateTestDrive(selectedTd.id, status, assignedStaff);
    await loadTestDrives();
    setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            Test-Drayv Boshqaruvi
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Jami {testDrives.length} ta dilerlik test-drayv arizalari va jadvali
          </Text>
        </View>
      </View>

      {/* List */}
      <View style={styles.list}>
        {testDrives.map((td) => (
          <View
            key={td.id}
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.badgeWrap}>
                <Car size={16} color={COLORS.kiaRed} />
                <Text style={styles.badgeText}>{td.vehicleName}</Text>
              </View>

              <StatusBadge status={td.status} />
            </View>

            <View style={styles.cardBody}>
              <View style={styles.row}>
                <User size={14} color={colors.textSecondary} />
                <Text style={[styles.valText, { color: colors.text, fontWeight: '700' }]}>
                  {td.fullName}
                </Text>
                <Phone size={14} color={colors.textSecondary} style={{ marginLeft: 10 }} />
                <Text style={[styles.valText, { color: colors.textSecondary }]}>
                  {td.phone}
                </Text>
              </View>

              <View style={styles.row}>
                <Building size={14} color={colors.textSecondary} />
                <Text style={[styles.valText, { color: colors.textSecondary }]}>
                  {td.branchName}
                </Text>
              </View>

              <View style={styles.row}>
                <Calendar size={14} color={COLORS.kiaRed} />
                <Text style={[styles.valText, { color: colors.text, fontWeight: '700' }]}>
                  {td.preferredDate} soat {td.preferredTime}
                </Text>
                {td.driverLicenseNumber && (
                  <Text style={[styles.licenseText, { color: colors.textMuted }]}>
                    (Guvohnoma: {td.driverLicenseNumber})
                  </Text>
                )}
              </View>

              {td.assignedStaff && (
                <View style={styles.row}>
                  <UserCheck size={14} color="#10B981" />
                  <Text style={[styles.valText, { color: colors.textSecondary }]}>
                    Mas’ul xodim: <Text style={{ color: colors.text, fontWeight: '700' }}>{td.assignedStaff}</Text>
                  </Text>
                </View>
              )}
            </View>

            {/* Quick Actions */}
            <View style={styles.cardFooter}>
              <TouchableOpacity
                onPress={() => handleOpenEdit(td)}
                style={[styles.btnAction, { backgroundColor: isDark ? '#222' : '#F3F4F6' }]}
              >
                <Text style={[styles.btnActionText, { color: colors.text }]}>
                  Xodim Biriktirish / Tahrirlash
                </Text>
              </TouchableOpacity>

              {td.status === 'pending' && (
                <TouchableOpacity
                  onPress={() => handleQuickStatus(td.id, 'confirmed')}
                  style={[styles.btnAction, { backgroundColor: '#10B981' }]}
                >
                  <Check size={14} color="#FFF" />
                  <Text style={[styles.btnActionText, { color: '#FFF' }]}>Tasdiqlash</Text>
                </TouchableOpacity>
              )}

              {td.status === 'confirmed' && (
                <TouchableOpacity
                  onPress={() => handleQuickStatus(td.id, 'completed')}
                  style={[styles.btnAction, { backgroundColor: '#2563EB' }]}
                >
                  <CheckCircle2 size={14} color="#FFF" />
                  <Text style={[styles.btnActionText, { color: '#FFF' }]}>Bajarildi</Text>
                </TouchableOpacity>
              )}

              {td.status !== 'cancelled' && (
                <TouchableOpacity
                  onPress={() => handleQuickStatus(td.id, 'cancelled')}
                  style={[styles.btnAction, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}
                >
                  <X size={14} color="#EF4444" />
                  <Text style={[styles.btnActionText, { color: '#EF4444' }]}>Bekor qilish</Text>
                </TouchableOpacity>
              )}
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
                Test-Drayv Holatini Yangilash
              </Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <X size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSub, { color: colors.textSecondary }]}>
              {selectedTd?.fullName} — {selectedTd?.vehicleName} ({selectedTd?.preferredDate} {selectedTd?.preferredTime})
            </Text>

            <CustomInput
              label="Mas’ul Instruktor / Sotuv Xodimi"
              placeholder="Alisher Shodiyev"
              value={assignedStaff}
              onChangeText={setAssignedStaff}
            />

            <Text style={[styles.fieldLbl, { color: colors.text }]}>Holat:</Text>
            <View style={styles.statusGrid}>
              {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                <TouchableOpacity
                  key={st}
                  onPress={() => setStatus(st)}
                  style={[
                    styles.stBtn,
                    status === st && { backgroundColor: COLORS.kiaRed },
                  ]}
                >
                  <Text
                    style={[
                      styles.stBtnText,
                      { color: status === st ? '#FFF' : colors.textSecondary },
                    ]}
                  >
                    {st === 'pending'
                      ? 'Kutilmoqda'
                      : st === 'confirmed'
                      ? 'Tasdiqlangan'
                      : st === 'completed'
                      ? 'Bajarildi'
                      : 'Bekor qilingan'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <CustomButton title="Orqaga" onPress={() => setModalOpen(false)} variant="outline" size="md" />
              <CustomButton title="Saqlash" onPress={handleSaveModal} variant="primary" size="md" />
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
  list: {
    gap: 16,
  },
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(200, 16, 46, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    color: COLORS.kiaRed,
    fontSize: 12,
    fontWeight: '800',
  },
  cardBody: {
    gap: 8,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  valText: {
    fontSize: 13,
  },
  licenseText: {
    fontSize: 11,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    paddingTop: 12,
    flexWrap: 'wrap',
  },
  btnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  btnActionText: {
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
  fieldLbl: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  stBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(150,150,150,0.12)',
  },
  stBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
});
