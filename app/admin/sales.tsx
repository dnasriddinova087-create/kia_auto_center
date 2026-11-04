// Sales Management & Deal Closing System for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import {
  ShoppingBag,
  Plus,
  Search,
  Download,
  Calendar,
  DollarSign,
  User,
  Car,
  FileText,
  X,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { StatusBadge } from '../../components/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { SaleTransaction, Vehicle, CustomerRecord } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminSalesScreen() {
  const { colors, isDark } = useTheme();
  const { formatCurrency } = useLanguage();

  const [sales, setSales] = useState<SaleTransaction[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+998 ');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [basePrice, setBasePrice] = useState('');
  const [discount, setDiscount] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank_transfer' | 'auto_loan' | 'installment'>('auto_loan');
  const [salesManager, setSalesManager] = useState('Alisher Shodiyev');
  const [contractNumber, setContractNumber] = useState(`KIA-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await mockStore.getSales();
    setSales(s);
    const v = await mockStore.getVehicles();
    setVehicles(v);
    const c = await mockStore.getCustomers();
    setCustomers(c);
    if (v.length > 0 && !selectedVehicle) {
      setSelectedVehicle(v[0]);
      setBasePrice(String(v[0].basePriceUzs || v[0].priceStartingUzs));
    }
  };

  const handleOpenAdd = () => {
    setContractNumber(`KIA-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
    setCustomerName('');
    setCustomerPhone('+998 ');
    setDiscount('10000000');
    setNotes('Rasmiy 5 yillik kafolat va servis kitobi berildi');
    if (vehicles.length > 0) {
      setSelectedVehicle(vehicles[0]);
      setBasePrice(String(vehicles[0].basePriceUzs || vehicles[0].priceStartingUzs));
    }
    setModalOpen(true);
  };

  const handleSelectCar = (v: Vehicle) => {
    setSelectedVehicle(v);
    setBasePrice(String(v.basePriceUzs || v.priceStartingUzs));
  };

  const handleCreateSale = async () => {
    if (!customerName.trim() || !customerPhone.trim() || !selectedVehicle) return;

    const bPrice = Number(basePrice) || 400000000;
    const dVal = Number(discount) || 0;
    const finalPrice = Math.max(0, bPrice - dVal);

    await mockStore.createSale({
      contractNumber,
      customerName,
      customerPhone,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      basePriceUzs: bPrice,
      discountUzs: dVal,
      finalPriceUzs: finalPrice,
      paymentMethod,
      salesManager,
      status: 'completed',
      saleDate: new Date().toISOString().split('T')[0],
      notes,
    });

    await loadData();
    setModalOpen(false);
  };

  const handleExportCsv = () => {
    const headers = ['Shartnoma', 'Mijoz', 'Telefon', 'Model', 'Boshlangich_Narx', 'Chegirma', 'Yakuniy_Narx', 'Tolov_Turi', 'Menejer', 'Sana', 'Status'];
    const rows = sales.map((s) => [
      s.contractNumber,
      `"${s.customerName}"`,
      s.customerPhone,
      `"${s.vehicleName}"`,
      s.basePriceUzs,
      s.discountUzs,
      s.finalPriceUzs,
      s.paymentMethod,
      `"${s.salesManager}"`,
      s.saleDate,
      s.status,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `kia_sotuvlar_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const totalSalesVolume = sales.reduce((sum, s) => sum + s.finalPriceUzs, 0);

  const filtered = sales.filter((s) => {
    return (
      s.contractNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.vehicleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Sotuvlar Bo‘limi</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Jami tushum: <Text style={{ color: '#10B981', fontWeight: '800' }}>{formatCurrency(totalSalesVolume)}</Text> ({sales.length} ta rasmiylashtirilgan bitim)
          </Text>
        </View>

        <View style={styles.headerBtns}>
          <CustomButton
            title="CSV Eksport"
            onPress={handleExportCsv}
            variant="outline"
            size="md"
            icon={<Download size={16} color={colors.text} />}
          />
          <CustomButton
            title="Yangi Sotuv Yaratish"
            onPress={handleOpenAdd}
            variant="primary"
            size="md"
            icon={<Plus size={16} color="#FFFFFF" />}
          />
        </View>
      </View>

      {/* Filter and Search Bar */}
      <View style={[styles.filterBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.searchBox}>
          <CustomInput
            placeholder="Shartnoma raqami, mijoz yoki model bo‘yicha qidiruv..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={<Search size={18} color={colors.textMuted} />}
            style={{ marginBottom: 0 }}
          />
        </View>
      </View>

      {/* Sales List */}
      <View style={styles.list}>
        {filtered.map((sale) => (
          <View
            key={sale.id}
            style={[
              styles.saleCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.contractBadge}>
                <Text style={styles.contractText}>{sale.contractNumber}</Text>
              </View>

              <Text style={[styles.vehicleTitle, { color: colors.text }]}>
                {sale.vehicleName}
              </Text>

              <View style={{ marginLeft: 'auto' }}>
                <StatusBadge status={sale.status} />
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.detailItem}>
                <User size={14} color={colors.textSecondary} />
                <Text style={[styles.detailVal, { color: colors.text }]}>
                  {sale.customerName} ({sale.customerPhone})
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Calendar size={14} color={colors.textSecondary} />
                <Text style={[styles.detailVal, { color: colors.textSecondary }]}>
                  Bitim sanasi: {sale.saleDate}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <FileText size={14} color={colors.textSecondary} />
                <Text style={[styles.detailVal, { color: colors.textSecondary }]}>
                  Sotuv menejeri: {sale.salesManager} • To‘lov: {sale.paymentMethod.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Price Box */}
            <View style={[styles.priceBox, { backgroundColor: isDark ? '#1C1C1C' : '#F9FAFB' }]}>
              <View>
                <Text style={[styles.priceLbl, { color: colors.textSecondary }]}>Asosiy narx:</Text>
                <Text style={[styles.priceSubVal, { color: colors.textSecondary }]}>
                  {formatCurrency(sale.basePriceUzs)}
                </Text>
              </View>

              <View>
                <Text style={[styles.priceLbl, { color: colors.textSecondary }]}>Chegirma:</Text>
                <Text style={[styles.priceSubVal, { color: COLORS.danger }]}>
                  - {formatCurrency(sale.discountUzs)}
                </Text>
              </View>

              <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
                <Text style={[styles.priceLbl, { color: colors.textSecondary }]}>Yakuniy summa:</Text>
                <Text style={[styles.finalPriceText, { color: '#10B981' }]}>
                  {formatCurrency(sale.finalPriceUzs)}
                </Text>
              </View>
            </View>

            {sale.notes ? (
              <Text style={[styles.notesText, { color: colors.textSecondary }]}>
                {sale.notes}
              </Text>
            ) : null}
          </View>
        ))}
      </View>

      {/* Create Sale Modal */}
      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Yangi Sotuv Rasmiylashtirish
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <X size={20} color={colors.text} />
                </TouchableOpacity>
              </View>

              <CustomInput
                label="Shartnoma Raqami"
                placeholder="KIA-2026-001"
                value={contractNumber}
                onChangeText={setContractNumber}
              />

              <CustomInput
                label="Mijoz To‘liq Ismi"
                placeholder="Dilshod Ergashev"
                value={customerName}
                onChangeText={setCustomerName}
              />

              <CustomInput
                label="Mijoz Telefon Raqami"
                placeholder="+998 90 123 45 67"
                value={customerPhone}
                onChangeText={setCustomerPhone}
                keyboardType="phone-pad"
              />

              {/* Vehicle Selector */}
              <Text style={[styles.label, { color: colors.text }]}>Avtomobil Modelini Tanlang:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {vehicles.map((v) => {
                    const isSelected = selectedVehicle?.id === v.id;
                    return (
                      <TouchableOpacity
                        key={v.id}
                        onPress={() => handleSelectCar(v)}
                        style={[
                          styles.carSelectBtn,
                          isSelected && { backgroundColor: COLORS.kiaRed },
                        ]}
                      >
                        <Text
                          style={[
                            styles.carSelectText,
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

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <CustomInput
                    label="Asosiy Narx (UZS)"
                    value={basePrice}
                    onChangeText={setBasePrice}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomInput
                    label="Chegirma (UZS)"
                    value={discount}
                    onChangeText={setDiscount}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <CustomInput
                label="Sotuv Menejeri"
                value={salesManager}
                onChangeText={setSalesManager}
              />

              {/* Payment Method */}
              <Text style={[styles.label, { color: colors.text }]}>To‘lov Turi:</Text>
              <View style={styles.payMethodsRow}>
                {(['auto_loan', 'cash', 'bank_transfer', 'installment'] as const).map((pm) => (
                  <TouchableOpacity
                    key={pm}
                    onPress={() => setPaymentMethod(pm)}
                    style={[
                      styles.pmBtn,
                      paymentMethod === pm && { backgroundColor: COLORS.kiaRed },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pmBtnText,
                        { color: paymentMethod === pm ? '#FFF' : colors.textSecondary },
                      ]}
                    >
                      {pm === 'auto_loan'
                        ? 'Avtokredit'
                        : pm === 'cash'
                        ? 'Naqd'
                        : pm === 'bank_transfer'
                        ? 'Bank o‘tkazmasi'
                        : 'Muddatli to‘lov'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <CustomInput
                label="Shartnoma Izohi"
                placeholder="5 yillik zavod kafolati, bepul TO-1 kuponi berildi"
                value={notes}
                onChangeText={setNotes}
              />

              <View style={styles.modalActions}>
                <CustomButton title="Bekor qilish" onPress={() => setModalOpen(false)} variant="outline" size="md" />
                <CustomButton title="Bitimni Tasdiqlash" onPress={handleCreateSale} variant="primary" size="md" />
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
  headerBtns: {
    flexDirection: 'row',
    gap: 10,
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
  },
  searchBox: {
    width: '100%',
  },
  list: {
    gap: 16,
  },
  saleCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  contractBadge: {
    backgroundColor: 'rgba(200, 16, 46, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  contractText: {
    color: COLORS.kiaRed,
    fontSize: 11,
    fontWeight: '800',
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  cardBody: {
    gap: 6,
    marginBottom: 14,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailVal: {
    fontSize: 13,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: RADIUS.md,
    gap: 20,
  },
  priceLbl: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  priceSubVal: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  finalPriceText: {
    fontSize: 17,
    fontWeight: '900',
    marginTop: 2,
  },
  notesText: {
    fontSize: 12,
    marginTop: 10,
    fontStyle: 'italic',
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
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  carSelectBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(150,150,150,0.12)',
  },
  carSelectText: {
    fontSize: 12,
    fontWeight: '700',
  },
  payMethodsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  pmBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(150,150,150,0.12)',
  },
  pmBtnText: {
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

