import { LANGUAGES } from '@types';

import en from './en';
import vi from './vi';

export default {
  name: 'COMMENT_INPUT',
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
