import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, PopupDelete, ProjectManagerNav, Table } from '@components';
import { DeleteIcon, EditIcon } from '@src/app/components/core/icons';
import Popup from '@src/app/components/core/popup';
import useI18n from '@src/app/hooks/use-i18n';
import useModal from '@src/app/hooks/use-modal';
import { useDeleteRoleByIdMutation, useGetRoleByIdQuery } from '@src/app/store';
import { LANGUAGES, PAGES } from '@types';

import { en, vi } from './i18n';

const RoleDetail = (): JSX.Element => {
  const [deleteRole, { isLoading, isSuccess, isError }] = useDeleteRoleByIdMutation();
  const { isOpen, open, close } = useModal();
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get('id');
  const navigate = useNavigate();
  const handleOnClickReturn = (): void => navigate(`${PAGES.ROLE_LIST}`);
  const translate = useI18n({
    name: RoleDetail.name,
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
  const roleTableColumn = [
    {
      value: 'name',
      label: translate('FUNCTION_NAME'),
    },
    {
      value: 'description',
      label: translate('DESCRIPTION'),
    },
  ];
  const roleTableData = [
    {
      name: 'khanh',
      description: '1',
    },
    {
      name: 'manh',
      description: '2',
    },
  ];
  const roleDetail = useGetRoleByIdQuery({ id: roleId }).data;

  useEffect(() => {
    if (isSuccess) {
      navigate(`${PAGES.ROLE_LIST}`);
      toast.success(translate('DELETE_ROLE_SUCCESS'));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.success(translate('DELETE_ROLE_FAIL'));
    }
  }, [isError]);

  const navigateEditRole = (): void => {
    navigate(`${PAGES.UPDATE_ROLE}?id=${roleId}`);
  };

  const handleDeleteRole = (): void => {
    deleteRole({ id: roleId });
  };

  return (
    <div className="p-4">
      <Popup isOpen={isOpen} onClose={close}>
        <PopupDelete
          isLoading={isLoading}
          onSubmit={handleDeleteRole}
          onCancel={close}
          header={translate('CONFIRM_DELETE_TITLE')}
          content={translate('CONFIRM_DELETE_CONTENT')}
        />
      </Popup>
      <ProjectManagerNav
        className="mb-3"
        onClickReturn={handleOnClickReturn}
        title={translate('DETAIL')}
        options={
          <>
            <Button
              iconOptions={{
                icon: EditIcon,
              }}
              className="w-full mr-3.5"
              shape="round"
              onClick={navigateEditRole}
            >
              {translate('EDIT')}
            </Button>
            <Button
              iconOptions={{
                icon: DeleteIcon,
              }}
              color="secondary"
              shape="round"
              className="w-full"
              onClick={open}
            >
              {translate('DELETE')}
            </Button>
          </>
        }
      />
      <div className="mb-4 w-full overflow-x-auto border border-secondary-light rounded-[5px] bg-white flex flex-col gap-y-3 p-3">
        <div className="border-b border-secondary-light pb-2.5">
          <span className="mr-11 text-dark">
            {translate('PERMISSION_NAME')}: <span className="font-bold">{roleDetail?.name || ''}</span>
          </span>
          <span className="text-dark">
            {translate('STATUS')}: <span className="font-bold">{translate(roleDetail?.status || '')}</span>
          </span>
        </div>
        <div className="text-base" dangerouslySetInnerHTML={{ __html: roleDetail?.description || '' }} />
      </div>
      <Table
        columns={roleTableColumn}
        data={roleTableData.map((item, index) => {
          return {
            id: index,
            name: item.name,
            description: item.description,
          };
        })}
        headerOptions={{ title: translate('FUNCTIONS_LIST') || '' }}
      />
    </div>
  );
};

export default RoleDetail;
