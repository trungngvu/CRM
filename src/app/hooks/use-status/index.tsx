import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SelectItem from '@components/select-item';

type UseStatusProps<T> = {
  defaultValue: T;
};

type SelectStatusProps<T> = {
  title: string;
  data: {
    value: T;
    label: string;
  }[];
  onClick?: () => void;
};

const useStatus = <T extends string>({ defaultValue }: UseStatusProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentStatus, setCurrentStatus] = useState<T>((searchParams.get('status') as T) || defaultValue);

  /**
   * Update status in url when currentStatus change
   */
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    setSearchParams({ ...currentParams, status: currentStatus });
  }, [currentStatus]);

  return {
    currentStatus,
    SelectStatus: ({ ...props }: SelectStatusProps<T>) => (
      <SelectItem<T> {...props} currentItemValue={currentStatus} setCurrentItemValue={setCurrentStatus} />
    ),
  };
};

export default useStatus;
