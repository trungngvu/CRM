import { Button } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import useI18n from '@hooks/use-i18n';
import { UserProps } from '@types';

import Table from '../../core/table';
import languages from './i18n';

type PopupAddMemberProps = {
  handleClose: () => void;
  isOpen?: boolean;
  data?: UserProps[] | undefined;
  listUsers: DataDisplay[];
  setListUsers: Dispatch<SetStateAction<DataDisplay[]>>;
};

export type DataDisplay = {
  STT?: string | number;
  id: string | number;
  name: string;
  email: string | JSX.Element;
  view?: string | JSX.Element;
  add?: string | JSX.Element;
  edit?: string | JSX.Element;
  delete?: string | JSX.Element;
  all?: string | JSX.Element;
  removeMember?: string | JSX.Element;
};

const PopupAddMember = ({ handleClose, isOpen, data, setListUsers, listUsers }: PopupAddMemberProps) => {
  const [selectUsers, setSelectUsers] = useState<DataDisplay[]>(listUsers);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    setSelectUsers(listUsers);
  }, [isOpen]);

  useEffect(() => {
    if (selectUsers !== listUsers && selectUsers.length > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [selectUsers, isOpen]);

  const translate = useI18n(languages);

  const columns = [
    { value: 'id', label: translate('ID') },
    { value: 'name', label: translate('FULL_NAME') },
    { value: 'email', label: translate('EMAIL') },
  ];

  const handleConfirmSelect = () => {
    setListUsers(selectUsers);
    handleClose();
  };

  const tableData = (data || []).map((value, index) => ({
    id: value.id,
    STT: index + 1,
    name: value?.fullName,
    email: value?.email,
  }));

  return (
    <div className="w-[790px] p-5 bg-white">
      <div className="flex justify-between">
        <div className="text-[20px] font-bold mb-2">{translate('SELECT_MEMBER')}</div>
        <img
          alt="close icon"
          src="/assets/icons/popup-close.svg"
          className="-translate-y-4 cursor-pointer"
          role="presentation"
          onClick={handleClose}
        />
      </div>
      {data ? (
        <Table
          columns={columns}
          data={tableData}
          searchOptions={{
            display: true,
            rootData: data,
            searchByValue: 'fullName',
          }}
          selectOptions={{
            display: true,
            selectedList: selectUsers,
            setSelectList: setSelectUsers,
          }}
        />
      ) : (
        <span>{translate('NOT_FOUND')}</span>
      )}

      <div className="flex justify-end pt-[20px]">
        <Button
          sx={{
            fontSize: '16px',
          }}
          onClick={handleClose}
        >
          {translate('CANCEL')}
        </Button>
        <Button
          sx={{
            fontSize: '16px',
          }}
          onClick={handleConfirmSelect}
          variant="contained"
          disabled={isDisable}
        >
          {translate('CONFIRM')}
        </Button>
      </div>
    </div>
  );
};

export default PopupAddMember;
