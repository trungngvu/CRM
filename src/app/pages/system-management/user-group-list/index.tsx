import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, PopupDelete, Table, TextLink } from '@components';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { AddIcon, DeleteIcon, EditIcon } from '@src/app/components/core/icons';
import useModal from '@src/app/hooks/use-modal';
import useStatus from '@src/app/hooks/use-status';
import { useDeleteDepartmentByIdMutation, useGetDepartmentsQuery } from '@store';
import { DepartmentProps, LANGUAGES, PAGES, USER_GROUP_STATUS } from '@types';

import { en, vi } from './i18n';

const { ALL, ACTIVE, DEACTIVATE } = USER_GROUP_STATUS;

const UserGroupList = (): JSX.Element => {
  const { open, close, Popup } = useModal();
  const [idGroup, setIdGroup] = useState<number>();
  const { refetch, data } = useGetDepartmentsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [deleteGroup, { isLoading, isError, isSuccess }] = useDeleteDepartmentByIdMutation();
  const [displayData, setDisplayData] = useState<DepartmentProps[]>([]);
  const { currentStatus, SelectStatus } = useStatus<USER_GROUP_STATUS>({
    defaultValue: USER_GROUP_STATUS.ALL,
  });

  const translate = useI18n({
    name: UserGroupList.name,
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

  const columns = [
    { value: 'stt', label: translate('STT') },
    { value: 'name', label: translate('NAME') },
    {
      value: 'status',
      label: translate('STATUS'),
    },
    { value: 'actions', label: translate('ACTIONS') },
  ];

  const handlePopup = (id: number) => {
    open();
    setIdGroup(id);
  };

  const handleUpdateUserGroup = (id: number) => {
    history.push(`${PAGES.UPDATE_USER_GROUP}/?id=${id}`);
  };

  const dataTable = displayData.map((value, key) => ({
    id: value.id,
    stt: key + 1,
    name: (
      <div className="w-full text-left">
        <TextLink to={`${PAGES.USER_GROUP_DETAIL}?id=${value.id}`}>{value?.name}</TextLink>{' '}
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
          onClick={() => handleUpdateUserGroup(value.id)}
        >
          {translate('EDIT')}
        </Button>
        <Button
          color="action"
          shape="round"
          iconOptions={{
            icon: DeleteIcon,
          }}
          onClick={() => handlePopup(value.id)}
        >
          {translate('DELETE')}
        </Button>
      </div>
    ),
  }));

  const tableSearchData = displayData.map(value => ({
    name: value?.name,
  }));

  // const handleAddUserGroup = () => {
  //   history.push(`${PAGES.ADD_USER_GROUP}`);
  // };

  const handleDeleteGroup = async () => {
    if (idGroup) await deleteGroup({ id: idGroup });
    close();
    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(translate('DELETE_GROUP_SUCCESS'));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(translate('DELETE_GROUP_FAIL'));
    }
  }, [isError]);

  useEffect(() => {
    history.push({
      pathname: PAGES.USER_GROUP_LIST,
      search: `?status=${currentStatus}`,
    });
  }, [currentStatus]);

  useEffect(() => {
    if (data) {
      setDisplayData(
        (data?.data || []).filter(item => {
          if (currentStatus === ALL) {
            return item;
          }

          return item.status === currentStatus;
        })
      );
    }
  }, [currentStatus, data]);

  return (
    <div className="mx-4 my-[17px] flex flex-col gap-y-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xl font-bold">{translate('USER_GROUP_LIST')}</div>
        <Link to={PAGES.ADD_USER_GROUP}>
          <Button
            iconOptions={{
              icon: AddIcon,
            }}
            className="normal-case rounded-[20px]"
          >
            {translate('ADD_GROUP_USER')}
          </Button>
        </Link>
      </div>
      <SelectStatus title={title} data={statusList} />

      <Table
        columns={columns}
        data={dataTable}
        searchOptions={{
          display: true,
          searchData: tableSearchData,
        }}
      />
      <Popup>
        <PopupDelete
          isLoading={isLoading}
          onSubmit={handleDeleteGroup}
          onCancel={close}
          header={translate('DELETE_GROUP_CONFIRM')}
          content={translate('DELETE_GROUP_CONFIRM_QUESTION')}
        />
      </Popup>
    </div>
  );
};

export default UserGroupList;
