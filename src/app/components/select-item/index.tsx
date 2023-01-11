import { Dispatch, SetStateAction } from 'react';

import Button from '@components/core/button';

type SelectItemProps<T> = {
  title: string;
  data: {
    value: T;
    label: string;
  }[];
  currentItemValue: T;
  setCurrentItemValue: Dispatch<SetStateAction<T>>;
  onClick?: () => void;
};

const SelectItem = <T extends string>({
  title,
  data,
  currentItemValue,
  setCurrentItemValue,
  onClick,
}: SelectItemProps<T>) => {
  const handleClick = (value: T) => {
    setCurrentItemValue(value);

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="flex items-center gap-x-[10px]">
      <div className="text-sm text-dark">{title}:</div>

      <div className="flex gap-x-2">
        {data.map(({ value, label }) => (
          <Button
            key={value}
            size="small"
            color={value === currentItemValue ? 'active' : 'inactive'}
            shape="round"
            onClick={() => handleClick(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectItem;
