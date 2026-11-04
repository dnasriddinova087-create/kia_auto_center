// Quick Lead & Test Drive Capture Modal
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X, CheckCircle, Phone, User, Calendar, Clock, Building } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { CustomInput } from './CustomInput';
import { CustomButton } from './CustomButton';
import { mockStore } from '../lib/mockStore';
import { KIA_BRANCHES } from '../constants/branches';
import { RADIUS, COLORS } from '../constants/theme';

interface LeadModalProps {
  visible: boolean;
  onClose: () => void;
  vehicleId?: string;
  vehicleName?: string;
  leadType?: 'purchase' | 'loan' | 'trade_in' | 'test_drive';
}

export const LeadModal: React.FC<LeadModalProps> = ({
  visible,
  onClose,
  vehicleId,
  vehicleName,
  leadType = 'purchase',
}) => {
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [selectedBranch, setSelectedBranch] = useState(KIA_BRANCHES[0].id);
  const [preferredDate, setPreferredDate] = useState('2026-11-06');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!fullName.trim() || phone.trim().length < 9) {
      setError('Iltimos, ismingiz va to‘liq telefon raqamingizni kiriting');
      return;
    }
    setError('');
    setLoading(true);

    try {
      if (leadType === 'test_drive' && vehicleId) {
        const branchObj = KIA_BRANCHES.find((b) => b.id === selectedBranch) || KIA_BRANCHES[0];
        await mockStore.createTestDrive({
          fullName,
          phone,
          vehicleId,
          vehicleName: vehicleName || 'KIA Vehicle',
          branchId: selectedBranch,
          branchName: branchObj.name[language],
          preferredDate,
          preferredTime: '11:00',
          status: 'pending',
          notes,
        });
      } else {
        await mockStore.createLead({
          customerName: fullName,
          phone,
          vehicleId,
          vehicleName,
          branchId: selectedBranch,
          source: 'modal_form',
          leadType,
          status: 'new',
          notes,
        });
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFullName('');
        setPhone('+998 ');
        setNotes('');
        onClose();
      }, 2500);
    } catch {
      setError('Arizani yuborishda xatolik yuz berdi. Qayta urinib ko‘ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: colors.text }]}>
                {leadType === 'test_drive' ? t('heroBtnTestDrive') : t('calcSubmitBtn')}
              </Text>
              {vehicleName && (
                <Text style={[styles.subtitle, { color: COLORS.kiaRed }]}>{vehicleName}</Text>
              )}
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {isSuccess ? (
            <View style={styles.successContainer}>
              <CheckCircle size={56} color={COLORS.success} />
              <Text style={[styles.successTitle, { color: colors.text }]}>
                {t('formSuccessTitle')}
              </Text>
              <Text style={[styles.successSubtitle, { color: colors.textSecondary }]}>
                {t('formSuccessMsg')}
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.formContent}>
              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

              <CustomInput
                label={t('formFullName')}
                placeholder="Alisher Navoiy"
                value={fullName}
                onChangeText={setFullName}
                icon={<User size={18} color={colors.textMuted} />}
              />

              <CustomInput
                label={t('formPhone')}
                placeholder="+998 90 123 45 67"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                icon={<Phone size={18} color={colors.textMuted} />}
              />

              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                {t('formBranch')}
              </Text>
              <View style={styles.branchList}>
                {KIA_BRANCHES.map((branch) => {
                  const isSelected = selectedBranch === branch.id;
                  return (
                    <TouchableOpacity
                      key={branch.id}
                      onPress={() => setSelectedBranch(branch.id)}
                      style={[
                        styles.branchItem,
                        {
                          backgroundColor: isSelected
                            ? isDark
                              ? '#2A2A2A'
                              : '#FEE2E2'
                            : isDark
                            ? '#1A1A1A'
                            : '#F3F4F6',
                          borderColor: isSelected ? COLORS.kiaRed : colors.border,
                        },
                      ]}
                    >
                      <Building
                        size={14}
                        color={isSelected ? COLORS.kiaRed : colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.branchText,
                          {
                            color: isSelected ? COLORS.kiaRed : colors.text,
                            fontWeight: isSelected ? '700' : '500',
                          },
                        ]}
                      >
                        {branch.name[language]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {leadType === 'test_drive' && (
                <CustomInput
                  label={t('formDate')}
                  placeholder="2026-11-06"
                  value={preferredDate}
                  onChangeText={setPreferredDate}
                  icon={<Calendar size={18} color={colors.textMuted} />}
                />
              )}

              <CustomInput
                label={t('formNotes')}
                placeholder="Qo‘shimcha savol yoki qiziqqan rang..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                containerStyle={{ marginBottom: 24 }}
              />

              <CustomButton
                title={t('formSubmit')}
                onPress={handleSubmit}
                loading={loading}
                variant="primary"
                size="lg"
              />
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '90%',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  formContent: {
    paddingBottom: 8,
  },
  errorMessage: {
    color: '#EF4444',
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '500',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  branchList: {
    marginBottom: 16,
    gap: 8,
  },
  branchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    gap: 8,
  },
  branchText: {
    fontSize: 13,
  },
  successContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  successSubtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
