import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Loading, OptionsNav, PopupDelete, Table } from '@components';
import { DeleteIcon, EditIcon } from '@components/core/icons';
import Popup from '@components/core/popup';
import useI18n from '@hooks/use-i18n';
import useModal from '@hooks/use-modal';
import { useDeleteRoleByIdMutation, useGetRoleByIdQuery } from '@store';
import { PAGES } from '@types';

import languages from './i18n';

const RoleDetail = (): JSX.Element => {
  const [deleteRole, { isLoading, isSuccess, isError }] = useDeleteRoleByIdMutation();
  const { isOpen, open, close } = useModal();
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get('id');
  const navigate = useNavigate();
  const handleOnClickReturn = (): void => navigate(`${PAGES.ROLE_LIST}`);
  const { data: roleDetail, isLoading: isLoadingRoleDetail } = useGetRoleByIdQuery(
    { id: roleId },
    { refetchOnMountOrArgChange: true }
  );
  const translate = useI18n(languages);
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

  const permissionsList = (roleDetail?.permissions || []).map((item, index) => {
    return {
      id: index,
      name: `${translate(item.name)}`,
      description: `${translate(item.name)}`,
    };
  });

  if (isLoadingRoleDetail) {
    return <Loading />;
  }

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
      <OptionsNav
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
        data={permissionsList}
        headerOptions={{ title: translate('FUNCTIONS_LIST') || '' }}
      />
    </div>
  );
};

export default RoleDetail;
