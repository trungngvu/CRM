import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Loading, MultiField, PopupAddMember, SelectMultiple, Table } from '@components';
import { SaveIcon } from '@components/core/icons';
import { DataDisplay } from '@components/popups/popup-add-member';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import useModal from '@hooks/use-modal';
import { useGetDepartmentByIdQuery, useGetRolesQuery, useGetUsersQuery, useUpdateDepartmentMutation } from '@store';
import { ACTIVE_STATUS, FIELD_TYPE, PAGES, SelectItem, UpdateDepartmentProps } from '@types';

import languages from './i18n';

const { INPUT, SELECT } = FIELD_TYPE;
const { ACTIVE, DEACTIVATED } = ACTIVE_STATUS;

const UpdateUserGroup = (): JSX.Element => {
  const translate = useI18n(languages);

  const { isOpen, open, close, Popup } = useModal();

  const [listUsers, setListUsers] = useState<DataDisplay[]>([]);
  const [valueDescription, setValueDescription] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  const [searchParams] = useSearchParams();
  const departmentId = searchParams.get('id');

  const getUsers = useGetUsersQuery();
  const departmentById = useGetDepartmentByIdQuery(
    { id: departmentId },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [updateDepartment, { isLoading, isSuccess, isError, error }] = useUpdateDepartmentMutation();
  const { data: dataRole } = useGetRolesQuery(undefined, { refetchOnMountOrArgChange: true });

  const navigate = useNavigate();

  const schema = Yup.object({
    name: Yup.string().nullable().required(translate('NAME_ERROR').toString()),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setError,
    setValue,
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      status: ACTIVE,
      description: '',
      users: [],
      roles: [],
    },
  });

  const listRoles: SelectItem[] = [];
  if (dataRole) {
    dataRole.data?.forEach(role => {
      listRoles.push({
        label: role.name,
        value: role.id,
      });
    });
  }

  const handleRemoveUser = (id: string | number) => {
    setListUsers(listUsers.filter(item => item.id !== id));
  };

  const onChangeDsc = (_event: Event, editor: typeof ClassicEditor) => {
    const dataDsc = editor.getData();
    setValueDescription(dataDsc);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = async (dataFields: FieldValues) => {
    const configListUsers: number[] = listUsers.map(item => +item.id);

    const dataPost = Object.assign(
      dataFields,
      { description: valueDescription },
      { users: configListUsers?.length > 0 ? configListUsers : null }
    );

    Object.keys(dataPost).forEach(key => {
      if (typeof dataPost[key]?.value !== 'undefined') {
        dataPost[key] = dataPost[key].value;
      }

      if (Array.isArray(dataFields[key]) && key !== 'users') {
        dataFields[key] = dataFields[key].map((item: SelectItem) => item.value);
      }

      if (dataPost[key] === null || dataPost[key] === '') {
        delete dataPost[key];
      }
    });

    await updateDepartment(dataPost as UpdateDepartmentProps);
  };

  useEffect(() => {
    if (departmentById.data) {
      reset(departmentById.data);
      setValue('status', {
        value: departmentById?.data.status,
        label: translate(departmentById.data.status),
      });
      if (departmentById.data.users.length > 0)
        setValue(
          'users',
          departmentById.data.users.map(item => {
            return item.id;
          })
        );

      if (departmentById.data.roles.length > 0)
        setValue(
          'roles',
          departmentById.data.roles.map(role => {
            return {
              label: role.name,
              value: role.id,
            };
          })
        );

      setListUsers(
        departmentById.data?.users?.map((member, i: number) => {
          return {
            id: member.id,
            index: i + 1,
            name: member?.fullName,
            email: member?.email,
          };
        })
      );
      if (departmentById.data.description) setValueDescription(departmentById.data.description);
    }
  }, [departmentById]);

  useEffect(() => {
    if (isSuccess) toast.success(translate('POST_SUCCESS'));
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(translate('POST_ERROR'));
  }, [isError]);

  useEffect(() => {
    listUsers.map(user => {
      return Object.assign(user, {
        removeMember: (
          <Button color="action" shape="round" onClick={() => handleRemoveUser(user.id)}>
            {translate('DELETE')}
          </Button>
        ),
      });
    });
  }, [listUsers]);

  useEffect(() => {
    if (error === 'DepartmentIsExist') {
      setError('name', { type: 'custom', message: translate('NAME_GROUP_EXIST').toString() });
    }
  }, [error, departmentById]);

  useEffect(() => {
    if (isSuccess) {
      history.push(`${PAGES.USER_GROUP_DETAIL}?id=${departmentId}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    const isLisUsersChange =
      JSON.stringify(
        listUsers.map(user => {
          return user.id;
        })
      ) ===
      JSON.stringify(
        departmentById.data?.users.map(user => {
          return user.id;
        })
      );
    if (
      isDirty ||
      (departmentById.data?.description !== null && departmentById.data?.description !== valueDescription) ||
      !isLisUsersChange
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [isDirty, valueDescription, listUsers]);

  const columns = [
    { value: 'id', label: translate('ID') },
    { value: 'name', label: translate('FULL_NAME') },
    { value: 'email', label: translate('Email') },
    { value: 'removeMember', label: translate('DELETE') },
  ];

  const config = [
    {
      type: INPUT,
      label: translate('FULL_NAME'),
      name: 'name',
      isRequire: true,
      colSpan: 2,
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
      colSpan: 1,
    },
  ];

  if (isLoading && isSuccess) {
    return <Loading />;
  }

  return (
    <div className="p-4 ">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="pr-3 cursor-pointer" onClick={handleBack}>
              <img width={10} src="/assets/icons/chevron-right.svg" alt="logo" />
            </div>
            <div className="text-xl font-bold">{translate('UPDATE_USER_GROUP')}</div>
          </div>

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

        <div className="grid gap-3 grid-cols-3 p-3 bg-white border-solid border-[1px] border-secondary-light rounded-[5px] ">
          <MultiField dataField={config} control={control} errors={errors} />

          <div className="flex flex-col col-span-3 gap-y-2">
            <label className="flex select-none">
              {translate('DESCRIPTION')}
              <p className="ml-1 text-error">*</p>
            </label>

            <CKEditor
              editor={ClassicEditor}
              data={valueDescription}
              onChange={onChangeDsc}
              config={{
                placeholder: translate('ENTER_DESCRIPTION'),
                autoGrow_onStartup: 'True',
                toolbarLocation: 'bottom',
              }}
            />
          </div>
        </div>

        <div className="grid gap-3 p-3 bg-white border-solid border-[1px] border-secondary-light rounded-[5px] ">
          <Controller
            name="roles"
            control={control}
            render={({ field }) => {
              return (
                <SelectMultiple
                  errors={errors?.roles}
                  data={listRoles}
                  fieldData={{ ...field }}
                  label={translate('ROLE').toString()}
                  className="w-fit"
                />
              );
            }}
          />
        </div>

        <div>
          <Table
            columns={columns}
            data={listUsers}
            headerOptions={{
              title: `${translate('MEMBER')}`,
              button: {
                content: `${translate('ADD_MEMBER')}`,
                action: open,
              },
            }}
          />

          <Popup>
            <PopupAddMember
              isOpen={isOpen}
              listUsers={listUsers}
              setListUsers={setListUsers}
              handleClose={close}
              data={getUsers.data?.data}
            />
          </Popup>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserGroup;
