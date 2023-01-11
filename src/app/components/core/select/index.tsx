import { Combobox, Transition } from '@headlessui/react';
import { clsx } from 'clsx';
import { ChangeEvent, ComponentPropsWithRef, Fragment, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { ExpandMoreIcon, Icon } from '@components/core/icons';
import { COLORS, SIZE } from '@types';

const { DARK } = COLORS;

export type SelectItemProps =
  | {
      value: string | number;
      label: string;
    }
  | undefined;

export type SelectProps = {
  size?: SIZE;
  labelOptions?: {
    text: string;
    className?: string;
  };
  data: SelectItemProps[];
  selectedItemValue: SelectItemProps;
  setSelectedItemValue: (value: SelectItemProps) => void;
  isRequired?: boolean;
} & Omit<ComponentPropsWithRef<'input'>, 'size'>;

const Select = ({
  size = 'medium',
  labelOptions,
  data,
  selectedItemValue,
  setSelectedItemValue,
  isRequired = false,
  name,
  ...props
}: SelectProps): JSX.Element => {
  const { text: labelText, className: labelClassName } = labelOptions || {};

  const [width, setWidth] = useState(0);
  const [query, setQuery] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredItem =
    query === ''
      ? data
      : data.filter(item =>
          item?.label.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (inputRef.current?.offsetWidth) {
      setWidth(inputRef?.current?.offsetWidth);
    }
  }, []);

  const onChangeSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (event.target.value === '') {
      setSelectedItemValue(undefined);
    }
  };

  return (
    <div className="flex flex-col gap-y-[5px]">
      {labelText && (
        <label htmlFor={name} className={twMerge('flex select-none text-dark text-sm', labelClassName)}>
          {labelText}

          {isRequired && <span className="ml-1 text-error">*</span>}
        </label>
      )}

      <div className="w-full">
        <Combobox value={selectedItemValue} onChange={setSelectedItemValue}>
          <div className="relative w-fit overflow-hidden text-left bg-transparent rounded-[3px] cursor-default focus:outline-none focus:ring-offset-0 sm:text-sm">
            <Combobox.Input
              onChange={onChangeSelect}
              displayValue={(item: SelectItemProps) => item?.label || ''}
              placeholder={props.placeholder}
              className={twMerge(
                clsx(
                  {
                    'h-[40px] text-base': size === 'large',
                    'h-[32px] text-base': size === 'medium',
                    'h-[24px] text-sm': size === 'small',
                  },
                  'w-full border border-secondary focus:border-secondary px-[12px] text-dark'
                ),
                props.className
              )}
              ref={inputRef}
            />

            <Combobox.Button className="absolute top-0 bottom-0 right-[5px] my-auto">
              <Icon icon={ExpandMoreIcon} color={DARK} />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options
              className="absolute bg-white z-[99] shadow-1 border border-secondary border-t-0"
              style={{
                width,
              }}
            >
              {filteredItem.map(item => (
                <Combobox.Option key={item?.value} value={item} as={Fragment}>
                  {({ active }) => (
                    <li
                      className={clsx(
                        {
                          'h-[40px] text-base': size === 'large',
                          'h-[32px] text-base': size === 'medium',
                          'h-[24px] text-sm': size === 'small',
                          'bg-primary text-light': active,
                          'bg-white text-dark': !active,
                        },
                        'w-full px-[12px] flex items-center'
                      )}
                    >
                      {item?.label}
                    </li>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </div>
  );
};

export default Select;
