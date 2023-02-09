import { DefaultTFuncReturn } from 'i18next';
import { twMerge } from 'tailwind-merge';

type OptionsNavProps = {
  className?: string;
  options?: JSX.Element | string | number;
  title?: DefaultTFuncReturn | string;
  onClickReturn: () => void;
};

const OptionsNav = ({ className, options, title, onClickReturn }: OptionsNavProps): JSX.Element => {
  return (
    <div className={twMerge('flex items-center justify-between', className)}>
      <div onClick={onClickReturn} className="flex items-center justify-center cursor-pointer">
        <img src="/assets/icons/left-arrow.svg" alt="" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center justify-center">{options}</div>
    </div>
  );
};

export default OptionsNav;
