import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Loading, PopupDelete, Table, TextLink } from '@components';
// import history from '@history';
import useI18n from '@hooks/use-i18n';
import { AddIcon, DeleteIcon, EditIcon } from '@src/app/components/core/icons';
import Popup from '@src/app/components/core/popup';
import useModal from '@src/app/hooks/use-modal';
import useStatus from '@src/app/hooks/use-status';
import { useDeleteRoleByIdMutation, useGetRolesQuery } from '@src/app/store';
import history from '@src/browser-history';
import { LANGUAGES, PAGES, RoleProps, USER_GROUP_STATUS } from '@types';

import { en, vi } from './i18n';

const { ALL, ACTIVE, DEACTIVATE } = USER_GROUP_STATUS;

const RoleList = (): JSX.Element => {
  const { data, refetch } = useGetRolesQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteRole, { isLoading, isError, isSuccess }] = useDeleteRoleByIdMutation();
  const [idRole, setIdRole] = useState<number>();
  const [displayData, setDisplayData] = useState<RoleProps[]>([]);
  const { currentStatus, SelectStatus } = useStatus<USER_GROUP_STATUS>({
    defaultValue: USER_GROUP_STATUS.ALL,
  });
  const { isOpen, open, close } = useModal();

  const translate = useI18n({
    name: RoleList.name,
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
    history.push(`${PAGES.UPDATE_ROLE}/?id=${id}`);
  };

  const columns = [
    { value: 'stt', label: translate('STT') },
    { value: 'name', label: translate('NAME') },
    {
      value: 'status',
      label: translate('STATUS'),
    },
    { value: 'actions', label: translate('ACTIONS') },
  ];

  const tableSearchData = displayData.map(value => ({
    name: value?.name,
  }));

  const handlePopupDelete = (id: number) => {
    open();
    setIdRole(id);
  };

  const handleDeleteRole = () => {
    if (idRole) deleteRole({ id: idRole });
    close();
    refetch();
  };

  const dataTable = displayData.map((value, key) => ({
    id: value.id,
    stt: key + 1,
    name: (
      <div className="w-full text-left">
        <TextLink to={`${PAGES.ROLE_DETAIL}?id=${value.id}`}>{value?.name}</TextLink>{' '}
      </div>
    ),
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
    if (isSuccess) {
      toast.success(translate('DELETE_ROLE_SUCCESS'));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(translate('DELETE_ROLE_FAIL'));
    }
  }, [isError]);

  useEffect(() => {
    history.push({
      pathname: PAGES.ROLE_LIST,
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
        <div className="text-xl font-bold text-dark">{translate('ROLE_LIST')}</div>

        <Link to={PAGES.ADD_ROLE}>
          <Button
            shape="round"
            color="primary"
            iconOptions={{
              icon: AddIcon,
            }}
          >
            {translate('ADD_ROLE')}
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
          onSubmit={handleDeleteRole}
          onCancel={close}
          header={translate('DELETE_ROLE_CONFIRM')}
          content={translate('DELETE_ROLE_CONFIRM_QUESTION')}
        />
      </Popup>
    </div>
  );
};

export default RoleList;
