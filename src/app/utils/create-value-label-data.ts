import { TFunction } from 'i18next';

/**
 * Convert array of data into data with value and label translate
 */
const createValueLabelData = (data: string[], translate: TFunction<string, undefined>) => {
  const result = data.map(item => ({
    value: item,
    label: translate(item),
  }));

  return result;
};

export default createValueLabelData;
