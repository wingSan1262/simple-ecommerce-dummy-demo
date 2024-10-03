import {initReactI18next} from 'react-i18next';
import enTranslation from './en.json';
import i18n from 'i18next';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: enTranslation,
      },
    },
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(error => console.error('i18n initialization error:', error));

export default i18n;
