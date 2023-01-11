import { clsx } from 'clsx';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { SearchIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';
import useSelect from '@hooks/use-select';
import { LANGUAGES } from '@types';
import { removeUndefinedValueObject } from '@utils';

import Checkbox from '../checkbox';
import Input from '../input';
import { en, vi } from './i18n';
import TablePagination from './table-pagination';
import TableTitle from './table-title';

export type TableProps<T> = {
  columns: {
    value: string;
    label: string;
  }[];
  data: T[];
  searchOptions?: {
    display?: boolean;
    searchByValue?: string;
    searchData?: { [key: string]: string | number }[];
  };
  selectOptions?: {
    display?: boolean;
    selectedList: T[];
    onChangeSelectedList: Dispatch<SetStateAction<T[]>>;
  };
  rowsPerPageOptions?: {
    display?: boolean;
    values?: number[];
    defaultValue?: number;
  };
  headerOptions?: {
    title?: string | JSX.Element;
    button?: {
      content: string;
      action: () => void;
    };
  };
};

const Table = <T extends { [key: string]: string | number | JSX.Element; id: string | number }>({
  columns,
  data,
  searchOptions,
  selectOptions,
  rowsPerPageOptions,
  headerOptions,
}: TableProps<T>): JSX.Element => {
  const { display: isDisplaySearch = false, searchByValue = 'name', searchData = [] } = searchOptions || {};
  const { display: isDisplaySelect = false, selectedList = [], onChangeSelectedList = () => {} } = selectOptions || {};
  const {
    display: isDisplayRowsPerPage = true,
    values: rowsPerPageValues = [10, 20, 50, 100],
    defaultValue: defaultRowsPerPage = 10,
  } = rowsPerPageOptions || {};
  const { title, button } = headerOptions || {};
  const { content: buttonContent, action: buttonAction } = button || {};

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [searchedData, setSearchData] = useState(data);
  const [displayData, setDisplayData] = useState(searchedData);

  const translate = useI18n({
    name: Table.name,
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
  const { selectedItemValue: rowsPerPage, Select: SelectRows } = useSelect({
    defaultValue: defaultRowsPerPage,
    data: rowsPerPageValues,
  });

  const onChangePage = (value: number) => setPage(value);
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);
  const onSelectRow = (id: string | number) => {
    const selectedRow = displayData.find(item => item.id === id) as T;

    const newCheckedList = selectedList.map(item => item.id).includes(id)
      ? selectedList.filter(item => item.id !== id)
      : [...selectedList, selectedRow];

    onChangeSelectedList(newCheckedList);
  };
  const checkDupDisplayData = (el: T) => {
    for (let i = 0; i <= displayData.length; i += 1) {
      if (displayData[i]?.id === el?.id) return false;
    }
    return true;
  };

  const onSelectAll = () => {
    const isIncludeAll = displayData.every(value => selectedList.map(item => item.id).includes(value.id));
    onChangeSelectedList(
      isIncludeAll
        ? selectedList.filter(el => checkDupDisplayData(el))
        : [...displayData, ...selectedList.filter(el => checkDupDisplayData(el))]
    );
  };

  /**
   * Filter data by search value
   */
  useEffect(() => {
    setSearchData(
      data.filter((item, index) => {
        const dataBySearchValue = (searchData[index] || {})[searchByValue];

        if (!dataBySearchValue) {
          if (searchValue) {
            return false;
          }

          return item;
        }

        return dataBySearchValue
          .toString()
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(searchValue.toLowerCase().replace(/\s+/g, ''));
      })
    );
  }, [searchValue, data]);

  /**
   * Filter display data by page number
   */
  useEffect(() => {
    if (!rowsPerPage) {
      setDisplayData(searchedData);
    } else {
      setDisplayData(
        searchedData.filter(
          (_item, index) => index <= page * Number(rowsPerPage) - 1 && index >= (page - 1) * Number(rowsPerPage)
        )
      );
    }
  }, [page, searchedData, rowsPerPage]);

  const totalPage = Math.ceil(searchedData.length / Number(rowsPerPage)) || 1;
  const tableTitleProps = removeUndefinedValueObject({ title, buttonContent });
  tableTitleProps.buttonAction = buttonAction;

  return (
    <div className="w-full overflow-x-auto border border-secondary-light rounded-[5px] bg-white flex flex-col gap-y-[10px] p-[12px]">
      {(title || buttonContent) && <TableTitle {...tableTitleProps} />}

      {isDisplaySearch && (
        <div className="flex items-center">
          <Input
            value={searchValue}
            onChange={onChangeSearch}
            iconOptions={{
              icon: SearchIcon,
              position: 'right',
            }}
            placeholder={`${translate('SEARCH')}`}
            className="w-[320px]"
            maxLength={50}
          />
        </div>
      )}

      {displayData.length > 0 && (
        <div className="w-full bg-white">
          <div
            className={clsx(
              {
                'border-b-0': !isDisplayRowsPerPage || data.length <= Number(rowsPerPage),
              },
              'border border-secondary-light rounded-[5px]'
            )}
          >
            <table className="w-full">
              <thead className="bg-secondary-light">
                <tr>
                  {isDisplaySelect && (
                    <th className="border-r border-r-secondary">
                      <div className="flex items-center justify-center px-3 h-[50px]">
                        <Checkbox
                          onChange={onSelectAll}
                          checked={displayData.every(row => selectedList.map(item => item.id).includes(row.id))}
                        />
                      </div>
                    </th>
                  )}

                  {columns.map(column => (
                    <th key={column.value} className="border-r last:border-r-0 border-r-secondary">
                      <div className="px-3 font-normal whitespace-nowrap h-[50px] flex justify-center items-center text-dark">
                        {column.label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {displayData.map(row => (
                  <tr
                    key={row.id}
                    className="text-center bg-white border-b border-b-secondary last:border-b-secondary-light"
                  >
                    {isDisplaySelect && (
                      <td className="border-r border-secondary-light">
                        <div className="flex items-center justify-center px-3">
                          <Checkbox
                            checked={selectedList.map(item => item.id).includes(row.id)}
                            onChange={() => onSelectRow(row.id)}
                          />
                        </div>
                      </td>
                    )}

                    {columns.map(column => (
                      <td key={column.value} className="px-6 py-3 border-r border-secondary-light last:border-r-0">
                        <div className="flex justify-center">{row[column.value]}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <TablePagination
              isDisplayRowsPerPage={isDisplayRowsPerPage}
              SelectRows={SelectRows}
              totalPage={totalPage}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      )}

      {displayData.length === 0 && <div className="w-full bg-white text-dark">{translate('NO_DATA')}</div>}
    </div>
  );
};

export default Table;
