// Admin Vehicles Fleet Management & CRUD
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Plus, Trash2, Edit2, Check, X, Car } from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { StatusBadge } from '../../components/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { Vehicle } from '../../constants/vehicles';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminVehiclesScreen() {
  const { colors, isDark } = useTheme();
  const { t, formatCurrency } = useLanguage();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [bodyType, setBodyType] = useState<'sedan' | 'suv' | 'crossover' | 'minivan' | 'commercial'>('sedan');
  const [imageUrl, setImageUrl] = useState('');
  const [powerHp, setPowerHp] = useState('150');
  const [engineCap, setEngineCap] = useState('2.0');
  const [trans, setTrans] = useState('6 AT');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const list = await mockStore.getVehicles();
    setVehicles([...list]);
  };

  const handleOpenAdd = () => {
    setEditingVehicle(null);
    setName('');
    setBasePrice('');
    setBodyType('sedan');
    setImageUrl('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80');
    setPowerHp('150');
    setEngineCap('2.0');
    setTrans('8 AT');
    setModalOpen(true);
  };

  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setName(v.name);
    setBasePrice(String(v.basePriceUzs));
    setBodyType(v.bodyType);
    setImageUrl(v.mainImage);
    setPowerHp(String(v.specs.powerHp));
    setEngineCap(String(v.specs.engineCapacity));
    setTrans(v.specs.transmission);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim() || !basePrice.trim()) return;

    const carData: Vehicle = editingVehicle
      ? {
          ...editingVehicle,
          name,
          basePriceUzs: Number(basePrice),
          bodyType,
          mainImage: imageUrl,
          specs: {
            ...editingVehicle.specs,
            powerHp: Number(powerHp) || 150,
            engineCapacity: Number(engineCap) || 2.0,
            transmission: trans,
          },
        }
      : {
          id: `kia-${Date.now()}`,
          name,
          modelCode: name.toLowerCase().replace(/\s+/g, '-'),
          year: 2026,
          bodyType,
          basePriceUzs: Number(basePrice),
          status: 'available',
          isFeatured: true,
          isSpecialOffer: false,
          warrantyYears: 5,
          warrantyKm: 150000,
          mainImage: imageUrl,
          gallery: [imageUrl],
          tagline: {
            uz: `${name} — O‘zbekistondagi rasmiy kafolatlangan yangi avtomobil`,
            ru: `${name} — Новый автомобиль с официальной гарантией`,
            en: `${name} — Brand new official vehicle with full warranty`,
          },
          description: {
            uz: `${name} yuqori qulaylik va xavfsizlik standartlariga ega zamonaviy avtomobil.`,
            ru: `${name} — современный автомобиль с высокими стандартами безопасности.`,
            en: `${name} — modern vehicle engineered with premium comfort and safety.`,
          },
          specs: {
            engineCapacity: Number(engineCap) || 2.0,
            powerHp: Number(powerHp) || 150,
            torqueNm: 200,
            fuelType: 'petrol',
            transmission: trans,
            driveType: 'FWD',
            acceleration0100: 9.8,
            topSpeedKmh: 195,
            fuelConsumptionCombined: 7.2,
            lengthMm: 4650,
            widthMm: 1820,
            heightMm: 1460,
            wheelbaseMm: 2750,
            groundClearanceMm: 160,
            trunkCapacityLiters: 480,
          },
          trims: [
            {
              id: `trim-comfort-${Date.now()}`,
              name: 'Comfort',
              priceUzs: Number(basePrice),
              inStock: true,
              features: {
                uz: ['Konditsioner', 'LED chiroqlar', 'Kruiz-kontrol'],
                ru: ['Кондиционер', 'LED оптика', 'Круиз-контроль'],
                en: ['Air conditioning', 'LED DRL', 'Cruise control'],
              },
            },
          ],
        };

    await mockStore.saveVehicle(carData);
    await loadVehicles();
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await mockStore.deleteVehicle(id);
    await loadVehicles();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('adminVehicles')} ({vehicles.length})
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Barcha KIA modellarini tahrirlash, narxlarni o‘zgartirish va yangi avtomobil qo‘shish
            </Text>
          </View>

          <CustomButton
            title={t('addNewCar')}
            onPress={handleOpenAdd}
            variant="primary"
            size="md"
            icon={<Plus size={16} color="#FFFFFF" />}
          />
        </View>

        {/* Vehicle List */}
        <View style={styles.list}>
          {vehicles.map((v) => (
            <View
              key={v.id}
              style={[
                styles.itemCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Image source={{ uri: v.mainImage }} style={styles.thumb} resizeMode="cover" />

              <View style={styles.infoCol}>
                <View style={styles.nameRow}>
                  <Text style={[styles.name, { color: colors.text }]}>{v.name}</Text>
                  <StatusBadge status={v.status} />
                </View>

                <Text style={[styles.price, { color: COLORS.kiaRed }]}>
                  {formatCurrency(v.basePriceUzs)}
                </Text>

                <Text style={[styles.specsText, { color: colors.textSecondary }]}>
                  {v.year} • {v.bodyType.toUpperCase()} • {v.specs.engineCapacity}L • {v.specs.powerHp} HP • {v.specs.transmission}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => handleOpenEdit(v)}
                  style={[styles.actionBtn, { backgroundColor: isDark ? '#2E2E2E' : '#E5E7EB' }]}
                >
                  <Edit2 size={16} color={colors.text} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDelete(v.id)}
                  style={[styles.actionBtn, { backgroundColor: '#FEE2E2' }]}
                >
                  <Trash2 size={16} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Add / Edit Vehicle Modal */}
      <Modal visible={modalOpen} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {editingVehicle ? t('editCar') : t('addNewCar')}
              </Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <X size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 460 }}>
              <CustomInput
                label="Model nomi (masalan: KIA K5)"
                value={name}
                onChangeText={setName}
              />
              <CustomInput
                label="Boshlang‘ich narx (so‘m)"
                value={basePrice}
                onChangeText={setBasePrice}
                keyboardType="numeric"
              />
              <CustomInput
                label="Rasm manzili (URL)"
                value={imageUrl}
                onChangeText={setImageUrl}
              />
              <CustomInput
                label="Dvigatel hajmi (L)"
                value={engineCap}
                onChangeText={setEngineCap}
              />
              <CustomInput
                label="Dvigatel quvvati (ot kuchi)"
                value={powerHp}
                onChangeText={setPowerHp}
                keyboardType="numeric"
              />
              <CustomInput
                label="Uzatmalar qutisi"
                value={trans}
                onChangeText={setTrans}
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <CustomButton
                title={t('cancel')}
                onPress={() => setModalOpen(false)}
                variant="outline"
                size="md"
                style={{ flex: 1 }}
              />
              <CustomButton
                title={t('saveChanges')}
                onPress={handleSave}
                variant="primary"
                size="md"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    flexWrap: 'wrap',
    gap: 12,
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
    gap: 14,
  },
  itemCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  thumb: {
    width: 120,
    height: 75,
    borderRadius: RADIUS.md,
  },
  infoCol: {
    flex: 1,
    minWidth: 200,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  specsText: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    padding: 10,
    borderRadius: RADIUS.md,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalBox: {
    width: '100%',
    maxWidth: 520,
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
    fontWeight: '800',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
});
