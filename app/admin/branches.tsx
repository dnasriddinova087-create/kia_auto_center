// Admin Dealership Branches Management
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Building, Phone, Mail, MapPin, Clock } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { KIA_BRANCHES, Branch } from '../../constants/branches';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminBranchesScreen() {
  const { colors } = useTheme();
  const { t, language } = useLanguage();
  const [branches, setBranches] = useState<Branch[]>([...KIA_BRANCHES]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('adminBranches')} ({branches.length})
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Rasmiy dilerlik markazlari tarmog‘i va filiallar boshqaruvi
          </Text>
        </View>

        <View style={styles.list}>
          {branches.map((b) => (
            <View
              key={b.id}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.headerRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Building size={20} color={COLORS.kiaRed} />
                  <Text style={[styles.name, { color: colors.text }]}>
                    {b.name[language]}
                  </Text>
                </View>
                {b.isMain && (
                  <View style={styles.mainBadge}>
                    <Text style={styles.mainBadgeText}>BOSH FILIAL</Text>
                  </View>
                )}
              </View>

              <View style={styles.row}>
                <MapPin size={15} color={colors.textSecondary} />
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                  {b.address[language]}
                </Text>
              </View>

              <View style={styles.row}>
                <Phone size={15} color={colors.textSecondary} />
                <Text style={[styles.text, { color: colors.textSecondary, fontWeight: '700' }]}>
                  {b.phone}
                </Text>
              </View>

              <View style={styles.row}>
                <Mail size={15} color={colors.textSecondary} />
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                  {b.email}
                </Text>
              </View>

              <View style={styles.row}>
                <Clock size={15} color={colors.textSecondary} />
                <Text style={[styles.text, { color: colors.textMuted }]}>
                  {b.workingHours[language]}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
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
    marginBottom: 24,
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
    gap: 16,
  },
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
  },
  mainBadge: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  mainBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 13,
  },
});
