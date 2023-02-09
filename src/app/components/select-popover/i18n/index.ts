import { LANGUAGES } from '@types';

import en from './en';
import vi from './vi';

export default {
  name: 'SELECT_POPOVER',
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
