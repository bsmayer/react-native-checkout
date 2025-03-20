import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { pt } from './locales/pt';

export function getResources() {
  // Create default translation object
  const defaultTranslations = Object.fromEntries(
    Object.entries({
      en,
      pt,
    }).map(([key, value]) => [key, { translation: value }])
  );

  return defaultTranslations;
}

i18next.use(initReactI18next).init({
  resources: getResources(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
