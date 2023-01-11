import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Loading, MultiField } from '@components';
import { BackIcon, Icon, SaveIcon } from '@components/core/icons';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { useGetDepartmentsQuery, useGetRolesQuery, useGetUserByIdQuery, useUpdateUserMutation } from '@store';
import { COLORS, FIELD_TYPE, GENDER, LANGUAGES, PAGES, SelectItem, UpdateUserProps, USER_GROUP_STATUS } from '@types';

import { en, vi } from './i18n';

const { DARK } = COLORS;
const { ACTIVE, DEACTIVATE } = USER_GROUP_STATUS;
const { MALE, FEMALE, OTHER } = GENDER;
const { SELECT_MULTIPLE, INPUT, SELECT } = FIELD_TYPE;

const AddUser = () => {
  const translate = useI18n({
    name: AddUser.name,
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

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');

  const { data: dataRoles } = useGetRolesQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: dataDepartment } = useGetDepartmentsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [updateUser, { isLoading, isSuccess, isError }] = useUpdateUserMutation();
  const userDetail = useGetUserByIdQuery(
    { id: userId },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [isDisable, setIsDisable] = useState(false);

  const listRoles: SelectItem[] = [];
  if (dataRoles) {
    dataRoles.data?.forEach(role => {
      listRoles.push({
        label: role.name,
        value: role.id,
      });
    });
  }

  const listGroupUser: SelectItem[] = [];
  if (dataDepartment) {
    dataDepartment.data?.forEach(role => {
      listGroupUser.push({
        label: role.name,
        value: role.id,
      });
    });
  }

  const schema = Yup.object({
    fullName: Yup.string().nullable().required(translate('NAME_REQUIRE').toString()),
    email: Yup.string()
      .nullable()
      .required(translate('EMAIL_REQUIRE').toString())
      .email(`${translate('EMAIL_ERROR')}`),
    status: Yup.object().nullable().required(translate('STATUS_REQUIRE').toString()),
    department: Yup.array().nullable().required(translate('DEPARTMENT_REQUIRE').toString()),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: userId,
      fullName: '',
      email: '',
      phone: '',
      gender: null,
      status: ACTIVE,
      department: [],
      roles: [],
    },
  });
  const onSubmit = async (data: FieldValues) => {
    Object.keys(data).forEach(key => {
      if (typeof data[key]?.value !== 'undefined') {
        data[key] = data[key].value;
      }

      if (Array.isArray(data[key])) {
        data[key] = data[key].map((item: SelectItem) => item.value);
      }

      if (data[key] === null || data[key] === '' || data[key] === 'Invalid Date' || data[key]?.length < 1) {
        delete data[key];
      }
    });

    await updateUser(data as UpdateUserProps);
  };

  useEffect(() => {
    if (userDetail?.data) {
      if (userDetail.data.fullName) setValue('fullName', userDetail.data.fullName);
      if (userDetail.data.email) setValue('email', userDetail.data.email);
      if (userDetail.data.phone) setValue('phone', userDetail.data.phone);
      setValue('status', {
        value: userDetail?.data.status,
        label: translate(userDetail.data.status),
      });
      setValue('gender', {
        value: userDetail?.data.gender,
        label: translate(userDetail.data.gender),
      });
      if (userDetail.data.roles.length > 0)
        setValue(
          'roles',
          userDetail.data.roles.map(role => {
            return {
              label: role.name,
              value: role.id,
            };
          })
        );

      if (userDetail.data.department.length > 0)
        setValue(
          'department',
          userDetail.data.department.map(item => {
            return {
              label: item.name,
              value: item.id,
            };
          })
        );
    }
  }, [userDetail]);

  useEffect(() => {
    setIsDisable(isDirty);
  }, [isDirty]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(translate('POST_SUCCESS'));
      history.push(`${PAGES.USER_DETAIL}?id=${userId}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(translate('POST_ERROR'));
  }, [isError]);

  const config = [
    {
      type: INPUT,
      label: translate('FULL_NAME'),
      name: 'fullName',
      isRequire: true,
    },
    {
      type: INPUT,
      label: translate('Email'),
      name: 'email',
      isRequire: true,
    },
    {
      type: INPUT,
      label: translate('PHONE_NUMBER'),
      name: 'phone',
    },
    {
      type: SELECT,
      label: translate('STATUS'),
      data: [
        { label: translate(ACTIVE), value: ACTIVE },
        { label: translate(DEACTIVATE), value: DEACTIVATE },
      ],
      name: 'status',
      isRequire: true,
    },
    {
      type: SELECT,
      label: translate('GENDER'),
      data: [
        { label: translate(MALE), value: MALE },
        { label: translate(FEMALE), value: FEMALE },
        { label: translate(OTHER), value: OTHER },
      ],
      placeholder: translate('CHOOSE_GENDER'),
      name: 'gender',
    },
  ];

  const configSecond = [
    {
      type: SELECT_MULTIPLE,
      label: translate('DEPARTMENT'),
      data: listGroupUser,
      placeholder: translate('CHOOSE_DEPARTMENT'),
      name: 'department',
      isRequire: true,
    },
    {
      type: SELECT_MULTIPLE,
      label: translate('ROLE'),
      data: listRoles,
      placeholder: translate('CHOOSE_ROLE'),
      name: 'roles',
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col p-4">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Icon icon={BackIcon} color={DARK} to={PAGES.PROJECT_LIST} />

            <div className="font-bold text-[20px] text-dark">{translate('ADD_USER')}</div>
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              type="submit"
              iconOptions={{
                icon: SaveIcon,
                size: 18,
              }}
              shape="round"
              color={isDisable ? 'primary' : 'secondary'}
              disabled={!isDisable && true}
            >
              {translate('SAVE')}
            </Button>
          </div>
        </div>

        <div className="p-3 grid gap-4 grid-cols-3 bg-white border-solid border-[1px] border-secondary rounded-[5px] ">
          <MultiField dataField={config} control={control} errors={errors} />
        </div>
        <div className="p-3 grid gap-4 grid-cols-2 bg-white border-solid border-[1px] border-secondary rounded-[5px] ">
          <MultiField dataField={configSecond} control={control} errors={errors} />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
