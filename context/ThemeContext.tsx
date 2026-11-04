// Theme Context (Light / Dark Mode) for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/theme';
import { ThemeMode } from '../types';

interface ThemeColors {
  bg: string;
  card: string;
  cardHover: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
  isDark: boolean;
}

const STORAGE_KEY = 'kia_theme_mode';

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleTheme: () => {},
  setMode: () => {},
  colors: {
    bg: COLORS.darkBg,
    card: COLORS.darkCard,
    cardHover: COLORS.darkCardHover,
    border: COLORS.darkBorder,
    text: COLORS.darkText,
    textSecondary: COLORS.darkTextSecondary,
    textMuted: COLORS.darkTextMuted,
    accent: COLORS.kiaRed,
    accentHover: COLORS.kiaRedHover,
    accentLight: COLORS.kiaRedLight,
    success: COLORS.success,
    warning: COLORS.warning,
    danger: COLORS.danger,
    info: COLORS.info,
  },
  isDark: true,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === 'light' || saved === 'dark') {
        setModeState(saved);
      }
    });
  }, []);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    AsyncStorage.setItem(STORAGE_KEY, newMode);
  };

  const toggleTheme = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
  };

  const isDark = mode === 'dark';

  const colors: ThemeColors = {
    bg: isDark ? COLORS.darkBg : COLORS.lightBg,
    card: isDark ? COLORS.darkCard : COLORS.lightCard,
    cardHover: isDark ? COLORS.darkCardHover : COLORS.lightCardHover,
    border: isDark ? COLORS.darkBorder : COLORS.lightBorder,
    text: isDark ? COLORS.darkText : COLORS.lightText,
    textSecondary: isDark ? COLORS.darkTextSecondary : COLORS.lightTextSecondary,
    textMuted: isDark ? COLORS.darkTextMuted : COLORS.lightTextMuted,
    accent: COLORS.kiaRed,
    accentHover: COLORS.kiaRedHover,
    accentLight: COLORS.kiaRedLight,
    success: COLORS.success,
    warning: COLORS.warning,
    danger: COLORS.danger,
    info: COLORS.info,
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setMode, colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
