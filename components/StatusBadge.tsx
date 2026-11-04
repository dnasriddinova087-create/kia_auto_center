// Status Badge Component
// Owner: Nasriddinova Dilfuza

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RADIUS } from '../constants/theme';

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'available':
      case 'completed':
      case 'confirmed':
      case 'contract_signed':
        return { bg: '#D1FAE5', text: '#065F46', defaultLabel: 'Mavjud / Tasdiqlangan' };
      case 'reserved':
      case 'in_progress':
      case 'negotiation':
      case 'test_drive_scheduled':
        return { bg: '#DBEAFE', text: '#1E40AF', defaultLabel: 'Jarayonda' };
      case 'new':
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E', defaultLabel: 'Yangi / Kutilmoqda' };
      case 'sold':
      case 'cancelled':
      case 'out_of_stock':
        return { bg: '#FEE2E2', text: '#991B1B', defaultLabel: 'Sotilgan / Bekor qilingan' };
      default:
        return { bg: '#E5E7EB', text: '#374151', defaultLabel: status };
    }
  };

  const config = getBadgeConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{label || config.defaultLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
