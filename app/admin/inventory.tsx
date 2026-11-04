// Dealership Inventory & Stock Movements Management
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
  Package,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  Search,
  Car,
  X,
  CheckCircle2,
} from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { mockStore } from '../../lib/mockStore';
import { Vehicle, InventoryMovement } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminInventoryScreen() {
  const { colors, isDark } = useTheme();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [color, setColor] = useState('Snow White Pearl');
  const [quantity, setQuantity] = useState('5');
  const [moveType, setMoveType] = useState<'arrival' | 'sale' | 'reservation'>('arrival');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const v = await mockStore.getVehicles();
    setVehicles(v);
    const m = await mockStore.getInventoryMovements();
    setMovements(m);
    if (v.length > 0 && !selectedVehicle) {
      setSelectedVehicle(v[0]);
    }
  };

  const handleAddMovement = async () => {
    if (!selectedVehicle) return;

    const qty = Number(quantity) || 1;
    const currentStock = selectedVehicle.stockQuantity || 4;
    const newStock = moveType === 'arrival' ? currentStock + qty : Math.max(0, currentStock - qty);

    await mockStore.addInventoryMovement({
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      color,
      type: moveType,
      quantity: qty,
      previousStock: currentStock,
      newStock,
      performedBy: 'Nasriddinova Dilfuza',
    });

    await mockStore.updateVehicle(selectedVehicle.id, { stockQuantity: newStock });
    await loadData();
    setModalOpen(false);
  };

  const totalStock = vehicles.reduce((sum, v) => sum + (v.stockQuantity || 4), 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Ombor va Zaxira Nazorati</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Jami ombordagi avtomobillar soni: <Text style={{ color: COLORS.kiaRed, fontWeight: '800' }}>{totalStock} ta</Text>
          </Text>
        </View>

        <CustomButton
          title="Kirim / Chiqim Kiritish"
          onPress={() => setModalOpen(true)}
          variant="primary"
          size="md"
          icon={<Plus size={16} color="#FFFFFF" />}
        />
      </View>

      {/* Stock Cards by Model */}
      <View style={styles.stockGrid}>
        {vehicles.map((v) => {
          const qty = v.stockQuantity || 4;
          return (
            <View
              key={v.id}
              style={[
                styles.stockCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.stockCardHeader}>
                <Car size={18} color={COLORS.kiaRed} />
                <Text style={[styles.modelName, { color: colors.text }]}>{v.name}</Text>
              </View>

              <View style={styles.stockCountRow}>
                <Text style={[styles.stockBigNum, { color: qty > 0 ? '#10B981' : '#EF4444' }]}>
                  {qty}
                </Text>
                <Text style={[styles.stockUnit, { color: colors.textSecondary }]}>dona mavjud</Text>
              </View>

              <View style={styles.colorPills}>
                <Text style={[styles.colorLabel, { color: colors.textSecondary }]}>
                  Kuzov: {v.bodyType.toUpperCase()}
                </Text>
                <View
                  style={[
                    styles.availBadge,
                    { backgroundColor: qty > 2 ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)' },
                  ]}
                >
                  <Text
                    style={[
                      styles.availText,
                      { color: qty > 2 ? '#10B981' : '#F59E0B' },
                    ]}
                  >
                    {qty > 2 ? 'Yetarli zaxira' : 'Kam qoldi'}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Movement History Log */}
      <View style={[styles.historyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.historyHeader}>
          <Package size={18} color={COLORS.kiaRed} />
          <Text style={[styles.historyTitle, { color: colors.text }]}>
            Ombor Harakati Tarixi (Log)
          </Text>
        </View>

        <View style={styles.historyList}>
          {movements.map((m) => (
            <View key={m.id} style={styles.movementItem}>
              <View
                style={[
                  styles.moveIconWrap,
                  {
                    backgroundColor:
                      m.type === 'arrival'
                        ? 'rgba(16,185,129,0.15)'
                        : 'rgba(239,68,68,0.15)',
                  },
                ]}
              >
                {m.type === 'arrival' ? (
                  <ArrowDownLeft size={16} color="#10B981" />
                ) : (
                  <ArrowUpRight size={16} color="#EF4444" />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[styles.moveTitle, { color: colors.text }]}>
                  {m.type === 'arrival' ? 'Zavoddan yangi partiya kirimi' : 'Mijozga sotuv rasmiylashtirildi'}: {m.vehicleName}
                </Text>
                <Text style={[styles.moveSub, { color: colors.textSecondary }]}>
                  Rang: {m.color} • Mas’ul: {m.performedBy} • {new Date(m.createdAt).toLocaleDateString()}
                </Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={[
                    styles.moveQty,
                    { color: m.type === 'arrival' ? '#10B981' : '#EF4444' },
                  ]}
                >
                  {m.type === 'arrival' ? `+${m.quantity}` : `-${m.quantity}`} dona
                </Text>
                <Text style={[styles.moveStockChange, { color: colors.textMuted }]}>
                  {m.previousStock} → {m.newStock} dona
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Movement Modal */}
      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Ombor Harakatini Kiritish</Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <X size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.fieldLbl, { color: colors.text }]}>Amal Turi:</Text>
            <View style={styles.typesRow}>
              {(['arrival', 'sale', 'reservation'] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setMoveType(t)}
                  style={[
                    styles.typeBtn,
                    moveType === t && { backgroundColor: COLORS.kiaRed },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeBtnText,
                      { color: moveType === t ? '#FFF' : colors.textSecondary },
                    ]}
                  >
                    {t === 'arrival' ? 'KIRIM (+)' : t === 'sale' ? 'SOTUV (-)' : 'BRON'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.fieldLbl, { color: colors.text }]}>Avtomobil:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {vehicles.map((v) => {
                  const isSelected = selectedVehicle?.id === v.id;
                  return (
                    <TouchableOpacity
                      key={v.id}
                      onPress={() => setSelectedVehicle(v)}
                      style={[
                        styles.carBtn,
                        isSelected && { backgroundColor: COLORS.kiaRed },
                      ]}
                    >
                      <Text
                        style={[
                          styles.carBtnText,
                          { color: isSelected ? '#FFF' : colors.textSecondary },
                        ]}
                      >
                        {v.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <CustomInput label="Kuzov Rangi" placeholder="Snow White Pearl" value={color} onChangeText={setColor} />
            <CustomInput label="Miqdor (dona)" placeholder="5" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />

            <View style={styles.modalActions}>
              <CustomButton title="Bekor qilish" onPress={() => setModalOpen(false)} variant="outline" size="md" />
              <CustomButton title="Tasdiqlash" onPress={handleAddMovement} variant="primary" size="md" />
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
  stockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 28,
  },
  stockCard: {
    width: 200,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 16,
  },
  stockCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  modelName: {
    fontSize: 14,
    fontWeight: '800',
  },
  stockCountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginVertical: 4,
  },
  stockBigNum: {
    fontSize: 32,
    fontWeight: '900',
  },
  stockUnit: {
    fontSize: 11,
  },
  colorPills: {
    marginTop: 8,
    gap: 4,
  },
  colorLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  availBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  availText: {
    fontSize: 10,
    fontWeight: '800',
  },
  historyCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  historyList: {
    gap: 14,
  },
  movementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.08)',
  },
  moveIconWrap: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  moveSub: {
    fontSize: 11,
    marginTop: 2,
  },
  moveQty: {
    fontSize: 14,
    fontWeight: '800',
  },
  moveStockChange: {
    fontSize: 10,
    marginTop: 2,
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
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  fieldLbl: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  typesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  typeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(150,150,150,0.12)',
  },
  typeBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  carBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(150,150,150,0.12)',
  },
  carBtnText: {
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
