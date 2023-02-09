import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Loading, MultiField } from '@components';
import { BackIcon, Icon, SaveIcon } from '@components/core/icons';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { useCreateUserMutation, useGetDepartmentsQuery, useGetRolesQuery } from '@store';
import { ACTIVE_STATUS, COLORS, CreateUserProps, FIELD_TYPE, GENDER, PAGES, SelectItem } from '@types';

import languages from './i18n';

const { DARK } = COLORS;
const { ACTIVE, DEACTIVATED } = ACTIVE_STATUS;
const { MALE, FEMALE, OTHER } = GENDER;
const { SELECT_MULTIPLE, INPUT, SELECT } = FIELD_TYPE;

const AddUser = () => {
  const translate = useI18n(languages);
  const { data: dataRoles } = useGetRolesQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: dataDepartment } = useGetDepartmentsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [createUser, { isLoading, isSuccess, isError }] = useCreateUserMutation();

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
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      gender: null,
      status: ACTIVE,
      department: [],
      roles: [],
    },
  });

  const onSubmit = (data: FieldValues) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value?.value !== undefined) {
        data[key] = value.value;
      }
      if (Array.isArray(value) && value[0]?.value) {
        data[key] = value.map((item: SelectItem) => +item.value);
      }
      if (value === null || value === '' || value?.length < 1) {
        delete data[key];
      }
    });

    createUser(data as CreateUserProps);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(translate('POST_SUCCESS'));
      history.push(PAGES.USER_LIST);
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
        { label: translate(DEACTIVATED), value: DEACTIVATED },
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
