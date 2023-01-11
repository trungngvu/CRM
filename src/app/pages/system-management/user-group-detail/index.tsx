import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, PopupDelete, ProjectManagerNav, Table, TagsList } from '@components';
import { DeleteIcon, EditIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';
import useModal from '@src/app/hooks/use-modal';
import { useDeleteDepartmentByIdMutation, useGetDepartmentByIdQuery } from '@store';
import { LANGUAGES, PAGES } from '@types';

import { en, vi } from './i18n';

const UserGroupDetail = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const departmentId = searchParams.get('id');
  const navigate = useNavigate();
  const { open, close, Popup } = useModal();
  const departmentDetail = useGetDepartmentByIdQuery({ id: departmentId }, { refetchOnMountOrArgChange: true })?.data;
  const [deleteDepartment, { isLoading, isSuccess, isError }] = useDeleteDepartmentByIdMutation();
  const translate = useI18n({
    name: UserGroupDetail.name,
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
  const memberTableColumn = [
    {
      value: 'number',
      label: translate('NUMBER'),
    },
    {
      value: 'fullName',
      label: translate('FULL_NAME'),
    },
    {
      value: 'email',
      label: 'Email',
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      navigate(PAGES.USER_GROUP_LIST);
      toast.success(translate('DELETE_USER_GROUP_TOASTIFY_SUCCESS'), {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
        pauseOnHover: false,
      });
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error(translate('DELETE_USER_GROUP_TOASTIFY_FAIL'), {
        autoClose: 4000,
        pauseOnHover: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (departmentDetail !== undefined && !departmentDetail) {
      toast.error(translate('USER_GROUP_NOT_EXIST'), {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
        pauseOnHover: false,
      });
    }
  }, [departmentDetail]);

  const handleDeleteUserGroupDetail = async () => {
    await deleteDepartment({ id: departmentId });
    close();
  };

  const membersTableData =
    departmentDetail?.users?.map((user, index) => {
      return {
        id: user.id,
        number: index + 1,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`,
        email: user?.email || '',
      };
    }) || [];

  const optionElement = (
    <div className="flex items-center justify-center">
      <Link to={`${PAGES.UPDATE_USER_GROUP}?id=${departmentId}`}>
        <Button
          shape="round"
          iconOptions={{
            icon: EditIcon,
          }}
          className="mr-3.5"
        >
          {translate('EDIT')}
        </Button>
      </Link>
      <Button
        shape="round"
        onClick={open}
        iconOptions={{
          icon: DeleteIcon,
        }}
        color="secondary"
      >
        {translate('DELETE')}
      </Button>
    </div>
  );
  const handleOnClickReturn = (): void => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col p-4 min-h-[calc(100vh-58px)]">
      <Popup>
        <PopupDelete
          isLoading={isLoading}
          onSubmit={handleDeleteUserGroupDetail}
          onCancel={close}
          header={translate('DELETE_USER_GROUP_DETAIL_CONFIRM')}
          content={translate('DELETE_USER_GROUP_DETAIL_QUESTION')}
        />
      </Popup>

      <ProjectManagerNav
        className="mb-3"
        onClickReturn={handleOnClickReturn}
        title={translate('USER_GROUP_DETAIL')}
        options={departmentDetail ? optionElement : ''}
      />
      {departmentDetail && (
        <>
          <div className="mb-4 w-full overflow-x-auto border border-secondary-light rounded-[5px] bg-white flex flex-col gap-y-3 p-3">
            <div className="border-b border-secondary-light pb-2.5">
              <span className="mr-11 text-dark">
                {translate('GROUP_NAME')}: <span className="font-bold">{departmentDetail?.name || ''}</span>
              </span>
              <span className="text-dark">
                {translate('STATUS')}: <span className="font-bold">{translate(departmentDetail?.status || '')}</span>
              </span>
            </div>
            <div className="text-base" dangerouslySetInnerHTML={{ __html: departmentDetail?.description || '' }} />
          </div>
          {departmentDetail.roles.length > 0 && (
            <TagsList
              data={[
                {
                  title: translate('ACCESS_RIGHTS'),
                  tags: departmentDetail.roles.map(role => {
                    return {
                      name: role.name,
                      url: '',
                    };
                  }),
                },
              ]}
              className="mb-4"
            />
          )}
          <div className="mb-4">
            <Table
              columns={memberTableColumn}
              data={membersTableData}
              headerOptions={{ title: translate('MEMBER_LIST') || '' }}
            />
          </div>
        </>
      )}
      {!departmentDetail && (
        <div className="border border-secondary-light rounded-[5px] bg-white p-3">
          {translate('USER_GROUP_NOT_EXIST')}
        </div>
      )}
    </div>
  );
};

export default UserGroupDetail;
