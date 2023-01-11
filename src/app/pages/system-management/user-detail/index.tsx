import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, PopupDelete, ProjectManagerNav, TagsList } from '@components';
import { DeleteIcon, EditIcon } from '@src/app/components/core/icons';
import Popup from '@src/app/components/core/popup';
import useI18n from '@src/app/hooks/use-i18n';
import useModal from '@src/app/hooks/use-modal';
import { useGetUserByIdQuery } from '@src/app/store';
import { Department, LANGUAGES, PAGES } from '@types';

import { en, vi } from './i18n';
import UserDetailInfo from './user-detail-info';

const UserDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const userDetail = useGetUserByIdQuery({ id: userId })?.data;

  const { close, isOpen, open } = useModal();
  const translate = useI18n({
    name: UserDetail.name,
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

  const handleDeleteUser = (): void => {
    close();
  };
  const handleClickBack = (): void => {
    navigate(PAGES.USER_LIST);
  };
  const handleEditUser = (): void => {
    navigate(`${PAGES.UPDATE_USER}?id=${userId}`);
  };
  const optionNav = (
    <div className="flex items-center justify-center">
      <Button
        shape="round"
        iconOptions={{
          icon: EditIcon,
        }}
        className="mr-3.5"
        onClick={handleEditUser}
      >
        {translate('EDIT')}
      </Button>
      <Button
        shape="round"
        iconOptions={{
          icon: DeleteIcon,
        }}
        onClick={open}
        color="secondary"
      >
        {translate('DELETE')}
      </Button>
    </div>
  );
  const tagsListData = [
    {
      title: translate('GROUP_USER'),
      tags:
        userDetail?.department?.map((item: Department) => {
          return {
            name: item.name,
            url: '',
          };
        }) || [],
    },
    {
      title: translate('SET_PERMISSION'),
      tags:
        userDetail?.roles?.map(item => {
          return {
            name: item.name,
            url: '',
          };
        }) || [],
    },
  ];
  return (
    <div className="flex flex-col min-h-[calc(100vh-58px)] p-4">
      <Popup isOpen={isOpen} onClose={close}>
        <PopupDelete
          isLoading={false}
          onSubmit={handleDeleteUser}
          onCancel={close}
          header={translate('CONFIRM_DELETE_USER')}
          content={translate('ARE_YOU_SURE_WANT_TO_DELETE')}
        />
      </Popup>
      <ProjectManagerNav
        className="mb-3"
        title={translate('USER_DETAIL')}
        onClickReturn={handleClickBack}
        options={optionNav}
      />
      <div className="shadow-2 border border-secondary-light rounded-[5px] bg-white py-3 px-4 flex gap-x-[29px] gap-y-[5px] mb-4">
        <div className="grow-[1] flex flex-col gap-y-[8px]">
          <UserDetailInfo
            title={translate('FULL_NAME')}
            description={`${userDetail?.firstName || ''} ${userDetail?.lastName || ''}`}
          />
          <UserDetailInfo title="Email" description={userDetail?.email || ''} />
          <UserDetailInfo title={translate('PHONE_NUMBER')} description={userDetail?.phone || ''} />
        </div>
        <div className="grow-[2] flex flex-col gap-y-[8px]">
          <UserDetailInfo
            title={translate('STATUS')}
            description={userDetail?.status ? translate(userDetail.status) : ''}
          />
          <UserDetailInfo title={translate('GENDER')} description="Nam" />
        </div>
      </div>
      <TagsList titleClass="min-w-[135px] mr-6" data={tagsListData} />
    </div>
  );
};
export default UserDetail;
