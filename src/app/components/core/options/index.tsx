import clsx from 'clsx';
import { DefaultTFuncReturn } from 'i18next';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type OptionsProps = {
  items: {
    label: string | number | DefaultTFuncReturn;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
  }[];
  className?: string;
  optionsPosition?: string;
};

const Options = ({ items, className, optionsPosition = 'right' }: OptionsProps): JSX.Element => {
  const [expand, setExpand] = useState<boolean>(false);

  function handleOnclick(onClickFnc: () => void, isDisabled: boolean | undefined, e: React.SyntheticEvent): void {
    e.stopPropagation();
    if (!isDisabled) {
      onClickFnc();
      setExpand(false);
    }
  }

  return (
    <div
      onClick={() => setExpand(pre => !pre)}
      className={twMerge(
        'border border-slate-400 relative rounded-full h-[32px] w-[32px] bg-white flex items-center justify-center cursor-pointer shadow-1',
        className
      )}
    >
      <img src="/assets/icons/options.svg" alt="options" />
      {expand && (
        <ul
          className={clsx(
            {
              'right-0': optionsPosition === 'left',
              'left-0': optionsPosition === 'right',
            },
            'absolute w-[334px] z-10 bg-white text-base top-full translate-y-1 border rounded pb-1 pt-1.5'
          )}
        >
          {items.map(item => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={item.label}
              onClick={e => handleOnclick(item.onClick, item.disabled, e)}
              className={twMerge(
                item.className,
                `px-3.5 py-3 ${
                  item.disabled ? 'cursor-default text-slate-300' : 'hover:bg-primary-extraLight hover:text-light'
                }`
              )}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Options;
