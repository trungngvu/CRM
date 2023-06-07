import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { KeyboardEvent, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Checkbox, Input, Loading, PopupAddMember, TextEditor } from '@components';
import { SaveIcon } from '@components/core/icons';
import { DataDisplay } from '@components/popups/popup-add-member';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { API_DATE_FORMAT } from '@src/app/configs';
import useModal from '@src/app/hooks/use-modal';
import { useGetProjectByIdQuery, useGetUsersQuery, useUpdateProjectMutation } from '@store';
import { FIELD_TYPE, PAGES, PROJECT_AND_TASK_STATUS, SelectItem, UpdateProjectProps } from '@types';

import languages from './i18n';

const { NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;
const { SELECT, DATE } = FIELD_TYPE;

const AddProject = (): JSX.Element => {
  const navigate = useNavigate();
  const translate = useI18n(languages);

  const { close, Popup } = useModal();

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id');

  const getUsers = useGetUsersQuery();
  const { data: projectData } = useGetProjectByIdQuery({ id: projectId });

  const [updateProject, { isLoading, isSuccess, isError }] = useUpdateProjectMutation();

  const [valueDescription, setValueDescription] = useState<string | null>(null);
  const [listUsers, setListUsers] = useState<DataDisplay[]>([]);
  const [isDisable, setIsDisable] = useState(false);

  const schema = Yup.object({
    name: Yup.string().nullable().required(translate('NAME_ERROR').toString()),
    startDate: Yup.date().nullable().typeError(translate('DATE_ERROR_START').toString()),
    endDate: Yup.date()
      .nullable()
      .typeError(translate('DATE_ERROR_END').toString())
      .min(Yup.ref('startDate'), translate('END_DATE_ERROR').toString()),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: '',
      name: '',
      startDate: null,
      endDate: null,
      managerId: null,
      description: '',
      status: '',
      member: [],
    },
  });

  const dataSelect: SelectItem[] = [];
  if (getUsers) {
    getUsers.data?.data.forEach(user => {
      dataSelect.push({
        label: user?.fullName,
        value: user?.id,
      });
    });
  }

  const handleDeleteMember = (id: number | string) => {
    setListUsers(listUsers.filter(item => item.id !== id));
  };

  const onSubmit = async (data: FieldValues) => {
    const configListUsers: number[] = listUsers.map(item => +item.id);

    const dataPost = Object.assign(data, { description: valueDescription || '' }, { users: configListUsers });

    Object.keys(dataPost).forEach(key => {
      if (key === 'startDate' || key === 'endDate') {
        const dateFormat = dayjs(dataPost[key]).format(API_DATE_FORMAT).toString();
        dataPost[key] = dateFormat;
      }
      if (dataPost[key]?.value !== undefined) {
        dataPost[key] = dataPost[key].value;
      }

      if (dataPost[key] === null || dataPost[key] === '' || dataPost[key] === 'Invalid Date') {
        delete dataPost[key];
      }
    });

    await updateProject(dataPost as UpdateProjectProps);
  };

  const onChangeDsc = (_event: Event, editor: typeof ClassicEditor) => {
    const dataDsc = editor.getData();
    setValueDescription(dataDsc);
  };

  const handleSpcKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/^[^!-\-@\-`{-~]+$/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (projectData) {
      reset(projectData);
      const { manager, status, member: listMember, description } = projectData;

      setValue('managerId', manager ? { label: manager.fullName, value: manager.id } : null);
      setValue('status', { value: status, label: translate(status) });
      setValue(
        'member',
        listMember.map(item => item.id)
      );
      setValueDescription(description || '');

      setListUsers(
        listMember.map((member, i) => ({
          id: member.id,
          index: i + 1,
          name: member.fullName,
          email: member.email,
        }))
      );
    }
  }, [projectData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(translate('POST_SUCCESS'));
      history.push(`${PAGES.PROJECT_DETAIL}?id=${projectId}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(translate('POST_ERROR'));
  }, [isError]);

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
            color="action"
            className="text-sm  h-[32px] font-normal normal-case rounded-full"
            onClick={() => handleDeleteMember(user.id)}
          >
            {translate('DELETE')}
          </Button>
        ),
      });
    });
  }, [listUsers]);

  useEffect(() => {
    const listUsersIds = listUsers.map(user => user.id);
    const projectDataMembersIds = projectData?.member.map(user => user.id);
    const isLisUsersChange = JSON.stringify(listUsersIds) !== JSON.stringify(projectDataMembersIds);
    const isDescriptionChange = projectData?.description !== valueDescription;

    setIsDisable(isDirty || isDescriptionChange || isLisUsersChange);
  }, [isDirty, valueDescription, listUsers, projectData]);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button type="button" className="pr-3" onClick={() => navigate(-1)}>
              <img width={10} src="/assets/icons/chevron-right.svg" alt="logo" />
            </button>
            <div className="font-bold text-[20px] ">{translate('UPDATE_PROJECT')}</div>
          </div>

          <div className="flex items-center">
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
                  onKeyPress={e => handleSpcKey(e)}
                  {...field}
                />
              );
            }}
          />
        </div>

        <div className="p-3 bg-white border-solid border-[1px] border-secondary rounded-[5px]">
          <TextEditor
            config={config}
            control={control}
            onChangeDsc={onChangeDsc}
            placeholderEditor={translate('PLACEHOLDER_EDITOR').toString()}
            errors={errors}
            description={projectData?.description}
            editorErrorMess={translate('DESCRIPTION_REQUIRE').toString()}
          />
        </div>

        <Popup>
          <PopupAddMember
            setListUsers={setListUsers}
            // isOpen={isOpen}
            handleClose={close}
            data={getUsers.data?.data}
            listUsers={listUsers}
          />
        </Popup>
      </form>
    </div>
  );
};

export default AddProject;
