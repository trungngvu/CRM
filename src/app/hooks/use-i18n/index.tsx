import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import { LANGUAGES } from '../../types';

type LanguagesProps = {
  locales?: {
    key: LANGUAGES;
    value: { [key: string]: string };
  }[];
  name?: string;
};

const useI18n = (languages?: LanguagesProps | string) => {
  const { name = 'translation', locales } =
    typeof languages === 'object' ? languages : { name: languages, locales: null };

  if (locales) {
    locales.forEach(({ key, value }) => {
      i18next.addResourceBundle(key, name, value);
    });
  }

  const { t } = useTranslation(name);

  return t;
};

export default useI18n;
