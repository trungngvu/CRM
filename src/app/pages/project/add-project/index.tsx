import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { KeyboardEvent, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Checkbox, Input, Loading, PopupAddMember, Table, TextEditor } from '@components';
import { BackIcon, DeleteIcon, Icon, SaveIcon } from '@components/core/icons';
import { DataDisplay } from '@components/popups/popup-add-member';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { API_DATE_FORMAT } from '@src/app/configs';
import useModal from '@src/app/hooks/use-modal';
import { useCreateProjectMutation, useGetUsersQuery } from '@store';
import { COLORS, CreateProjectProps, FIELD_TYPE, LANGUAGES, PAGES, PROJECT_AND_TASK_STATUS, SelectItem } from '@types';

import { en, vi } from './i18n';

const { NOT_STARTED, PAUSE, CANCELLED, COMPLETED, IN_PROGRESS } = PROJECT_AND_TASK_STATUS;
const { DARK } = COLORS;
const { SELECT, DATE } = FIELD_TYPE;

const AddProject = (): JSX.Element => {
  const translate = useI18n({
    name: AddProject.name,
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

  const { isOpen, open, close, Popup } = useModal();

  const getUsers = useGetUsersQuery();
  const [createProject, { isLoading, isSuccess, isError }] = useCreateProjectMutation();

  const [valueDescription, setValueDescription] = useState('');
  const [listUsers, setListUsers] = useState<DataDisplay[]>([]);

  const schema = Yup.object({
    name: Yup.string().nullable().required(translate('NAME_ERROR').toString()),
    startDate: Yup.date().nullable().typeError(translate('START_DATE_ERROR').toString()),
    endDate: Yup.date()
      .nullable()
      .typeError(translate('END_DATE_ERROR_2').toString())
      .min(Yup.ref('startDate'), translate('END_DATE_ERROR').toString()),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: '',
      name: '',
      startDate: null,
      endDate: null,
      managerId: '',
      description: '',
      status: NOT_STARTED,
      member: null,
    },
  });

  const dataSelect: SelectItem[] = [];
  if (getUsers) {
    getUsers.data?.data.forEach(user => {
      dataSelect.push({
        label: user?.fullName,
        value: user.id,
      });
    });
  }

  const handleRemoveUser = (id: string | number) => {
    setListUsers(listUsers.filter(item => item.id !== id));
  };

  const onSubmit = async (data: FieldValues) => {
    const configListUsers: number[] = listUsers.map(item => +item.id);

    const dataPost = Object.assign(
      data,
      { description: valueDescription },
      { users: configListUsers.length > 0 ? configListUsers : null }
    );

    Object.keys(dataPost).forEach(key => {
      if (key === 'startDate' || key === 'endDate') {
        const dateFormat = dayjs(dataPost[key]).format(API_DATE_FORMAT).toString();
        dataPost[key] = dateFormat;
      }
      if (typeof dataPost[key]?.value !== 'undefined') {
        dataPost[key] = dataPost[key].value;
      }

      if (dataPost[key] === null || dataPost[key] === '' || dataPost[key] === 'Invalid Date') {
        delete dataPost[key];
      }
    });

    await createProject(dataPost as CreateProjectProps);
  };

  const onChangeDsc = (_event: Event, editor: typeof ClassicEditor) => {
    const dataDsc = editor.getData();
    setValueDescription(dataDsc);
  };

  const handleReset = () => {
    reset();
    setValueDescription('');
    setListUsers([]);
  };

  const handleSpcKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/^[^!-\-@\-`{-~]+$/.test(e.key)) e.preventDefault();
  };

  useEffect(() => {
    listUsers.map(user => {
      return Object.assign(user, {
        view: <Checkbox />,
        add: <Checkbox />,
        edit: <Checkbox />,
        delete: <Checkbox />,
        all: <Checkbox />,
        removeMember: (
          <Button
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
    if (isSuccess) {
      toast.success(translate('POST_SUCCESS'));
      history.push(PAGES.PROJECT_LIST);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(translate('POST_ERROR'));
  }, [isError]);

  const config = [
    {
      type: DATE,
      label: translate('START_DATE'),
      name: 'startDate',
      placeholder: 'DD/MM/YYYY',
    },
    {
      type: DATE,
      label: translate('END_DATE'),
      name: 'endDate',
      placeholder: 'DD/MM/YYYY',
    },
    {
      type: SELECT,
      label: translate('MANAGER'),
      data: dataSelect,
      placeholder: translate('CHOOSE_MANAGER'),
      name: 'managerId',
    },
    {
      type: SELECT,
      label: translate('STATUS'),
      data: [
        { label: translate('NOT_STARTED'), value: NOT_STARTED },
        { label: translate('IN_PROGRESS'), value: IN_PROGRESS },
        { label: translate('PAUSE'), value: PAUSE },
        { label: translate('COMPLETED'), value: COMPLETED },
        { label: translate('CANCELLED'), value: CANCELLED },
      ],
      name: 'status',
    },
  ];

  const columns = [
    { value: 'STT', label: translate('STT') },
    { value: 'name', label: translate('FULL_NAME') },
    { value: 'email', label: translate('Email') },
    { value: 'view', label: translate('VIEW') },
    { value: 'add', label: translate('ADD') },
    { value: 'edit', label: translate('EDIT') },
    { value: 'delete', label: translate('DELETE') },
    { value: 'all', label: translate('ALL') },
    { value: 'removeMember', label: translate('REMOVE_MEMBER') },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Icon icon={BackIcon} color={DARK} to={PAGES.PROJECT_LIST} />

            <div className="font-bold text-[20px] text-dark">{translate('ADD_PROJECT')}</div>
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
              {translate('SAVE_PROJECT')}
            </Button>

            <Button
              iconOptions={{
                icon: DeleteIcon,
              }}
              color="secondary"
              onClick={handleReset}
              shape="round"
            >
              {translate('DELETE')}
            </Button>
          </div>
        </div>

        <div className="my-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  size="large"
                  placeholder={`${translate('PROJECT_NAME')}`}
                  errorOptions={{
                    message: errors.name?.message?.toString(),
                  }}
                  isLoading={isLoading}
                  onKeyPress={e => handleSpcKey(e)}
                  {...field}
                  maxLength={200}
                />
              );
            }}
          />
        </div>

        <div className="p-3 bg-white border-solid border-[1px] border-secondary rounded-[5px] placeholder__TextEditor_css">
          <TextEditor
            config={config}
            control={control}
            onChangeDsc={onChangeDsc}
            description={valueDescription}
            placeholderEditor={translate('PLACEHOLDER_EDITOR').toString()}
            errors={errors}
            editorErrorMess={translate('DESCRIPTION_REQUIRE').toString()}
          />
        </div>

        <div className="py-4">
          <Table
            columns={columns}
            data={listUsers}
            searchOptions={{
              display: true,
            }}
            headerOptions={{
              title: `${translate('MEMBER_ATTEND')}`,
              button: {
                content: translate('ADD_MEMBER'),
                action: open,
              },
            }}
          />
        </div>

        <Popup>
          <PopupAddMember
            listUsers={listUsers}
            setListUsers={setListUsers}
            isOpen={isOpen}
            handleClose={close}
            data={getUsers.data?.data}
          />
        </Popup>
      </form>
    </div>
  );
};

export default AddProject;
