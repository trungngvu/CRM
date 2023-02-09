import { LANGUAGES } from '@types';

import en from './en';
import vi from './vi';

export default {
  name: 'CARD_DETAIL',
  locales: [
    {
      key: LANGUAGES.EN,
      value: en,
    },
    {
      key: LANGUAGES.VI,
      value: vi,
    },
  ],
};
