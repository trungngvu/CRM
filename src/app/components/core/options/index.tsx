import { Menu } from '@headlessui/react';
import { DefaultTFuncReturn } from 'i18next';
import React from 'react';

import { COLORS } from '@src/app/types';

import PopupAbsolute from '../../popup-absolute';
import { Icon } from '../icons';
import OptionIcon from '../icons/option';

type OptionsProps = {
  items: {
    label: string | number | DefaultTFuncReturn;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
  }[];
};

const { DARK } = COLORS;

const Options = ({ items }: OptionsProps): JSX.Element => {
  function handleOnclick(onClickFnc: () => void, isDisabled: boolean | undefined, e: React.SyntheticEvent): void {
    e.stopPropagation();
    if (!isDisabled) {
      onClickFnc();
    }
  }

  return (
    <PopupAbsolute
      button={<Icon icon={OptionIcon} size={32} color={DARK} className="rounded-full border p-1 bg-white" />}
      popupStyle="right-0 w-max min-w-[200px]"
    >
      <Menu>
        <Menu.Items static>
          {items.map(item => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              className="px-3.5 py-3 text-dark list-none hover:bg-primary-extraLight hover:text-light cursor-pointer"
              key={item.label}
              onClick={e => handleOnclick(item.onClick, item.disabled, e)}
            >
              {item.label}
            </li>
          ))}
        </Menu.Items>
      </Menu>
    </PopupAbsolute>
  );
};

export default Options;
