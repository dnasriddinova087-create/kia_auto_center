// Official Dealership Workshop & Service Operations
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  Wrench,
  Phone,
  Calendar,
  Check,
  X,
  Building,
  Car,
  User,
  DollarSign,
  Edit2,
  Clock,
} from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { StatusBadge } from '../../components/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { ServiceRequest } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminServiceScreen() {
  const { colors, isDark } = useTheme();
  const { formatCurrency } = useLanguage();

  const [services, setServices] = useState<ServiceRequest[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceRequest | null>(null);

  // Edit fields
  const [technician, setTechnician] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [status, setStatus] = useState<ServiceRequest['status']>('in_progress');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const list = await mockStore.getServices();
    setServices([...list]);
  };

  const handleOpenEdit = (srv: ServiceRequest) => {
    setSelectedService(srv);
    setTechnician(srv.technicianName || 'Bobur Rustamov (Bosh usta)');
    setEstimatedCost(String(srv.estimatedCostUzs || 1500000));
    setStatus(srv.status);
    setNotes(srv.notes || '');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedService) return;
    await mockStore.updateService(selectedService.id, {
      technicianName: technician,
      estimatedCostUzs: Number(estimatedCost) || 0,
      status,
      notes,
    });
    await loadServices();
    setModalOpen(false);
  };

  const statusOptions: { id: ServiceRequest['status']; label: string }[] = [
    { id: 'new', label: 'Yangi' },
    { id: 'accepted', label: 'Qabul qilindi' },
    { id: 'in_progress', label: 'Jarayonda' },
    { id: 'waiting_parts', label: 'Ehtiyot qism kutilmoqda' },
    { id: 'ready', label: 'Tayyor' },
    { id: 'delivered', label: 'Topshirildi' },
    { id: 'cancelled', label: 'Bekor qilindi' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            Servis Markazi Boshqaruvi
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Jami {services.length} ta texnik xizmat, TO va ta’mirlash navbatlari
          </Text>
        </View>
      </View>

      {/* Services List */}
      <View style={styles.list}>
        {services.map((srv) => (
          <View
            key={srv.id}
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.badgeWrap}>
                <Wrench size={16} color={COLORS.kiaRed} />
                <Text style={styles.badgeText}>{srv.serviceType}</Text>
              </View>

              <StatusBadge status={srv.status} />
            </View>

            <View style={styles.cardBody}>
              <View style={styles.detailRow}>
                <Car size={16} color={colors.textSecondary} />
                <Text style={[styles.vehicleModel, { color: colors.text }]}>
                  {srv.vehicleModel}
                </Text>
                {srv.licensePlate && (
                  <View style={styles.plateWrap}>
                    <Text style={styles.plateText}>{srv.licensePlate}</Text>
                  </View>
                )}
                {srv.vin && (
                  <Text style={[styles.vinText, { color: colors.textMuted }]}>
                    VIN: {srv.vin}
                  </Text>
                )}
              </View>

              <View style={styles.detailRow}>
                <User size={14} color={colors.textSecondary} />
                <Text style={[styles.detailVal, { color: colors.text }]}>
                  {srv.fullName}
                </Text>
                <Phone size={14} color={colors.textSecondary} style={{ marginLeft: 8 }} />
                <Text style={[styles.detailVal, { color: colors.textSecondary }]}>
                  {srv.phone}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Building size={14} color={colors.textSecondary} />
                <Text style={[styles.detailVal, { color: colors.textSecondary }]}>
                  {srv.branchName}
                </Text>
                <Calendar size={14} color={colors.textSecondary} style={{ marginLeft: 8 }} />
                <Text style={[styles.detailVal, { color: colors.textSecondary }]}>
                  {srv.preferredDate} ({srv.preferredTime})
                </Text>
              </View>

              {srv.technicianName && (
                <View style={styles.detailRow}>
                  <Text style={[styles.techLbl, { color: colors.textSecondary }]}>
                    Mas’ul Usta: <Text style={{ color: colors.text, fontWeight: '700' }}>{srv.technicianName}</Text>
                  </Text>
                  {srv.estimatedCostUzs && (
                    <Text style={[styles.costVal, { color: '#10B981', marginLeft: 'auto' }]}>
                      Xizmat narxi: {formatCurrency(srv.estimatedCostUzs)}
                    </Text>
                  )}
                </View>
              )}

              {srv.notes && (
                <Text style={[styles.notesText, { color: colors.textSecondary }]}>
                  Izoh: {srv.notes}
                </Text>
              )}
            </View>

            <View style={styles.cardFooter}>
              <TouchableOpacity
                onPress={() => handleOpenEdit(srv)}
                style={[styles.btnEdit, { backgroundColor: COLORS.kiaRed }]}
              >
                <Edit2 size={13} color="#FFFFFF" />
                <Text style={styles.btnEditText}>Usta va Statusni Boshqarish</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Modal */}
      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Servis Buyurtmasini Tahrirlash
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <X size={20} color={colors.text} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.label, { color: colors.text }]}>Buyurtma Holati:</Text>
              <View style={styles.statusGrid}>
                {statusOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt.id}
                    onPress={() => setStatus(opt.id)}
                    style={[
                      styles.optBtn,
                      status === opt.id && { backgroundColor: COLORS.kiaRed },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optBtnText,
                        { color: status === opt.id ? '#FFF' : colors.textSecondary },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <CustomInput
                label="Biriktirilgan Usta / Mutaxassis"
                placeholder="Bobur Rustamov (Bosh usta)"
                value={technician}
                onChangeText={setTechnician}
              />

              <CustomInput
                label="Xizmat Narxi (UZS)"
                placeholder="1500000"
                value={estimatedCost}
                onChangeText={setEstimatedCost}
                keyboardType="numeric"
              />

              <CustomInput
                label="Bajarilgan ishlar va ehtiyot qismlar"
                placeholder="Moy almashtirildi, tormoz kolodkalari yangilandi..."
                value={notes}
                onChangeText={setNotes}
              />

              <View style={styles.modalActions}>
                <CustomButton title="Bekor qilish" onPress={() => setModalOpen(false)} variant="outline" size="md" />
                <CustomButton title="Saqlash" onPress={handleSave} variant="primary" size="md" />
              </View>
            </View>
          </ScrollView>
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
    marginBottom: 14,
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(200, 16, 46, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  vehicleModel: {
    fontSize: 15,
    fontWeight: '800',
  },
  plateWrap: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444',
  },
  plateText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  vinText: {
    fontSize: 11,
  },
  detailVal: {
    fontSize: 13,
  },
  techLbl: {
    fontSize: 12,
  },
  costVal: {
    fontSize: 13,
    fontWeight: '800',
  },
  notesText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    paddingTop: 12,
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
  modalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  label: {
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
  optBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(150,150,150,0.12)',
  },
  optBtnText: {
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
