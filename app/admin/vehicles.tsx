// Admin Vehicles Fleet Management & Full CRUD
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
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Car,
  Search,
  Filter,
  Eye,
  EyeOff,
  PackageCheck,
} from 'lucide-react-native';
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
  const { formatCurrency } = useLanguage();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [year, setYear] = useState('2026');
  const [trimName, setTrimName] = useState('Prestige');
  const [basePrice, setBasePrice] = useState('');
  const [discountUzs, setDiscountUzs] = useState('0');
  const [bodyType, setBodyType] = useState<'sedan' | 'suv' | 'crossover' | 'minivan' | 'commercial'>('sedan');
  const [imageUrl, setImageUrl] = useState('');
  const [powerHp, setPowerHp] = useState('180');
  const [engineCap, setEngineCap] = useState('2.5');
  const [trans, setTrans] = useState('8-bosqichli avtomat');
  const [fuelType, setFuelType] = useState('Benzin');
  const [colorName, setColorName] = useState('Snow White Pearl');
  const [stockCount, setStockCount] = useState('5');
  const [status, setStatus] = useState<'available' | 'reserved' | 'sold' | 'hidden'>('available');

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
    setYear('2026');
    setTrimName('GT Line');
    setBasePrice('450000000');
    setDiscountUzs('15000000');
    setBodyType('sedan');
    setImageUrl('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80');
    setPowerHp('194');
    setEngineCap('2.5');
    setTrans('8-bosqichli avtomat');
    setFuelType('Benzin (AI-95)');
    setColorName('Snow White Pearl');
    setStockCount('5');
    setStatus('available');
    setModalOpen(true);
  };

  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setName(v.name);
    setYear(String(v.year || 2026));
    setTrimName(v.trims?.[0]?.name || 'Prestige');
    setBasePrice(String(v.basePriceUzs || v.priceStartingUzs));
    setDiscountUzs(String(v.discountUzs || 0));
    setBodyType(v.bodyType);
    setImageUrl(v.mainImage);
    setPowerHp(String(v.specs.powerHp || v.specs.horsepower || 150));
    setEngineCap(String(v.specs.engineCapacity || v.specs.displacementLiters || '2.0'));
    setTrans(v.specs.transmission);
    setFuelType(v.specs.fuelType || 'Benzin');
    setColorName(v.colors?.[0]?.name?.uz || 'Snow White Pearl');
    setStockCount(String(v.stockQuantity || 4));
    setStatus((v.status as any) || 'available');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim() || !basePrice.trim()) return;

    if (editingVehicle) {
      await mockStore.updateVehicle(editingVehicle.id, {
        name,
        year: Number(year) || 2026,
        bodyType,
        basePriceUzs: Number(basePrice),
        priceStartingUzs: Number(basePrice),
        mainImage: imageUrl,
        status: status as any,
        stockQuantity: Number(stockCount) || 1,
        discountUzs: Number(discountUzs) || 0,
        specs: {
          ...editingVehicle.specs,
          powerHp: Number(powerHp) || 150,
          horsepower: Number(powerHp) || 150,
          engineCapacity: Number(engineCap) || 2.0,
          transmission: trans,
        },
      });
    } else {
      const newCar: Vehicle = {
        id: `kia-${Date.now()}`,
        name,
        modelCode: name.toLowerCase().replace(/\s+/g, '-'),
        year: Number(year) || 2026,
        bodyType,
        basePriceUzs: Number(basePrice),
        priceStartingUzs: Number(basePrice),
        status: status as any,
        isFeatured: true,
        isSpecialOffer: false,
        warrantyYears: 5,
        warrantyKm: 150000,
        stockQuantity: Number(stockCount) || 5,
        discountUzs: Number(discountUzs) || 0,
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
          engineCapacity: Number(engineCap) || 2.5,
          displacementLiters: Number(engineCap) || 2.5,
          powerHp: Number(powerHp) || 190,
          horsepower: Number(powerHp) || 190,
          torqueNm: 246,
          fuelType,
          transmission: trans,
          driveType: 'FWD',
          acceleration0100: 8.6,
          topSpeedKmh: 210,
          fuelConsumptionCombined: 7.2,
          lengthMm: 4905,
          widthMm: 1860,
          heightMm: 1445,
          wheelbaseMm: 2850,
          groundClearanceMm: 155,
          trunkCapacityLiters: 510,
        },
        trims: [
          {
            id: `trim-${Date.now()}`,
            name: trimName,
            priceUzs: Number(basePrice),
            inStock: true,
            features: {
              uz: ['Konditsioner', 'LED chiroqlar', 'Kruiz-kontrol', '12.3 dyuym ekran'],
              ru: ['Кондиционер', 'LED оптика', 'Круиз-контроль', 'Экран 12.3 дюйма'],
              en: ['Air conditioning', 'LED DRL', 'Cruise control', '12.3 inch display'],
            },
          },
        ],
      };
      await mockStore.addVehicle(newCar);
    }

    await loadVehicles();
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await mockStore.deleteVehicle(id);
    await loadVehicles();
  };

  const handleToggleStatus = async (v: Vehicle, newStatus: any) => {
    await mockStore.updateVehicle(v.id, { status: newStatus });
    await loadVehicles();
  };

  const filtered = vehicles.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || v.status === selectedFilter || v.bodyType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Top Controls */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Avtomobillar Floti</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Jami {vehicles.length} ta KIA modellari katalogda faol
          </Text>
        </View>

        <CustomButton
          title="Yangi KIA Qo‘shish"
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
            placeholder="Model nomi bo‘yicha qidiruv (K5, Sportage...)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={<Search size={18} color={colors.textMuted} />}
            style={{ marginBottom: 0 }}
          />
        </View>

        <View style={styles.filterPills}>
          {['all', 'available', 'reserved', 'sold', 'sedan', 'crossover', 'suv'].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setSelectedFilter(f)}
              style={[
                styles.filterBtn,
                selectedFilter === f && { backgroundColor: COLORS.kiaRed },
              ]}
            >
              <Text
                style={[
                  styles.filterBtnText,
                  { color: selectedFilter === f ? '#FFF' : colors.textSecondary },
                ]}
              >
                {f.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Vehicle Cards Grid */}
      <View style={styles.grid}>
        {filtered.map((v) => (
          <View
            key={v.id}
            style={[
              styles.vehicleCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Image source={{ uri: v.mainImage }} style={styles.cardImage} resizeMode="cover" />

            <View style={styles.cardBody}>
              <View style={styles.rowBetween}>
                <Text style={[styles.vehicleName, { color: colors.text }]}>{v.name}</Text>
                <StatusBadge status={v.status} />
              </View>

              <Text style={[styles.vehiclePrice, { color: COLORS.kiaRed }]}>
                {formatCurrency(v.basePriceUzs || v.priceStartingUzs)}
              </Text>

              <View style={styles.specsRow}>
                <Text style={[styles.specTag, { color: colors.textSecondary }]}>
                  {v.bodyType.toUpperCase()}
                </Text>
                <Text style={[styles.specTag, { color: colors.textSecondary }]}>
                  {v.specs.powerHp || v.specs.horsepower} OT KUCHI
                </Text>
                <Text style={[styles.specTag, { color: colors.textSecondary }]}>
                  {v.specs.transmission}
                </Text>
              </View>

              {/* Quick Status and Actions */}
              <View style={styles.cardActions}>
                <TouchableOpacity
                  onPress={() => handleOpenEdit(v)}
                  style={[styles.actionBtn, { backgroundColor: isDark ? '#222' : '#F3F4F6' }]}
                >
                  <Edit2 size={14} color={colors.text} />
                  <Text style={[styles.actionBtnText, { color: colors.text }]}>Tahrirlash</Text>
                </TouchableOpacity>

                {v.status === 'available' ? (
                  <TouchableOpacity
                    onPress={() => handleToggleStatus(v, 'sold')}
                    style={[styles.actionBtn, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}
                  >
                    <Check size={14} color="#3B82F6" />
                    <Text style={[styles.actionBtnText, { color: '#3B82F6' }]}>Sotilgan deb belgilash</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleToggleStatus(v, 'available')}
                    style={[styles.actionBtn, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}
                  >
                    <Check size={14} color="#10B981" />
                    <Text style={[styles.actionBtnText, { color: '#10B981' }]}>Sotuvga chiqarish</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => handleDelete(v.id)}
                  style={[styles.deleteBtn, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}
                >
                  <Trash2 size={14} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Add / Edit Vehicle Modal */}
      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  {editingVehicle ? 'Avtomobilni Tahrirlash' : 'Yangi KIA Avtomobil Qo‘shish'}
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <X size={20} color={colors.text} />
                </TouchableOpacity>
              </View>

              <CustomInput label="Model Nomi" placeholder="KIA K5" value={name} onChangeText={setName} />
              <CustomInput label="Yili" placeholder="2026" value={year} onChangeText={setYear} keyboardType="numeric" />
              <CustomInput label="Komplektatsiya" placeholder="GT Line+" value={trimName} onChangeText={setTrimName} />
              <CustomInput label="Narxi (UZS)" placeholder="468000000" value={basePrice} onChangeText={setBasePrice} keyboardType="numeric" />
              <CustomInput label="Chegirma (UZS)" placeholder="15000000" value={discountUzs} onChangeText={setDiscountUzs} keyboardType="numeric" />
              <CustomInput label="Rasm Havolasi (URL)" placeholder="https://..." value={imageUrl} onChangeText={setImageUrl} />

              <View style={styles.modalRow}>
                <View style={{ flex: 1 }}>
                  <CustomInput label="Ot Kuchi" placeholder="194" value={powerHp} onChangeText={setPowerHp} keyboardType="numeric" />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomInput label="Dvigatel Hajmi (L)" placeholder="2.5" value={engineCap} onChangeText={setEngineCap} />
                </View>
              </View>

              <View style={styles.modalRow}>
                <View style={{ flex: 1 }}>
                  <CustomInput label="Transmissiya" placeholder="8 AT" value={trans} onChangeText={setTrans} />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomInput label="Ombordagi Soni" placeholder="5" value={stockCount} onChangeText={setStockCount} keyboardType="numeric" />
                </View>
              </View>

              {/* Status Selector */}
              <Text style={[styles.fieldLabel, { color: colors.text }]}>Mavjudlik Holati:</Text>
              <View style={styles.statusGroup}>
                {(['available', 'reserved', 'sold', 'hidden'] as const).map((st) => (
                  <TouchableOpacity
                    key={st}
                    onPress={() => setStatus(st)}
                    style={[
                      styles.statusOption,
                      status === st && { backgroundColor: COLORS.kiaRed },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusOptionText,
                        { color: status === st ? '#FFF' : colors.textSecondary },
                      ]}
                    >
                      {st.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  filterBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  vehicleCard: {
    width: 320,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardBody: {
    padding: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '800',
  },
  vehiclePrice: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  specsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  specTag: {
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: 'rgba(150,150,150,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    paddingTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  deleteBtn: {
    padding: 6,
    borderRadius: RADIUS.sm,
    marginLeft: 'auto',
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
    maxWidth: 540,
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
  modalRow: {
    flexDirection: 'row',
    gap: 12,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 4,
  },
  statusGroup: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  statusOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(150,150,150,0.15)',
  },
  statusOptionText: {
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
