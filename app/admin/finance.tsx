// Credit, Auto-Loan Programs & Special Financial Offers
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
  CircleDollarSign,
  Plus,
  Percent,
  Calendar,
  Building2,
  CheckCircle,
  X,
  Edit2,
  Tag,
} from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore } from '../../lib/mockStore';
import { FinanceOffer } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminFinanceScreen() {
  const { colors, isDark } = useTheme();
  const { formatCurrency } = useLanguage();

  const [offers, setOffers] = useState<FinanceOffer[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<FinanceOffer | null>(null);

  // Form State
  const [bankName, setBankName] = useState('');
  const [title, setTitle] = useState('');
  const [interestRate, setInterestRate] = useState('17.5');
  const [downPayment, setDownPayment] = useState('20');
  const [maxMonths, setMaxMonths] = useState('60');
  const [specialDiscount, setSpecialDiscount] = useState('15000000');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('2026-12-31');

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    const list = await mockStore.getFinanceOffers();
    setOffers(list);
  };

  const handleOpenAdd = () => {
    setSelectedOffer(null);
    setBankName('Ipak Yo‘li Banki');
    setTitle('Yangi Imtiyozli Avtokredit Dasturi');
    setInterestRate('18.0');
    setDownPayment('20');
    setMaxMonths('60');
    setSpecialDiscount('10000000');
    setDescription('Faqat pasport bilan, boshlang‘ich 20% to‘lov asosida tezkor rasmiylashtirish.');
    setExpiryDate('2026-12-31');
    setModalOpen(true);
  };

  const handleOpenEdit = (fo: FinanceOffer) => {
    setSelectedOffer(fo);
    setBankName(fo.bankName);
    setTitle(fo.title);
    setInterestRate(String(fo.interestRatePct));
    setDownPayment(String(fo.minDownPaymentPct));
    setMaxMonths(String(fo.maxTermMonths));
    setSpecialDiscount(String(fo.specialDiscountUzs || 0));
    setDescription(fo.description);
    setExpiryDate(fo.expiryDate);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!bankName.trim() || !title.trim()) return;

    if (selectedOffer) {
      await mockStore.updateFinanceOffer(selectedOffer.id, {
        bankName,
        title,
        interestRatePct: Number(interestRate) || 18,
        minDownPaymentPct: Number(downPayment) || 20,
        maxTermMonths: Number(maxMonths) || 60,
        specialDiscountUzs: Number(specialDiscount) || 0,
        description,
        expiryDate,
      });
    } else {
      await mockStore.addFinanceOffer({
        bankName,
        title,
        interestRatePct: Number(interestRate) || 18,
        minDownPaymentPct: Number(downPayment) || 20,
        maxTermMonths: Number(maxMonths) || 60,
        specialDiscountUzs: Number(specialDiscount) || 0,
        description,
        isActive: true,
        expiryDate,
      });
    }

    await loadOffers();
    setModalOpen(false);
  };

  const handleToggleActive = async (fo: FinanceOffer) => {
    await mockStore.updateFinanceOffer(fo.id, { isActive: !fo.isActive });
    await loadOffers();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Kredit va Moliya Takliflari</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Hamkor banklar kredit dasturlari va avtokredit foiz stavkalarini boshqarish
          </Text>
        </View>

        <CustomButton
          title="Yangi Kredit Dasturi"
          onPress={handleOpenAdd}
          variant="primary"
          size="md"
          icon={<Plus size={16} color="#FFFFFF" />}
        />
      </View>

      {/* Offers Cards */}
      <View style={styles.list}>
        {offers.map((fo) => (
          <View
            key={fo.id}
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <Building2 size={20} color={COLORS.kiaRed} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.bankName, { color: colors.text }]}>{fo.bankName}</Text>
                <Text style={[styles.offerTitle, { color: COLORS.kiaRed }]}>{fo.title}</Text>
              </View>

              <TouchableOpacity
                onPress={() => handleToggleActive(fo)}
                style={[
                  styles.activeBadge,
                  { backgroundColor: fo.isActive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)' },
                ]}
              >
                <Text
                  style={[
                    styles.activeBadgeText,
                    { color: fo.isActive ? '#10B981' : '#EF4444' },
                  ]}
                >
                  {fo.isActive ? 'FAOL TAKLIF' : 'O‘CHIRILGAN'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gridStats}>
              <View style={styles.statBox}>
                <Percent size={14} color={colors.textSecondary} />
                <Text style={[styles.statVal, { color: colors.text }]}>{fo.interestRatePct}%</Text>
                <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Yillik stavka</Text>
              </View>

              <View style={styles.statBox}>
                <CircleDollarSign size={14} color={colors.textSecondary} />
                <Text style={[styles.statVal, { color: colors.text }]}>{fo.minDownPaymentPct}%</Text>
                <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Boshlang‘ich to‘lov</Text>
              </View>

              <View style={styles.statBox}>
                <Calendar size={14} color={colors.textSecondary} />
                <Text style={[styles.statVal, { color: colors.text }]}>{fo.maxTermMonths} oy</Text>
                <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Muddati</Text>
              </View>

              {fo.specialDiscountUzs ? (
                <View style={styles.statBox}>
                  <Tag size={14} color="#10B981" />
                  <Text style={[styles.statVal, { color: '#10B981' }]}>
                    {formatCurrency(fo.specialDiscountUzs)}
                  </Text>
                  <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Bonus chegirma</Text>
                </View>
              ) : null}
            </View>

            <Text style={[styles.descText, { color: colors.textSecondary }]}>
              {fo.description}
            </Text>

            <View style={styles.cardFooter}>
              <Text style={[styles.expText, { color: colors.textMuted }]}>
                Amal qilish muddati: {fo.expiryDate} gacha
              </Text>

              <TouchableOpacity
                onPress={() => handleOpenEdit(fo)}
                style={[styles.btnEdit, { backgroundColor: isDark ? '#222' : '#F3F4F6' }]}
              >
                <Edit2 size={13} color={colors.text} />
                <Text style={[styles.btnEditText, { color: colors.text }]}>Tahrirlash</Text>
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
                  {selectedOffer ? 'Kredit Taklifini Tahrirlash' : 'Yangi Kredit Taklifi Qo‘shish'}
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <X size={20} color={colors.text} />
                </TouchableOpacity>
              </View>

              <CustomInput label="Hamkor Bank Nomi" placeholder="Ipak Yo‘li Banki" value={bankName} onChangeText={setBankName} />
              <CustomInput label="Dastur Nomi" placeholder="Imtiyozli Avtokredit" value={title} onChangeText={setTitle} />

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <CustomInput label="Foiz Stavka (%)" placeholder="17.5" value={interestRate} onChangeText={setInterestRate} keyboardType="numeric" />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomInput label="Boshlang‘ich To‘lov (%)" placeholder="20" value={downPayment} onChangeText={setDownPayment} keyboardType="numeric" />
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <CustomInput label="Kredit Muddati (oy)" placeholder="60" value={maxMonths} onChangeText={setMaxMonths} keyboardType="numeric" />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomInput label="Maxsus Chegirma (UZS)" placeholder="15000000" value={specialDiscount} onChangeText={setSpecialDiscount} keyboardType="numeric" />
                </View>
              </View>

              <CustomInput label="Amal Qilish Muddati" placeholder="2026-12-31" value={expiryDate} onChangeText={setExpiryDate} />
              <CustomInput label="Tavsif va Shartlar" placeholder="Kredit shartlari haqida batafsil..." value={description} onChangeText={setDescription} />

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
  list: {
    gap: 16,
  },
  card: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  bankName: {
    fontSize: 14,
    fontWeight: '700',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  gridStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
    marginBottom: 12,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statVal: {
    fontSize: 15,
    fontWeight: '800',
  },
  statLbl: {
    fontSize: 11,
  },
  descText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expText: {
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
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },
});
