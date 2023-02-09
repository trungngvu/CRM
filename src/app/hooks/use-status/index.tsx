import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SelectItem from '../../components/select-item';

type SelectStatusProps<T> = {
  title: string;
  data: {
    value: T;
    label: string;
  }[];
  defaultValue?: T;
};

const useStatus = <T extends string>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentStatus, setCurrentStatus] = useState<T>(searchParams.get('status') as T);

  /**
   * Update status in url when currentStatus change
   */
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    if (currentStatus !== null) {
      setSearchParams({ ...currentParams, status: currentStatus });
    }
  }, [currentStatus]);

  return {
    currentStatus,
    SelectStatus: ({ ...props }: SelectStatusProps<T>) => (
      <SelectItem<T> {...props} currentItemValue={currentStatus} setCurrentItemValue={setCurrentStatus} />
    ),
  };
};

export default useStatus;
