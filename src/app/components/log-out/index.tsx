import useI18n from '@hooks/use-i18n';

import Button from '../core/button';
import languages from './i18n';

type LogOutProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const LogOut = ({ onClose, onConfirm }: LogOutProps) => {
  const translate = useI18n(languages);

  return (
    <div className="p-2 bg-light sm:p-0">
      <form className="flex flex-col bg-white p-[30px] shadow-2 w-full overflow-hidden">
        <div className="text-center m-auto pb-[25px]">
          <img alt="logo" src="/assets/icons/logo-1.svg" width={350} />
        </div>

        <div className="text-2xl font-bold mb-[22px] text-center ">{translate('TITLE')}</div>

        <div className="text-base text-center mb-9 max-w-[430px]">{translate('CONTENT')}</div>

        <div className="grid justify-between grid-cols-5 gap-x-3">
          <Button
            size="large"
            onClick={onClose}
            className="col-span-2 bg-secondary border-secondary hover:bg-secondary-dark text-[black]"
          >
            {translate('EXIT')}
          </Button>

          <Button size="large" onClick={onConfirm} className="col-span-3">
            {translate('LOGOUT')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogOut;
