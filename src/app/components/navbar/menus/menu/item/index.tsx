import { clsx } from 'clsx';

import { ExpandLessIcon, ExpandMoreIcon, Icon } from '@components/core/icons';
import { SETTINGS_CONFIG } from '@configs';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { selectDisplaySetting, useAppSelector } from '@store';
import { LANGUAGES } from '@types';

import { en, vi } from './i18n';

const { LOGO_SIZE } = SETTINGS_CONFIG;

type ItemProps = {
  data: {
    name: string;
    path: string;
    icon?: JSX.Element;
  };
  isParent?: boolean;
  isExpand?: boolean;
  active: boolean;
  onClick?: (() => void) | null;
};

const Item = ({
  data: { name, icon, path },
  isParent = false,
  isExpand = false,
  active,
  onClick,
}: ItemProps): JSX.Element => {
  const { expandNavbar } = useAppSelector(selectDisplaySetting);

  const translate = useI18n({
    name: Item.name,
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

  const handleClick = () => (onClick ? onClick() : history.push(path));

  return (
    <button
      type="button"
      style={{
        height: LOGO_SIZE,
        minHeight: LOGO_SIZE,
        maxHeight: LOGO_SIZE,
      }}
      className={clsx(
        {
          'bg-primary-dark': active,
        },
        'text-light w-full rounded-[3px] hover:bg-primary-dark flex items-center px-[10px] cursor-pointer'
      )}
      onClick={handleClick}
    >
      {icon && <div className="flex items-center">{icon}</div>}

      <div
        className={clsx(
          {
            hidden: !expandNavbar,
            'grid place-items-center': expandNavbar,
            'pl-[10px]': isParent,
            'pl-[30px]': !isParent,
          },
          'font-medium whitespace-nowrap select-none'
        )}
      >
        {translate(name)}
      </div>

      {isParent && expandNavbar && (
        <div className="flex items-center justify-center ml-auto">
          <Icon icon={!isExpand ? ExpandMoreIcon : ExpandLessIcon} size={20} />
        </div>
      )}
    </button>
  );
};

export default Item;
