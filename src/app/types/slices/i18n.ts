import { LANGUAGES } from '../languages';

export type I18nSliceProps = {
  language: LANGUAGES;
  languages: {
    id: LANGUAGES;
    title: string;
  }[];
};
