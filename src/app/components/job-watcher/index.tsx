import useI18n from '@hooks/use-i18n';

import languages from './i18n';

const JobWatcher = ({ data }: { data: string[] }) => {
  const translate = useI18n(languages);

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
