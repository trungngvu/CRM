import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Loading, PopupDelete, Table, TextLink } from '@components';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { AddIcon, DeleteIcon, EditIcon } from '@src/app/components/core/icons';
import Popup from '@src/app/components/core/popup';
import useModal from '@src/app/hooks/use-modal';
import useStatus from '@src/app/hooks/use-status';
import { useDeleteUserByIdMutation, useGetUsersQuery } from '@src/app/store';
import { LANGUAGES, PAGES, USER_GROUP_STATUS, UserProps } from '@types';

import { en, vi } from './i18n';

const { ALL, ACTIVE, DEACTIVATE } = USER_GROUP_STATUS;

const UserList = (): JSX.Element => {
  const { data, refetch } = useGetUsersQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteUser, { isError, isLoading, isSuccess }] = useDeleteUserByIdMutation();
  const [displayData, setDisplayData] = useState<UserProps[]>([]);
  const [idUser, setIdUser] = useState<number>();
  const { isOpen, open, close } = useModal();

  const { currentStatus, SelectStatus } = useStatus<USER_GROUP_STATUS>({
    defaultValue: USER_GROUP_STATUS.ALL,
  });

  const translate = useI18n({
    name: UserList.name,
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
  const title = translate('TITLE');
  const statusList = [
    {
      value: ALL,
      label: translate(ALL),
    },
    {
      value: ACTIVE,
      label: translate(ACTIVE),
    },
    {
      value: DEACTIVATE,
      label: translate(DEACTIVATE),
    },
  ];

  const handelUpdate = (id: number) => {
    history.push(`${PAGES.UPDATE_USER}/?id=${id}`);
  };

  const columns = [
    { value: 'stt', label: translate('STT') },
    { value: 'name', label: translate('NAME') },
    {
      value: 'email',
      label: translate('EMAIL'),
    },
    {
      value: 'status',
      label: translate('STATUS'),
    },
    { value: 'actions', label: translate('ACTIONS') },
  ];

  const tableSearchData = displayData.map(value => ({
    name: value.fullName && value.fullName,
  }));

  const handlePopupDelete = (id: number) => {
    setIdUser(id);
    open();
  };

  const handleDeleteUser = async () => {
    if (idUser) await deleteUser({ id: idUser });
    close();
    refetch();
  };

  const dataTable = displayData.map((value, key) => ({
    id: value.id,
    stt: key + 1,
    name: (
      <div className="w-full text-left">
        <TextLink to={`${PAGES.USER_DETAIL}?id=${value.id}`}>{`${value?.firstName} ${value.lastName}`}</TextLink>
      </div>
    ),
    email: value.email,
    status: `${translate(`${value.status}`)}`,
    actions: (
      <div className="flex flex-row gap-[12px]">
        <Button
          color="action"
          shape="round"
          size="medium"
          iconOptions={{
            icon: EditIcon,
          }}
          onClick={() => handelUpdate(value.id)}
        >
          {translate('EDIT')}
        </Button>
        <Button
          color="action"
          shape="round"
          iconOptions={{
            icon: DeleteIcon,
          }}
          onClick={() => handlePopupDelete(value.id)}
        >
          {translate('DELETE')}
        </Button>
      </div>
    ),
  }));

  useEffect(() => {
    if (isError) {
      toast.error(translate('DELETE_USER_FAIL'));
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(translate('DELETE_USER_SUCCESS'));
    }
  }, [isSuccess]);

  useEffect(() => {
    history.push({
      pathname: PAGES.USER_LIST,
      search: `?status=${currentStatus}`,
    });
  }, [currentStatus]);

  useEffect(() => {
    if (data) {
      setDisplayData(
        (data.data || []).filter(item => {
          if (currentStatus === ALL) {
            return item;
          }

          return item.status === currentStatus;
        })
      );
    }
  }, [currentStatus, data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full p-4 gap-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-dark">{translate('USER_LIST')}</div>

        <Link to={PAGES.ADD_USER}>
          <Button
            shape="round"
            color="primary"
            iconOptions={{
              icon: AddIcon,
            }}
          >
            {translate('ADD_USER')}
          </Button>
        </Link>
      </div>

      <SelectStatus data={statusList} title={title} />

      <Table
        columns={columns}
        data={dataTable}
        searchOptions={{
          display: true,
          searchData: tableSearchData,
        }}
      />

      <Popup isOpen={isOpen} onClose={close}>
        <PopupDelete
          isLoading={isLoading}
          onSubmit={handleDeleteUser}
          onCancel={close}
          header={translate('DELETE_USER_CONFIRM')}
          content={translate('DELETE_USER_CONFIRM_QUESTION')}
        />
      </Popup>
    </div>
  );
};

export default UserList;
