import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import { LANGUAGES } from '@types';

type UseI18nProps = {
  data: {
    key: LANGUAGES;
    value: { [key: string]: string };
  }[];
  name: string;
};

const useI18n = ({ data, name }: UseI18nProps) => {
  data.forEach(({ key, value }) => {
    i18next.addResourceBundle(key, name, value);
  });

  const { t } = useTranslation(name);

  return t;
};

export default useI18n;
