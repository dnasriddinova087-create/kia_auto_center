// Loan Calculator Widget for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Calculator, ArrowRight, ShieldCheck, Check } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { KIA_VEHICLES, Vehicle } from '../constants/vehicles';
import { CustomButton } from './CustomButton';
import { LeadModal } from './LeadModal';
import { COLORS, RADIUS } from '../constants/theme';

interface LoanCalculatorWidgetProps {
  initialVehicle?: Vehicle;
}

export const LoanCalculatorWidget: React.FC<LoanCalculatorWidgetProps> = ({ initialVehicle }) => {
  const { colors, isDark } = useTheme();
  const { t, formatCurrency } = useLanguage();

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    initialVehicle || KIA_VEHICLES[1] // Default KIA K5
  );
  const [downPaymentPct, setDownPaymentPct] = useState<number>(30); // 30%
  const [loanTermMonths, setLoanTermMonths] = useState<number>(36); // 36 months
  const [interestRate, setInterestRate] = useState<number>(18.5); // 18.5%
  const [modalOpen, setModalOpen] = useState(false);

  // Calculations
  const carPrice = selectedVehicle.basePriceUzs;
  const downPaymentAmount = Math.round((carPrice * downPaymentPct) / 100);
  const principalCredit = carPrice - downPaymentAmount;

  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    monthlyRate > 0
      ? Math.round(
          (principalCredit * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
            (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
        )
      : Math.round(principalCredit / loanTermMonths);

  const totalRepayment = monthlyPayment * loanTermMonths + downPaymentAmount;
  const totalOverpayment = totalRepayment - carPrice;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Calculator size={22} color={COLORS.kiaRed} />
          <Text style={[styles.title, { color: colors.text }]}>
            {t('sectionCalculatorTitle')}
          </Text>
        </View>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t('sectionCalculatorSubtitle')}
        </Text>
      </View>

      <View style={styles.body}>
        {/* Step 1: Select Model */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t('calcSelectCar')}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carSelectorScroll}
        >
          {KIA_VEHICLES.map((vehicle) => {
            const isSelected = selectedVehicle.id === vehicle.id;
            return (
              <TouchableOpacity
                key={vehicle.id}
                onPress={() => setSelectedVehicle(vehicle)}
                style={[
                  styles.carTab,
                  {
                    backgroundColor: isSelected
                      ? isDark
                        ? '#2E2E2E'
                        : '#FEE2E2'
                      : isDark
                      ? '#1E1E1E'
                      : '#F3F4F6',
                    borderColor: isSelected ? COLORS.kiaRed : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.carTabName,
                    {
                      color: isSelected ? COLORS.kiaRed : colors.text,
                      fontWeight: isSelected ? '800' : '600',
                    },
                  ]}
                >
                  {vehicle.name}
                </Text>
                <Text style={[styles.carTabPrice, { color: colors.textSecondary }]}>
                  {formatCurrency(vehicle.basePriceUzs)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Step 2: Down Payment */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
              {t('calcDownPayment')}: {downPaymentPct}%
            </Text>
            <Text style={[styles.labelAmount, { color: COLORS.kiaRed }]}>
              {formatCurrency(downPaymentAmount)}
            </Text>
          </View>
          <View style={styles.pctRow}>
            {[15, 20, 30, 40, 50].map((pct) => (
              <TouchableOpacity
                key={pct}
                onPress={() => setDownPaymentPct(pct)}
                style={[
                  styles.pctBtn,
                  {
                    backgroundColor:
                      downPaymentPct === pct
                        ? COLORS.kiaRed
                        : isDark
                        ? '#222222'
                        : '#E5E7EB',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pctText,
                    {
                      color: downPaymentPct === pct ? '#FFFFFF' : colors.text,
                      fontWeight: downPaymentPct === pct ? '700' : '500',
                    },
                  ]}
                >
                  {pct}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Step 3: Loan Term */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
              {t('calcTermMonths')}
            </Text>
            <Text style={[styles.labelAmount, { color: colors.text }]}>
              {loanTermMonths} {t('monthsCount')} ({Math.round(loanTermMonths / 12)} yil)
            </Text>
          </View>
          <View style={styles.pctRow}>
            {[12, 24, 36, 48, 60].map((term) => (
              <TouchableOpacity
                key={term}
                onPress={() => setLoanTermMonths(term)}
                style={[
                  styles.pctBtn,
                  {
                    backgroundColor:
                      loanTermMonths === term
                        ? COLORS.kiaRed
                        : isDark
                        ? '#222222'
                        : '#E5E7EB',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pctText,
                    {
                      color: loanTermMonths === term ? '#FFFFFF' : colors.text,
                      fontWeight: loanTermMonths === term ? '700' : '500',
                    },
                  ]}
                >
                  {term} oy
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Results Card */}
        <View
          style={[
            styles.resultsCard,
            {
              backgroundColor: isDark ? '#141414' : '#F9FAFB',
              borderColor: isDark ? '#2E2E2E' : '#E5E7EB',
            },
          ]}
        >
          <View style={styles.monthlyRow}>
            <View>
              <Text style={[styles.monthlyLabel, { color: colors.textSecondary }]}>
                {t('calcMonthlyPayment')}
              </Text>
              <Text style={[styles.monthlyValue, { color: COLORS.kiaRed }]}>
                {formatCurrency(monthlyPayment)}
              </Text>
            </View>
            <View style={styles.rateBadge}>
              <Text style={styles.rateText}>{interestRate}% yillik</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
                {t('calcTotalCredit')}
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {formatCurrency(principalCredit)}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
                {t('calcOverpayment')}
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {formatCurrency(totalOverpayment)}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
                {t('calcTotalRepayment')}
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {formatCurrency(totalRepayment)}
              </Text>
            </View>
          </View>

          <CustomButton
            title={t('calcSubmitBtn')}
            onPress={() => setModalOpen(true)}
            variant="primary"
            size="lg"
            style={{ marginTop: 20 }}
            iconRight={<ArrowRight size={16} color="#FFFFFF" />}
          />
        </View>
      </View>

      <LeadModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        vehicleId={selectedVehicle.id}
        vehicleName={`${selectedVehicle.name} (${downPaymentPct}% boshlang‘ich, ${loanTermMonths} oy)`}
        leadType="loan"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
    width: '100%',
  },
  header: {
    marginBottom: 20,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
  },
  body: {},
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  carSelectorScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  carTab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    marginRight: 10,
  },
  carTabName: {
    fontSize: 14,
  },
  carTabPrice: {
    fontSize: 11,
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  pctRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pctBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pctText: {
    fontSize: 13,
  },
  resultsCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
    marginTop: 10,
  },
  monthlyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthlyLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  monthlyValue: {
    fontSize: 26,
    fontWeight: '900',
    marginTop: 2,
  },
  rateBadge: {
    backgroundColor: 'rgba(200, 16, 46, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.kiaRed,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  rateText: {
    color: COLORS.kiaRed,
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
    marginVertical: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  summaryItem: {
    minWidth: 120,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});
