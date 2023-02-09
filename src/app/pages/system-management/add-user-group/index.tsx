import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Loading, MultiField, PopupAddMember, SelectMultiple, Table } from '@components';
import { DeleteIcon, SaveIcon } from '@components/core/icons';
import { DataDisplay } from '@components/popups/popup-add-member';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import useModal from '@src/app/hooks/use-modal';
import { useCreateDepartmentMutation, useGetRolesQuery, useGetUsersQuery } from '@store';
import { ACTIVE_STATUS, CreateDepartmentProps, FIELD_TYPE, PAGES, SelectItem } from '@types';

import '../../task/task-list';
import languages from './i18n';

const { INPUT, SELECT } = FIELD_TYPE;
const { ACTIVE, DEACTIVATED } = ACTIVE_STATUS;

const AddUserGroup = (): JSX.Element => {
  const translate = useI18n(languages);

  const { isOpen, open, close, Popup } = useModal();

  const getUsers = useGetUsersQuery();

  const [createDepartment, { isLoading, isSuccess, isError, error }] = useCreateDepartmentMutation();
  const { data: dataRole } = useGetRolesQuery(undefined, { refetchOnMountOrArgChange: true });

  const [listUsers, setListUsers] = useState<DataDisplay[]>([]);
  const [valueDescription, setValueDescription] = useState('');
  const [isValidateDsc, setIsValidateDsc] = useState(false);

  const schema = Yup.object({
    name: Yup.string().nullable().required(translate('NAME_ERROR').toString()),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      status: ACTIVE,
      description: '',
      users: null,
      roles: [],
    },
  });

  const listGroupUser: SelectItem[] = [];
  if (dataRole) {
    dataRole.data?.forEach(role => {
      listGroupUser.push({
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
    // if (valueDescription !== ' ') {
    //   setIsValidateDsc(false);
    // }
  };

  const onSubmit = async (data: FieldValues) => {
    const configListUsers: number[] = listUsers.map(item => +item.id);

    const dataPost = Object.assign(
      data,
      { description: valueDescription },
      { users: configListUsers.length > 0 ? configListUsers : null }
    );

    Object.keys(dataPost).forEach(key => {
      if (dataPost[key]?.value !== undefined) {
        dataPost[key] = dataPost[key].value;
      }

      if (Array.isArray(data[key]) && key !== 'users') {
        data[key] = data[key].map((item: SelectItem) => item.value);
      }

      if (dataPost[key] === null || dataPost[key] === '') {
        delete dataPost[key];
      }
    });

    if (valueDescription === '') {
      setIsValidateDsc(true);
    }

    if (valueDescription !== '') {
      setIsValidateDsc(false);

      await createDepartment(dataPost as CreateDepartmentProps);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(translate('POST_SUCCESS'));
      history.push(PAGES.USER_GROUP_LIST);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(translate('POST_ERROR'));
  }, [isError]);

  useEffect(() => {
    listUsers.map(user => {
      return Object.assign(user, {
        removeMember: (
          <Button
            color="action"
            shape="round"
            iconOptions={{
              icon: DeleteIcon,
            }}
            onClick={() => handleRemoveUser(user.id)}
          >
            {translate('DELETE')}
          </Button>
        ),
      });
    });
  }, [listUsers]);

  useEffect(() => {
    if (error) {
      setError('name', { type: 'custom', message: translate('NAME_GROUP_EXIST').toString() });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      history.push(PAGES.USER_GROUP_LIST);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (valueDescription !== '') {
      setIsValidateDsc(false);
    }
  }, [valueDescription]);

  const columns = [
    { value: 'id', label: translate('ID') },
    { value: 'name', label: translate('FULL_NAME') },
    { value: 'email', label: translate('Email') },
    { value: 'removeMember', label: translate('DELETE') },
  ];

  const config = [
    {
      type: INPUT,
      label: translate('GROUP_NAME'),
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
            <Link className="pr-3" to={PAGES.USER_GROUP_LIST}>
              <img width={10} src="/assets/icons/chevron-right.svg" alt="logo" />
            </Link>
            <div className="font-bold text-[20px] ">{translate('ADD_USER_GROUP')}</div>
          </div>

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
              isValidateDsc={isValidateDsc}
              onChange={onChangeDsc}
              config={{
                placeholder: translate('ENTER_DESCRIPTION'),
                autoGrow_onStartup: 'True',
                toolbarLocation: 'bottom',
              }}
            />
            {isValidateDsc && <p className="text-sm text-error">{translate('DESCRIPTION_REQUIRE')}</p>}
          </div>
        </div>

        <div className=" p-3 bg-white border-solid border-[1px] border-secondary-light rounded-[5px] ">
          <Controller
            name="roles"
            control={control}
            render={({ field }) => {
              return (
                <SelectMultiple
                  errors={errors?.roles}
                  data={listGroupUser}
                  fieldData={{ ...field }}
                  label={translate('ROLE').toString()}
                  placeholder={translate('CHOOSE_PERMISSION').toString()}
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

export default AddUserGroup;
