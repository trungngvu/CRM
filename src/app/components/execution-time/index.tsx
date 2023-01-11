import { SaveIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';
import { LANGUAGES } from '@types';

import Button from '../core/button';
import Input from '../core/input';
import { en, vi } from './i18n';

const ExecTime = () => {
  const translate = useI18n({
    name: ExecTime.name,
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
    <div className="flex flex-col w-full gap-3 px-4 py-2 bg-white border rounded border-secondary">
      <div className="font-bold">{translate('title')}</div>
      <div className="flex items-center justify-start">
        <span className="text-dark">
          {translate('duration')}
          <span className="text-red-500">*</span>{' '}
        </span>
        <Input className="inline w-[140px] ml-2" />
      </div>
      <div>
        <div className="mb-2 text-dark">
          {translate('detail')}
          <span className="text-red-500">*</span>{' '}
        </div>
        <Input />
      </div>
      <div>
        <div className="mb-2 text-dark">{translate('note')}</div>
        <textarea
          rows={3}
          className="border-secondary focus:border-secondary-dark rounded-[3px] w-full max-w-full focus:ring-0"
        />
      </div>
      <Button
        className="w-[90px] h-[32px] text-sm font-normal normal-case rounded-full"
        type="submit"
        iconOptions={{
          icon: SaveIcon,
        }}
      >
        {translate('save')}
      </Button>
    </div>
  );
};

export default ExecTime;
