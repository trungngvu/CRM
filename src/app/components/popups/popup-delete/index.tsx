import useI18n from '@hooks/use-i18n';
import { LANGUAGES } from '@types';

import Button from '../../core/button';
import { en, vi } from './i18n';

type PopupDeleteProps = {
  onSubmit: () => void;
  onCancel: () => void;
  header: string;
  content: string;
  isLoading?: boolean;
};

const PopupDelete = ({ header, onSubmit, onCancel, content, isLoading = false }: PopupDeleteProps): JSX.Element => {
  const translate = useI18n({
    name: PopupDelete.name,
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
    <div className="z-50 w-full text-light rounded-md overflow-hidden">
      <div className="px-4 py-2 font-bold bg-primary">{header}</div>
      <div className="pt-3 pb-4 pl-4 pr-4 bg-white">
        <h4 className="mb-8 text-dark">{content}</h4>
        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full" onClick={onSubmit} isLoading={isLoading}>
            {translate('CONFIRM')}
          </Button>

          <Button className="w-full bg-secondary-extraDark border-secondary-extraDark" onClick={onCancel}>
            {translate('CANCEL')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupDelete;
