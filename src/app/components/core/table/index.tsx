import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { SETTINGS_CONFIG } from '@configs';
import { useI18n, useSelect } from '@hooks';
import { filterByKeyword } from '@utils';

import Checkbox from '../checkbox';
import { SearchIcon } from '../icons';
import Input from '../input';
import TablePagination from './table-pagination';
import TableTitle from './table-title';

const { TABLE_ROW_VALUES } = SETTINGS_CONFIG;

export type TableProps<T> = {
  columns: {
    value: string;
    label: string;
  }[];
  data: T[];
  searchOptions?: {
    display?: boolean;
    searchByValue?: string;
    rootData?: { [key: string]: unknown }[];
  };
  selectOptions?: {
    display?: boolean;
    selectedList: T[];
    setSelectList: Dispatch<SetStateAction<T[]>>;
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
  const { display: isDisplaySearch = false, searchByValue = 'name', rootData = [] } = searchOptions || {};
  const { display: isDisplaySelect = false, selectedList = [], setSelectList = () => {} } = selectOptions || {};
  const {
    display: isDisplayRowsPerPage = true,
    values: rowsPerPageValues = TABLE_ROW_VALUES,
    defaultValue: defaultRowsPerPage = TABLE_ROW_VALUES[0],
  } = rowsPerPageOptions || {};
  const { title, button: { content: buttonContent = '', action: buttonAction = () => {} } = {} } = headerOptions || {};

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [searchedData, setSearchData] = useState(data);
  const [displayData, setDisplayData] = useState(searchedData);

  const translate = useI18n();
  const { selectedItemValue: rowsPerPage, Select: SelectRows } = useSelect();

  /**
   * Filter data by search value
   */
  useEffect(() => {
    const filteredData = data.filter((item, index) => {
      const dataBySearchValue = (rootData[index] || {})[searchByValue];

      if (!dataBySearchValue) {
        if (searchValue) {
          return false;
        }

        return item;
      }

      return filterByKeyword(`${dataBySearchValue}`, searchValue);
    });

    setSearchData(filteredData);
  }, [searchValue, data]);

  /**
   * Filter display data by page number
   */
  useEffect(() => {
    if (!rowsPerPage) {
      setDisplayData(searchedData);
    } else {
      const dataByPage = searchedData.filter(
        (_item, index) => index <= page * Number(rowsPerPage) - 1 && index >= (page - 1) * Number(rowsPerPage)
      );

      setDisplayData(dataByPage);
    }
  }, [page, searchedData, rowsPerPage]);

  const totalPage = Math.ceil(searchedData.length / Number(rowsPerPage)) || 1;
  const isSelectAll = displayData.every(row => selectedList.map(item => item.id).includes(row.id));

  const onChangePage = (value: number) => setPage(value);
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);
  const onSelectRow = (id: string | number) => {
    const selectedRow = displayData.find(item => item.id === id) as T;

    const newCheckedList = selectedList.map(item => item.id).includes(id)
      ? selectedList.filter(item => item.id !== id)
      : [...selectedList, selectedRow];

    setSelectList(newCheckedList);
  };
  const onSelectAll = () => {
    const newCheckedList = isSelectAll
      ? selectedList.filter(row => !displayData.map(item => item.id).includes(row.id))
      : [...displayData, ...selectedList];

    setSelectList(newCheckedList);
  };

  return (
    <div className="w-full overflow-x-auto border border-secondary-light rounded-[5px] bg-white flex flex-col gap-y-[10px] p-[12px]">
      {(title || buttonContent) && (
        <TableTitle title={title} buttonContent={buttonContent} buttonAction={buttonAction} />
      )}

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
          <div className="border rounded-[5px] border-b-0 overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary-light">
                <tr>
                  {isDisplaySelect && (
                    <th className="border-r border-r-secondary">
                      <div className="flex items-center justify-center px-3 h-[50px]">
                        <Checkbox onChange={onSelectAll} checked={isSelectAll} />
                      </div>
                    </th>
                  )}

                  {columns.map(({ value, label }) => (
                    <th key={value} className="border-r last:border-r-0 border-r-secondary">
                      <div className="px-3 font-normal whitespace-nowrap h-[50px] flex justify-center items-center text-dark">
                        {label}
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
              SelectRows={
                <SelectRows
                  size="small"
                  data={rowsPerPageValues}
                  defaultSelectedValue={defaultRowsPerPage}
                  className="w-[70px]"
                />
              }
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
