import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Input, Loading, PopupAddMember, TextEditor, TrackerTask } from '@components';
import { DeleteIcon, SaveIcon } from '@components/core/icons';
import { DataDisplay } from '@components/popups/popup-add-member';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { API_DATE_FORMAT } from '@src/app/configs';
import useModal from '@src/app/hooks/use-modal';
import {
  projectActions,
  useAppDispatch,
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useGetTasksQuery,
  useGetUsersByTaskQuery,
} from '@store';
import {
  CreateTaskProps,
  ESTIMATE_UNIT,
  FIELD_TYPE,
  GetTaskResponse,
  LANGUAGES,
  PAGES,
  PRIORITY,
  PROJECT_AND_TASK_STATUS,
  SelectItem,
} from '@types';

import { en, vi } from './i18n';

const { NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;
const { DAY, HOUR } = ESTIMATE_UNIT;
const { SELECT, DATE, INPUT_SELECT, SELECT_SEARCH } = FIELD_TYPE;

const AddProject = (): JSX.Element => {
  const dispatch = useAppDispatch();
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

  const [createTask, { isLoading, isSuccess, isError }] = useCreateTaskMutation();

  const [valueDescription, setValueDescription] = useState('');
  const [listUsers, setListUsers] = useState<DataDisplay[]>([]);
  const [valueEtmTime, setValueEtmTime] = useState('');
  const [isValidateDsc, setIsValidateDsc] = useState(false);

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const taskId = searchParams.get('taskId');

  const tasksData = useGetTasksQuery({ projectId }, { refetchOnMountOrArgChange: true })?.data?.data || [];
  const listMembersInProject = useGetUsersByTaskQuery({ projectId }, { refetchOnMountOrArgChange: true });

  const schema = Yup.object({
    name: Yup.string().nullable().required(translate('NAME_ERROR').toString()),
    startDate: Yup.date().nullable().typeError(translate('START_DATE_ERROR').toString()),
    endDate: Yup.date()
      .nullable()
      .typeError(translate('END_DATE_ERROR_2').toString())
      .min(Yup.ref('startDate'), translate('END_DATE_ERROR').toString()),
    parentId: Yup.object().nullable().typeError(translate('PARENT').toString()),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: null,
      endDate: null,
      assigneeId: '',
      estimate: HOUR,
      status: NOT_STARTED,
      priority: PRIORITY.MEDIUM,
      parentId: null,
      name: '',
      description: '',
      projectId: '',
      follower: null,
    },
  });

  const dataSelect: SelectItem[] = [];
  if (listMembersInProject) {
    listMembersInProject.data?.data.forEach(user => {
      dataSelect.push({
        label: user?.fullName,
        value: user?.id,
      });
    });
  }

  const dataProjectSelect: SelectItem[] = [];
  if (tasksData) {
    tasksData.forEach(item => {
      dataProjectSelect.push({
        value: item.id,
        label: item.name,
      });
    });
  }

  let taskDetail: GetTaskResponse | undefined;
  if (taskId) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    taskDetail = useGetTaskByIdQuery({ id: taskId, projectId })?.data;
  }

  const handleRemoveUser = (id: string | number) => {
    setListUsers(listUsers.filter(item => item.id !== id));
  };

  const onChangeDsc = (_event: Event, editor: typeof ClassicEditor) => {
    const dataDsc = editor.getData();
    setValueDescription(dataDsc);
    if (valueDescription !== ' ') {
      setIsValidateDsc(false);
    }
  };

  const onSubmit = async (dataSubmit: FieldValues) => {
    const configListUsers: number[] = listUsers.map(item => +item.id);

    const dataPost = Object.assign(
      dataSubmit,
      { description: valueDescription },
      { follower: configListUsers.length > 0 ? configListUsers : null },
      { valueEtm: valueEtmTime },
      { projectId: projectId ? +projectId : null }
    );

    Object.keys(dataPost).forEach(key => {
      if (dataPost.endDate === 'Invalid Date') {
        delete dataPost.endDate;
      }
      if (key === 'startDate' || key === 'endDate') {
        const dateFormat = dayjs(dataPost[key]).format(API_DATE_FORMAT).toString();
        dataPost[key] = dateFormat;
      }
      if (typeof dataPost[key]?.value !== 'undefined') {
        dataPost[key] = dataPost[key].value;
      }
      if (key === 'estimate' && valueEtmTime !== '') {
        dataPost[key] = {
          value: +valueEtmTime,
          unit: dataPost[key],
        };
        delete dataPost.valueEtm;
      }
      if (valueEtmTime === '0' || valueEtmTime === '') {
        delete dataPost.estimate;
      }
      if (dataPost[key] === null || dataPost[key] === '' || dataPost[key] === 'Invalid Date') {
        delete dataPost[key];
      }
    });

    if (valueDescription === '') {
      setIsValidateDsc(true);
    }

    if (valueDescription !== '') {
      setIsValidateDsc(false);
      await createTask(dataPost as CreateTaskProps);
    }
  };

  const onChangeEtm = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value.length > 3) {
      event.preventDefault();
    } else {
      setValueEtmTime(event.target.value);
    }
  };

  const handleReset = () => {
    reset();
    setValueDescription('');
    setValueEtmTime('');
    setListUsers([]);
  };

  const handleSpcKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/^[^!-\-@\-`{-~]+$/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (taskId) {
      setValue('parentId', {
        value: Number(taskId),
        label: taskDetail?.name,
      });
    }
  }, [taskId]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(translate('POST_SUCCESS'));
      history.push(PAGES.TASK_LIST);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(translate('POST_ERROR'));
  }, [isError]);

  useEffect(() => {
    dispatch(projectActions.setCurrentProject({ id: projectId }));
  }, [projectId]);

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
      label: translate('ASSIGNER'),
      data: dataSelect,
      placeholder: translate('CHOOSE_ASSIGNER'),
      name: 'assigneeId',
    },
    {
      type: INPUT_SELECT,
      label: translate('ESTIMATE_TIME'),
      data: [
        {
          label: translate('HOUR'),
          value: HOUR,
        },
        {
          label: translate('DAY'),
          value: DAY,
        },
      ],
      name: 'estimate',
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

    {
      type: SELECT,
      label: translate('PRIORITY'),
      data: [
        { label: translate('MEDIUM'), value: PRIORITY.MEDIUM },
        { label: translate('HIGH'), value: PRIORITY.HIGH },
        { label: translate('LOW'), value: PRIORITY.LOW },
      ],
      name: 'priority',
    },
    {
      type: SELECT_SEARCH,
      label: translate('PARENT_TASK'),
      data: dataProjectSelect,
      placeholder: translate('CHOOSE_PARENT_TASK'),
      name: 'parentId',
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
            <Link
              className="pr-3"
              to={taskId ? `/task/detail?id=${taskId}&projectId=${projectId}` : `/task/list?projectId=${projectId}`}
            >
              <img width={10} src="/assets/icons/chevron-right.svg" alt="logo" />
            </Link>
            <div className="font-bold text-[20px] ">{translate('ADD_TASK')}</div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              iconOptions={{
                icon: SaveIcon,
                size: 18,
              }}
              shape="round"
            >
              {translate('SAVE_TASK')}
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
                  placeholder={`${translate('TASK_NAME')}`}
                  errorOptions={{
                    message: errors.name?.message?.toString(),
                  }}
                  isLoading={isLoading}
                  onKeyPress={e => handleSpcKey(e)}
                  {...field}
                />
              );
            }}
          />
        </div>

        <div className="p-3 bg-white border-solid border-[1px] border-secondary-dark rounded-[5px]">
          <TextEditor
            config={config}
            control={control}
            onChangeDsc={onChangeDsc}
            placeholderEditor={translate('PLACEHOLDER_EDITOR').toString()}
            errors={errors}
            onChangeEtm={onChangeEtm}
            isValidateDsc={isValidateDsc}
            description={valueDescription}
            valueEtmTime={valueEtmTime}
            editorErrorMess={translate('DESCRIPTION_REQUIRE').toString()}
          />
        </div>
        <Popup>
          <PopupAddMember
            listUsers={listUsers}
            setListUsers={setListUsers}
            isOpen={isOpen}
            handleClose={close}
            data={listMembersInProject.data?.data}
          />
        </Popup>
        <TrackerTask listUser={listUsers} handleOpen={open} handleRemoveUser={handleRemoveUser} />
      </form>
    </div>
  );
};

export default AddProject;
