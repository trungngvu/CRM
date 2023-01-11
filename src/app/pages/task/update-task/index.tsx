import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Checkbox, Input, Loading, PopupAddMember, TextEditor, TrackerTask } from '@components';
import { SaveIcon } from '@components/core/icons';
import { DataDisplay } from '@components/popups/popup-add-member';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import useModal from '@src/app/hooks/use-modal';
import {
  projectActions,
  useAppDispatch,
  useGetTaskByIdQuery,
  useGetTasksQuery,
  useGetUsersQuery,
  useUpdateTaskMutation,
} from '@store';
import {
  ESTIMATE_UNIT,
  FIELD_TYPE,
  LANGUAGES,
  PRIORITY,
  PROJECT_AND_TASK_STATUS,
  SelectItem,
  UpdateTaskResponse,
} from '@types';

import { en, vi } from './i18n';

const { NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;
const { DAY, HOUR } = ESTIMATE_UNIT;
const { SELECT, DATE, INPUT_SELECT, SELECT_SEARCH } = FIELD_TYPE;

const UpdateTask = (): JSX.Element => {
  const translate = useI18n({
    name: UpdateTask.name,
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

  const schema = Yup.object({
    name: Yup.string().nullable().required(translate('NAME_ERROR').toString()),
    startDate: Yup.date().nullable().typeError(translate('START_DATE_ERROR').toString()),
    priority: Yup.object().nullable().required(translate('PRIORITY_REQUIRE').toString()),
    endDate: Yup.date()
      .nullable()
      .typeError(translate('END_DATE_ERROR_2').toString())
      .min(Yup.ref('startDate'), translate('END_DATE_ERROR').toString()),
  });

  const getUsers = useGetUsersQuery();
  const [updateTask, { isLoading, isSuccess, isError }] = useUpdateTaskMutation();
  const dispatch = useAppDispatch();

  const [valueDescription, setValueDescription] = useState('');
  const [listUsers, setListUsers] = useState<DataDisplay[]>([]);
  const [valueEtmTime, setValueEtmTime] = useState('');
  const [isValidateDsc, setIsValidateDsc] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const taskId = searchParams.get('id');
  const tasksList = useGetTasksQuery({ projectId })?.data?.data || [];
  const dataTask = useGetTaskByIdQuery({
    projectId,
    id: taskId,
  }).data;

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: taskId ? +taskId : null,
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
  if (getUsers) {
    getUsers.data?.data.forEach(user => {
      dataSelect.push({
        label: user?.fullName,
        value: user?.id,
      });
    });
  }

  const dataTaskSelect: SelectItem[] = [];
  if (tasksList) {
    tasksList.forEach(item => {
      dataTaskSelect.push({
        value: item?.id,
        label: item.name,
      });
    });
  }

  const handleRemoveUser = (id: string | number) => {
    setListUsers(listUsers.filter(item => item.id !== id));
  };

  const onChangeEtm = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value.length > 3) {
      event.preventDefault();
    } else {
      setValueEtmTime(event.target.value);
    }
  };

  const handleSpcKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/^[^!-\-@\-`{-~]+$/.test(e.key)) {
      e.preventDefault();
    }
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
        const dateFormat = dayjs(dataPost[key]).format('MM-DD-YYYY').toString();
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
      if (valueEtmTime === '') {
        delete dataPost.estimate;
      }
      if (dataPost[key] === null || dataPost[key] === '' || dataPost[key] === 'Invalid Date') {
        delete dataPost[key];
      }
    });

    setIsValidateDsc(true);

    if (valueDescription !== '') {
      setIsValidateDsc(false);
      await updateTask(dataPost as UpdateTaskResponse);
    }
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
            className="text-sm h-[32px] font-normal normal-case rounded-full"
            onClick={() => handleRemoveUser(user.id)}
          >
            {translate('DELETE')}
          </Button>
        ),
      });
    });
  }, [listUsers]);

  useEffect(() => {
    if (isSuccess) toast.success(translate('POST_SUCCESS'));
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(translate('POST_ERROR'));
  }, [isError]);

  useEffect(() => {
    if (dataTask) {
      setValue('id', dataTask?.id);
      setValue('name', dataTask?.name);
      setValue('priority', {
        value: dataTask.priority,
        label: translate(dataTask.priority),
      });
      if (dataTask.startDate) {
        setValue('startDate', dayjs(dataTask?.startDate));
      }
      if (dataTask.endDate) {
        setValue('endDate', dayjs(dataTask.endDate));
      }
      setValue('status', {
        value: dataTask?.status,
        label: translate(dataTask.status),
      });
      if (dataTask.assignee) {
        setValue('assigneeId', {
          value: dataTask?.assignee?.id,
          label: dataTask?.assignee?.fullName,
        });
      }
      if (dataTask.estimate) {
        setValue('estimate', {
          value: dataTask?.estimate?.unit,
          label: translate(dataTask?.estimate?.unit),
        });
      }
      if (dataTask.parent) {
        setValue('parentId', {
          value: dataTask.parent?.id,
          label: dataTask?.parent.name,
        });
      }
      setListUsers(
        dataTask.follower.map(member => {
          return {
            id: member?.id,
            name: member?.fullName,
            email: member.email,
          };
        })
      );
      if (dataTask.estimate?.value) setValueEtmTime(dataTask.estimate?.value.toString());
      if (dataTask.description) setValueDescription(dataTask.description);
    }
  }, [dataTask]);

  useEffect(() => {
    dispatch(projectActions.setCurrentProject({ id: projectId }));
  }, [projectId]);

  useEffect(() => {
    if (isSuccess) {
      history.back();
    }
  }, [isSuccess]);

  useEffect(() => {
    const isLisUsersChange =
      JSON.stringify(
        listUsers.map(user => {
          return user.id;
        })
      ) !==
      JSON.stringify(
        dataTask?.follower.map(user => {
          return user.id;
        })
      );

    const isDescriptionChange = dataTask?.description !== valueDescription;

    const validStr = (value: string | null | undefined | number) => value || '';
    const isValueEtmChange = valueEtmTime !== validStr(dataTask?.estimate?.value.toString());

    if (isDirty || isDescriptionChange || isLisUsersChange || isValueEtmChange) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [isDirty, valueDescription, listUsers, valueEtmTime]);

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
      data: dataTaskSelect,
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
            <Link className="pr-3" to={`/task/detail?id=${taskId}&projectId=${projectId}`}>
              <img width={10} src="/assets/icons/chevron-right.svg" alt="logo" />
            </Link>
            <div className="font-bold text-[20px] ">{translate('EDIT_TASK')}</div>
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
              isLoading={isLoading}
            >
              {translate('SAVE_TASK')}
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

        <div className="p-3 bg-white border-solid border-[1px] border-secondary rounded-[5px]">
          <TextEditor
            config={config}
            control={control}
            onChangeDsc={onChangeDsc}
            placeholderEditor={translate('PLACEHOLDER_EDITOR').toString()}
            errors={errors}
            onChangeEtm={onChangeEtm}
            description={valueDescription}
            valueEtmTime={valueEtmTime}
            editorErrorMess={translate('DESCRIPTION_REQUIRE').toString()}
            isValidateDsc={isValidateDsc}
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
        <TrackerTask listUser={listUsers} handleOpen={open} handleRemoveUser={handleRemoveUser} />
      </form>
    </div>
  );
};

export default UpdateTask;
