import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LANGUAGES } from '@types';

const resources = {};

i18n.use(initReactI18next).init({
  resources,
  lng: LANGUAGES.VI,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
