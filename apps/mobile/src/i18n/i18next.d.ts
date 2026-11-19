import 'i18next';
import type { en } from './locales/en';

// Type-checks t('...') keys against the English translations.
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: { translation: typeof en };
  }
}
