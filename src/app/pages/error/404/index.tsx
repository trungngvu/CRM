import { Link } from 'react-router-dom';

import useI18n from '@hooks/use-i18n';
import { Button } from '@src/app/components';
import { LANGUAGES } from '@types';

import { en, vi } from './i18n';

const Error404 = (): JSX.Element => {
  const translate = useI18n({
    name: Error404.name,
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
    <div className="flex items-center justify-center h-screen">
      <img alt="Not found" src="/assets/404/404.png" />
      <div className="flex flex-col items-center justify-center">
        <div className="text-6xl font-bold text-primary-dark h-fit">404</div>
        <div className="mb-2 text-lg font-bold">{translate('TITLE')}</div>
        <div className="w-[500px] text-center">{translate('CONTENT')}</div>
        <div className="mt-2">
          <Link to="/">
            <Button shape="round">{translate('HOME')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
