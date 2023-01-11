import { Combobox, Transition } from '@headlessui/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { clsx } from 'clsx';
import { DefaultTFuncReturn } from 'i18next';
import React, { ComponentPropsWithRef, Fragment, useEffect, useState } from 'react';
import { ControllerRenderProps, FieldError, FieldErrorsImpl, FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import useI18n from '@hooks/use-i18n';
import { LANGUAGES } from '@types';

import { en, vi } from './i18n';

type SelectHeadlessProps = {
  data?: ItemType[];
  selectHeader?: boolean;
  withoutBorder?: boolean;
  selected?: ItemType | null;
  fieldData?: ControllerRenderProps<FieldValues, string>;
  label?: string | DefaultTFuncReturn | JSX.Element;
  icon?: JSX.Element;
  errors?: FieldError | undefined | FieldErrorsImpl;
  onChangeValue?: (selectedAuto: ItemType) => void;
  wrapperClassName?: string;
  isRequire?: boolean | undefined;
  disable?: boolean;
} & ComponentPropsWithRef<'input'>;

export type ItemType = {
  label: string;
  value: string | number;
};

const SelectHeadless = ({
  data = [{ label: 'Not found data', value: 0 }],
  selectHeader = false,
  withoutBorder = false,
  fieldData,
  label,
  wrapperClassName,
  isRequire,
  selected = { label: '', value: '' },
  errors,
  icon = <KeyboardArrowDownIcon fontSize="medium" className="text-gray-400" />,
  onChangeValue,
  disable = false,
  ...props
}: SelectHeadlessProps) => {
  const translate = useI18n({
    name: SelectHeadless.name,
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
  const [selectedAuto, setSelectedAuto] = useState<ItemType | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (selectedAuto !== null && onChangeValue !== undefined) {
      onChangeValue(selectedAuto);
    }
    if (selectedAuto === null && onChangeValue !== undefined) {
      onChangeValue({
        value: '',
        label: '',
      });
    }
  }, [selectedAuto]);

  useEffect(() => {
    if (selected === null) setSelectedAuto(selected);
  }, [selected]);

  const filteredData =
    query === ''
      ? data
      : data.filter(person =>
          person?.label?.toLowerCase().replace(/\s+/g, '').includes(query?.toLowerCase().replace(/\s+/g, ''))
        );
  function onInputChange(event: React.SyntheticEvent) {
    setQuery((event.target as HTMLInputElement).value);
    if (onChangeValue !== undefined) {
      onChangeValue({
        value: (event.target as HTMLInputElement).value,
        label: 'typing',
      });
    }
  }

  return (
    <div className={twMerge('flex flex-col gap-y-2 ', wrapperClassName)}>
      {label && (
        <label htmlFor="name" className="flex select-none">
          {label}
          {isRequire && <p className="ml-1 text-red-500">*</p>}
        </label>
      )}
      <Combobox disabled={disable} value={selected} onChange={setSelectedAuto} {...fieldData}>
        <div
          className={twMerge(
            clsx(
              props.className,
              'relative cursor-pointer border-l-[1px] border-solid border-secondary  text-left ',
              !withoutBorder && 'border-[1px] border-solid  border-secondary rounded-[4px] hover:border-[black] ',
              errors && 'border-error',
              selectHeader && 'border-none',
              disable && 'bg-secondary hover:border-transparent opacity-70'
            )
          )}
        >
          <div className="relative flex cursor-default overflow-hidden w-full h-[100%] items-center justify-between  ">
            <Combobox.Input
              className={clsx(
                'h-[100%] w-full rounded-[4px] border-none pl-[8px] leading-5 focus:ring-0 placeholder-secondary text-ellipsis	',
                selectHeader && 'font-semibold text-xl',
                disable && 'bg-secondary'
              )}
              placeholder={props.placeholder}
              displayValue={(item: ItemType) => item?.label || ''}
              onChange={event => onInputChange(event)}
              onBlur={() => {
                if (query === '') {
                  setSelectedAuto(null);
                }
              }}
            />
            <Combobox.Button className=" inset-y-1 right-0 flex items-center pr-[5px] cursor-pointer">
              {icon}
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              setQuery('');
            }}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[99]">
              {filteredData.length === 0 && query !== '' ? (
                <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                  {translate('NOT_FOUND')}
                </div>
              ) : (
                filteredData.map(item => (
                  <Combobox.Option
                    key={item.value}
                    className={({ active }) =>
                      `relative font-medium cursor-pointer select-none py-2 px-4 ${
                        active ? 'bg-secondary-light ' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {item.label}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {errors && <p className="text-sm text-red-500">{errors?.message?.toString()}</p>}
    </div>
  );
};

export default SelectHeadless;
