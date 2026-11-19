import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from '../src/i18n/locales/en';
import { sw } from '../src/i18n/locales/sw';

const STORAGE_KEY = 'sautisalama.language';

// Every key path in a nested translation object, e.g. "welcome.tagline".
function keyPaths(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === 'string' ? [prefix + key] : keyPaths(value, `${prefix}${key}.`),
  );
}

function leafValues(obj: object): string[] {
  return Object.values(obj).flatMap(value => (typeof value === 'string' ? [value] : leafValues(value)));
}

// Load a fresh copy of the i18n module with the device reporting the given languages.
function loadI18n(deviceLanguageCodes: (string | null)[]) {
  let mod!: typeof import('../src/i18n');
  jest.isolateModules(() => {
    jest.doMock('expo-localization', () => ({
      getLocales: () => deviceLanguageCodes.map(languageCode => ({ languageCode, languageTag: languageCode ?? 'und' })),
    }));
    mod = require('../src/i18n');
  });
  return mod;
}

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.dontMock('expo-localization');
});

describe('translations', () => {
  it('Kiswahili has exactly the same keys as English', () => {
    expect(keyPaths(sw).sort()).toEqual(keyPaths(en).sort());
  });

  it('has no empty strings', () => {
    for (const value of [...leafValues(en), ...leafValues(sw)]) expect(value.trim()).not.toBe('');
  });
});

describe('device default language', () => {
  it('uses Kiswahili when the device prefers it', () => {
    expect(loadI18n(['sw']).default.language).toBe('sw');
  });

  it('falls back to English for other device languages', () => {
    expect(loadI18n(['fr']).default.language).toBe('en');
    expect(loadI18n([null]).default.language).toBe('en');
  });
});

describe('language persistence', () => {
  it('setLanguage switches the language and saves the choice', async () => {
    const { default: i18n, setLanguage } = loadI18n(['en']);
    await setLanguage('sw');
    expect(i18n.language).toBe('sw');
    expect(i18n.t('welcome.getStarted')).toBe(sw.welcome.getStarted);
    expect(await AsyncStorage.getItem(STORAGE_KEY)).toBe('sw');
  });

  it('restoreLanguage applies a choice saved on a previous launch', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'sw');
    const { default: i18n, restoreLanguage } = loadI18n(['en']);
    await restoreLanguage();
    expect(i18n.language).toBe('sw');
  });

  it('restoreLanguage ignores unsupported saved values', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'xx');
    const { default: i18n, restoreLanguage } = loadI18n(['en']);
    await restoreLanguage();
    expect(i18n.language).toBe('en');
  });

  it('restoreLanguage keeps the device default when storage fails', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('unavailable'));
    const { default: i18n, restoreLanguage } = loadI18n(['sw']);
    await expect(restoreLanguage()).resolves.toBeUndefined();
    expect(i18n.language).toBe('sw');
  });
});
