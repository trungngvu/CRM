import { Combobox } from '@headlessui/react';
import { ChangeEvent, ComponentPropsWithRef, useEffect, useState } from 'react';

import useI18n from '@hooks/use-i18n';
import { COLORS } from '@types';

import { ExpandMoreIcon, Icon, SearchIcon } from '../core/icons';
import CheckIcon from '../core/icons/check';
import PopupAbsolute from '../popup-absolute';
import languages from './i18n';

type SelectPopoverProps = {
  data?: ItemType[];
  selected?: ItemType | null;
  onChangeValue?: (selectedAuto: ItemType) => void;
} & ComponentPropsWithRef<'input'>;

export type ItemType = {
  label: string;
  value: string | number;
};

const { DARK, PRIMARY } = COLORS;

const SelectPopover = ({
  data = [{ label: '', value: 0 }],
  selected = { label: '', value: '' },
  onChangeValue,
}: SelectPopoverProps) => {
  const translate = useI18n(languages);
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

  const filteredData =
    query === ''
      ? data
      : data.filter(person =>
          person?.label?.toLowerCase().replace(/\s+/g, '').includes(query?.toLowerCase().replace(/\s+/g, ''))
        );

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery((event.target as HTMLInputElement).value);
    if (onChangeValue !== undefined) {
      onChangeValue({
        value: (event.target as HTMLInputElement).value,
        label: 'typing',
      });
    }
  };

  return (
    <PopupAbsolute
      button={<Icon icon={ExpandMoreIcon} size={24} color={DARK} />}
      beforeButton={
        <span className="w-full max-w-lg rounded-[4px] pl-[8px] truncate font-semibold text-xl">
          {selected !== null ? selected.label : ''}
        </span>
      }
      popupStyle="w-[560px] max-h-80 text-base sm:text-sm z-40"
    >
      <Combobox value={selected} onChange={setSelectedAuto}>
        <div className="sticky top-0 z-50 py-3 pl-4 pr-3 bg-white">
          <div className="flex items-center pr-2 border rounded-md border-secondary-extraLight focus:border-secondary-extraLight">
            <Combobox.Input
              className="w-full pl-2 text-sm font-light leading-5 border-transparent rounded-md focus:ring-0 focus:border-transparent placeholder-secondary text-ellipsis"
              placeholder={translate('SEARCH')}
              onChange={event => onInputChange(event)}
            />
            <Icon icon={SearchIcon} size={24} color={DARK} />
          </div>
        </div>
        <Combobox.Options static>
          {filteredData.length === 0 && query !== '' ? (
            <div className="px-4 py-2 cursor-default select-none text-dark">{translate('NOT_FOUND')}</div>
          ) : (
            filteredData.map(item => (
              <Combobox.Option
                key={item.value}
                className={({ active }) =>
                  `font-medium cursor-pointer select-none py-2 px-4 ${
                    active ? 'bg-primary-extraLight text-light ' : 'text-dark'
                  }`
                }
                value={item}
              >
                <div className="flex items-center place-content-between gap-2">
                  <p>{item.label}</p>
                  {item === selected ? <Icon icon={CheckIcon} size={16} color={PRIMARY} /> : ''}
                </div>
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </PopupAbsolute>
  );
};

export default SelectPopover;
