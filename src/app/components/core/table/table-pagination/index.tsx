import MuiPagination from '@mui/material/Pagination';
import { clsx } from 'clsx';
import { ChangeEvent } from 'react';

import { COLORS } from '@types';

const { DARK, LIGHT, SECONDARY, PRIMARY } = COLORS;

type TablePaginationProps = {
  isDisplayRowsPerPage: boolean;
  SelectRows: JSX.Element;
  totalPage: number;
  onChangePage: (value: number) => void;
};

const TablePagination = ({
  isDisplayRowsPerPage = false,
  SelectRows,
  totalPage,
  onChangePage,
}: TablePaginationProps): JSX.Element => {
  const handleOnChange = (_event: ChangeEvent<unknown>, page: number) => onChangePage(page);

  return (
    <div
      className={clsx(
        {
          'justify-between': isDisplayRowsPerPage,
          'justify-end': !isDisplayRowsPerPage,
        },
        'flex px-[10px] bg-secondary-light items-center h-[45px]'
      )}
    >
      {isDisplayRowsPerPage && SelectRows}

      <MuiPagination
        variant="outlined"
        count={totalPage}
        onChange={handleOnChange}
        sx={{
          '.MuiPaginationItem-root': {
            margin: 0,
            borderRadius: 0,
            border: 'none',
            borderRight: `1px solid ${SECONDARY}`,
            height: '30px',
          },
          '.MuiButtonBase-root': {
            backgroundColor: 'white',
            color: DARK,
            height: '30px',
          },
          '.MuiPagination-ul > li': {
            height: '30px',
          },
          '.MuiButtonBase-root.Mui-selected': {
            backgroundColor: PRIMARY,
            color: LIGHT,
          },
          '.MuiButtonBase-root.MuiPaginationItem-root:hover': {
            backgroundColor: PRIMARY,
            color: LIGHT,

            '& svg.MuiSvgIcon-root': {
              color: LIGHT,
            },
          },
          'svg.MuiSvgIcon-root': {
            color: PRIMARY,
          },
          '.MuiPagination-ul > li:first-of-type > button': {
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
          },
          '.MuiPagination-ul > li:last-of-type > button': {
            borderTopRightRadius: 3,
            borderBottomRightRadius: 3,
            borderRight: 'none',
          },
        }}
      />
    </div>
  );
};

export default TablePagination;
