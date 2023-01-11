import useI18n from '@hooks/use-i18n';
import { LANGUAGES } from '@types';

import { en, vi } from './i18n';

const JobWatcher = ({ data }: { data: string[] }) => {
  const translate = useI18n({
    name: JobWatcher.name,
    data: [
      {
        key: LANGUAGES.EN,
        value: en,
      },
      {
        key: LANGUAGES.VI,
        value: vi,
      },
    ],
  });
  return (
    <div className="px-4 py-2 bg-white border rounded border-secondary-dark">
      <div>{translate('WATCHER')}</div>
      <div className="flex flex-wrap gap-2 mt-1">
        {data.map(item => (
          <span key={item} className="px-3 py-1 bg-secondary rounded-3xl text-dark">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
export default JobWatcher;
