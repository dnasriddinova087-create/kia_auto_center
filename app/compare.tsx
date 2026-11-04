// Compare KIA Vehicles Screen
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { GitCompare, X, Plus } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { KIA_VEHICLES, Vehicle } from '../constants/vehicles';
import { COLORS, RADIUS } from '../constants/theme';

export default function CompareScreen() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, formatCurrency } = useLanguage();

  // Selected vehicle IDs for comparison (max 3)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'kia-k5',
    'kia-sportage',
  ]);

  const selectedVehicles: Vehicle[] = KIA_VEHICLES.filter((v: Vehicle) => selectedIds.includes(v.id));

  const removeVehicle = (id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const addVehicle = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const availableToAdd: Vehicle[] = KIA_VEHICLES.filter((v: Vehicle) => !selectedIds.includes(v.id));

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <Navbar />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('navCompare')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            KIA modellarining texnik tavsiflari va narxlarini solishtiring
          </Text>
        </View>

        {/* Quick add vehicle bar */}
        {selectedIds.length < 3 && availableToAdd.length > 0 && (
          <View
            style={[
              styles.addBar,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.addLabel, { color: colors.textSecondary }]}>
              + Solishtirish uchun model qo‘shing:
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.addScroll}>
              {availableToAdd.map((car: Vehicle) => (
                <TouchableOpacity
                  key={car.id}
                  onPress={() => addVehicle(car.id)}
                  style={[styles.addBtn, { borderColor: colors.border }]}
                >
                  <Plus size={14} color={COLORS.kiaRed} />
                  <Text style={[styles.addBtnText, { color: colors.text }]}>{car.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Comparison Table */}
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.tableWrapper}>
            {/* Headers / Cars */}
            <View style={styles.row}>
              <View style={[styles.headerCell, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.cellHeading, { color: colors.textSecondary }]}>
                  Model
                </Text>
              </View>
              {selectedVehicles.map((car: Vehicle) => (
                <View
                  key={car.id}
                  style={[
                    styles.carHeaderCell,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => removeVehicle(car.id)}
                    style={styles.removeBtn}
                  >
                    <X size={16} color="#FFF" />
                  </TouchableOpacity>
                  <Image source={{ uri: car.mainImage }} style={styles.carThumb} resizeMode="cover" />
                  <Text style={[styles.carName, { color: colors.text }]}>{car.name}</Text>
                  <Text style={[styles.carPrice, { color: COLORS.kiaRed }]}>
                    {formatCurrency(car.basePriceUzs)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Spec: Engine */}
            <View style={styles.row}>
              <View style={[styles.labelCell, { backgroundColor: isDark ? '#1C1C1C' : '#F3F4F6' }]}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>{t('specEngine')}</Text>
              </View>
              {selectedVehicles.map((car: Vehicle) => (
                <View key={car.id} style={[styles.dataCell, { borderColor: colors.border }]}>
                  <Text style={[styles.dataText, { color: colors.text }]}>
                    {car.specs.engineCapacity} L ({car.specs.fuelType})
                  </Text>
                </View>
              ))}
            </View>

            {/* Spec: Power */}
            <View style={styles.row}>
              <View style={[styles.labelCell, { backgroundColor: isDark ? '#1C1C1C' : '#F3F4F6' }]}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>{t('specPower')}</Text>
              </View>
              {selectedVehicles.map((car: Vehicle) => (
                <View key={car.id} style={[styles.dataCell, { borderColor: colors.border }]}>
                  <Text style={[styles.dataText, { color: colors.text, fontWeight: '700' }]}>
                    {car.specs.powerHp} ot kuchi
                  </Text>
                </View>
              ))}
            </View>

            {/* Spec: Transmission */}
            <View style={styles.row}>
              <View style={[styles.labelCell, { backgroundColor: isDark ? '#1C1C1C' : '#F3F4F6' }]}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>{t('specTransmission')}</Text>
              </View>
              {selectedVehicles.map((car: Vehicle) => (
                <View key={car.id} style={[styles.dataCell, { borderColor: colors.border }]}>
                  <Text style={[styles.dataText, { color: colors.text }]}>
                    {car.specs.transmission}
                  </Text>
                </View>
              ))}
            </View>

            {/* Spec: Drive */}
            <View style={styles.row}>
              <View style={[styles.labelCell, { backgroundColor: isDark ? '#1C1C1C' : '#F3F4F6' }]}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>{t('specDrive')}</Text>
              </View>
              {selectedVehicles.map((car: Vehicle) => (
                <View key={car.id} style={[styles.dataCell, { borderColor: colors.border }]}>
                  <Text style={[styles.dataText, { color: colors.text }]}>
                    {car.specs.driveType}
                  </Text>
                </View>
              ))}
            </View>

            {/* Spec: Acceleration 0-100 */}
            <View style={styles.row}>
              <View style={[styles.labelCell, { backgroundColor: isDark ? '#1C1C1C' : '#F3F4F6' }]}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>{t('specAccel')}</Text>
              </View>
              {selectedVehicles.map((car: Vehicle) => (
                <View key={car.id} style={[styles.dataCell, { borderColor: colors.border }]}>
                  <Text style={[styles.dataText, { color: colors.text }]}>
                    {car.specs.acceleration0100} s
                  </Text>
                </View>
              ))}
            </View>

            {/* Spec: Fuel Economy */}
            <View style={styles.row}>
              <View style={[styles.labelCell, { backgroundColor: isDark ? '#1C1C1C' : '#F3F4F6' }]}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>{t('specConsumption')}</Text>
              </View>
              {selectedVehicles.map((car: Vehicle) => (
                <View key={car.id} style={[styles.dataCell, { borderColor: colors.border }]}>
                  <Text style={[styles.dataText, { color: colors.text }]}>
                    {car.specs.fuelConsumptionCombined} L / 100km
                  </Text>
                </View>
              ))}
            </View>

            {/* Spec: Trunk */}
            <View style={styles.row}>
              <View style={[styles.labelCell, { backgroundColor: isDark ? '#1C1C1C' : '#F3F4F6' }]}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>{t('specTrunk')}</Text>
              </View>
              {selectedVehicles.map((car: Vehicle) => (
                <View key={car.id} style={[styles.dataCell, { borderColor: colors.border }]}>
                  <Text style={[styles.dataText, { color: colors.text }]}>
                    {car.specs.trunkCapacityLiters} L
                  </Text>
                </View>
              ))}
            </View>

            {/* Spec: Ground Clearance */}
            <View style={styles.row}>
              <View style={[styles.labelCell, { backgroundColor: isDark ? '#1C1C1C' : '#F3F4F6' }]}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>{t('specGroundClearance')}</Text>
              </View>
              {selectedVehicles.map((car: Vehicle) => (
                <View key={car.id} style={[styles.dataCell, { borderColor: colors.border }]}>
                  <Text style={[styles.dataText, { color: colors.text }]}>
                    {car.specs.groundClearanceMm} mm
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    maxWidth: 1320,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 36,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
  },
  addBar: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  addLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  addScroll: {
    flexDirection: 'row',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    marginRight: 8,
    gap: 6,
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tableWrapper: {
    minWidth: 800,
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
  },
  headerCell: {
    width: 220,
    padding: 16,
    borderWidth: 1,
    justifyContent: 'center',
  },
  cellHeading: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  carHeaderCell: {
    width: 260,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.full,
    padding: 4,
    zIndex: 10,
  },
  carThumb: {
    width: 200,
    height: 110,
    borderRadius: RADIUS.md,
    marginBottom: 10,
  },
  carName: {
    fontSize: 18,
    fontWeight: '800',
  },
  carPrice: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  labelCell: {
    width: 220,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(150,150,150,0.15)',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  dataCell: {
    width: 260,
    padding: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataText: {
    fontSize: 14,
  },
});
