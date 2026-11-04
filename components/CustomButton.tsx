// Custom KIA Styled Button Component
// Owner: Nasriddinova Dilfuza

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { COLORS, RADIUS } from '../constants/theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  style,
  textStyle,
}) => {
  const { colors, isDark } = useTheme();

  const getContainerStyle = (): ViewStyle => {
    let bg = COLORS.kiaRed;
    let border = 'transparent';

    if (variant === 'secondary') {
      bg = isDark ? '#2A2A2A' : '#E5E7EB';
    } else if (variant === 'outline') {
      bg = 'transparent';
      border = isDark ? '#444444' : '#D1D5DB';
    } else if (variant === 'ghost') {
      bg = 'transparent';
    } else if (variant === 'danger') {
      bg = COLORS.danger;
    }

    const paddingV = size === 'sm' ? 8 : size === 'lg' ? 16 : 12;
    const paddingH = size === 'sm' ? 14 : size === 'lg' ? 24 : 18;

    return {
      backgroundColor: bg,
      borderWidth: variant === 'outline' ? 1.5 : 0,
      borderColor: border,
      borderRadius: RADIUS.md,
      paddingVertical: paddingV,
      paddingHorizontal: paddingH,
      opacity: disabled || loading ? 0.6 : 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  const getTextStyle = (): TextStyle => {
    let color = '#FFFFFF';

    if (variant === 'secondary') {
      color = colors.text;
    } else if (variant === 'outline' || variant === 'ghost') {
      color = colors.text;
    }

    const fontSize = size === 'sm' ? 13 : size === 'lg' ? 16 : 14;

    return {
      color,
      fontSize,
      fontWeight: '600',
      letterSpacing: 0.3,
    };
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[getContainerStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.text : '#FFFFFF'} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
