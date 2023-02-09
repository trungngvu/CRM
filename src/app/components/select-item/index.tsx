import { Dispatch, SetStateAction, useEffect } from 'react';

import Button from '@components/core/button';

type SelectItemProps<T> = {
  title: string;
  data: {
    value: T;
    label: string;
  }[];
  defaultValue?: T;
  currentItemValue: T;
  setCurrentItemValue: Dispatch<SetStateAction<T>>;
};

const SelectItem = <T extends string>({
  title = '',
  data = [],
  defaultValue = data[0]?.value,
  currentItemValue,
  setCurrentItemValue,
}: SelectItemProps<T>) => {
  /**
   * Set current item to default value when current item does not exist
   */
  useEffect(() => {
    if (currentItemValue === null) {
      setCurrentItemValue(defaultValue);
    }
  }, [currentItemValue]);

  return (
    <div className="flex items-center gap-x-[10px]">
      {title && <div className="text-sm text-dark">{title}:</div>}

      <div className="flex gap-x-2">
        {data.map(({ value, label }) => (
          <Button
            key={value}
            size="small"
            shape="round"
            color={value === currentItemValue ? 'active' : 'inactive'}
            onClick={() => setCurrentItemValue(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectItem;
