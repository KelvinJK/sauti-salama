import type { ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from '../theme';

// Root wrapper for every route: white background, safe-area insets, dark status bar icons.
export function Screen({children}:{children:ReactNode}) {
  return <SafeAreaView style={s.safe}><StatusBar style="dark"/>{children}</SafeAreaView>;
}
