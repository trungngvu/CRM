import { ComponentPropsWithRef, useState } from 'react';

import Select, { SelectItemProps } from '../../components/core/select';
import { SIZE } from '../../types';

export type SelectProps = {
  size?: SIZE;
  data: (string | number | SelectItemProps)[];
  defaultSelectedValue?: string | number | undefined;
  labelOptions?: {
    text: string;
    className?: string;
  };
  isRequired?: boolean;
} & Omit<ComponentPropsWithRef<'input'>, 'size'>;

const useSelect = () => {
  const [selectedItemValue, setSelectedItemValue] = useState<SelectItemProps | null>(null);

  return {
    selectedItemValue: selectedItemValue?.value,
    Select: ({ ...selectProps }: SelectProps) => (
      <Select {...selectProps} selectedItem={selectedItemValue} setSelectedItem={setSelectedItemValue} />
    ),
  };
};

export default useSelect;
