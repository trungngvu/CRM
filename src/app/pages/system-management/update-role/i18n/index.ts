import { LANGUAGES, PAGES_NAME } from '@types';

import en from './en';
import vi from './vi';

export default {
  name: PAGES_NAME.UPDATE_ROLE,
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
