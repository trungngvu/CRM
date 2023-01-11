import { ComponentPropsWithRef, useState } from 'react';

import Select, { SelectItemProps } from '@components/core/select';
import { SIZE } from '@types';

type UseStatusProps = {
  data: (string | number | SelectItemProps)[];
  defaultValue?: string | number | undefined;
};

export type SelectProps = {
  size?: SIZE;
  labelOptions?: {
    text: string;
    className?: string;
  };
  isRequired?: boolean;
} & Omit<ComponentPropsWithRef<'input'>, 'size'>;

const useSelect = ({ data, defaultValue }: UseStatusProps) => {
  const selectData = data.map(item => {
    if (typeof item === 'string' || typeof item === 'number') {
      return {
        value: item,
        label: `${item}`,
      };
    }

    return item;
  });

  const defaultSelectedItem = defaultValue
    ? selectData.find(item => item?.value === defaultValue) || undefined
    : defaultValue === undefined
    ? undefined
    : selectData[0];

  const [selectedItemValue, setSelectedItemValue] = useState<SelectItemProps>(defaultSelectedItem);

  return {
    selectedItemValue: selectedItemValue?.value,
    Select: ({ ...selectProps }: SelectProps) => (
      <Select
        {...selectProps}
        data={selectData}
        selectedItemValue={selectedItemValue}
        setSelectedItemValue={setSelectedItemValue}
      />
    ),
  };
};

export default useSelect;
