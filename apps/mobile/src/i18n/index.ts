import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { sw } from './locales/sw';

export const languages = ['sw', 'en'] as const;
export type Language = (typeof languages)[number];

const STORAGE_KEY = 'sautisalama.language';

const isLanguage = (value: unknown): value is Language => languages.includes(value as Language);

// Kiswahili if the device prefers it, otherwise English.
function deviceLanguage(): Language {
  const code = getLocales()[0]?.languageCode;
  return isLanguage(code) ? code : 'en';
}

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, sw: { translation: sw } },
  lng: deviceLanguage(),
  fallbackLng: 'en',
  supportedLngs: languages,
  interpolation: { escapeValue: false },
});

// Apply the language the user picked on a previous launch, if any.
export async function restoreLanguage() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved) && saved !== i18n.language) await i18n.changeLanguage(saved);
  } catch {
    // Storage unavailable: keep the device default.
  }
}

export async function setLanguage(language: Language) {
  await i18n.changeLanguage(language);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, language);
  } catch {
    // The choice still applies for this session.
  }
}

export default i18n;
