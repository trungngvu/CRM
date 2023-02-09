import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LANGUAGES } from '@types';

import languages from './i18n-global';

const resources = { ...languages };

i18n.use(initReactI18next).init({
  resources,
  lng: LANGUAGES.VI,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  fallbackNS: 'translation',
});

export default i18n;
