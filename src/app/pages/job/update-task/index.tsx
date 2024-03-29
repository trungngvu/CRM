import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Checkbox, Input, Loading, PopupAddMember, TextEditor } from '@components';
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
  useGetUsersByTaskQuery,
  useUpdateTaskMutation,
} from '@store';
import { ESTIMATE_UNIT, FIELD_TYPE, PRIORITY, PROJECT_AND_TASK_STATUS, SelectItem, UpdateTaskResponse } from '@types';

import languages from './i18n';

const { NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;
const { DAY, HOUR } = ESTIMATE_UNIT;
const { SELECT, DATE, INPUT_SELECT } = FIELD_TYPE;

const UpdateTask = (): JSX.Element => {
  const translate = useI18n(languages);

  const { isOpen, close, Popup } = useModal();

  const schema = Yup.object({
    name: Yup.string().nullable().required(translate('NAME_ERROR').toString()),
    startDate: Yup.date().nullable().typeError(translate('START_DATE_ERROR').toString()),
    priority: Yup.object().nullable().required(translate('PRIORITY_REQUIRE').toString()),
    endDate: Yup.date()
      .nullable()
      .typeError(translate('END_DATE_ERROR_2').toString())
      .min(Yup.ref('startDate'), translate('END_DATE_ERROR').toString()),
  });

  const [updateTask, { isLoading, isSuccess, isError }] = useUpdateTaskMutation();
  const dispatch = useAppDispatch();

  const [valueDescription, setValueDescription] = useState('');
  const [listUsers, setListUsers] = useState<DataDisplay[]>([]);
  const [valueEtmTime, setValueEtmTime] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const taskId = searchParams.get('taskId');
  const { data: tasksList = [] } = useGetTasksQuery({ projectId });
  const dataTask = useGetTaskByIdQuery({
    projectId,
    id: taskId,
  }).data;

  const listMembersInProject = useGetUsersByTaskQuery({ projectId }, { refetchOnMountOrArgChange: true });

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
  if (listMembersInProject) {
    listMembersInProject.data?.data.forEach(user => {
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

    await updateTask(dataPost as UpdateTaskResponse);
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
      const { name, priority, startDate, endDate, status, assignee, estimate, parent, follower } = dataTask;
      setValue('name', name);
      setValue('priority', { value: priority, label: translate(priority) });
      setValue('startDate', startDate ? dayjs(startDate) : null);
      setValue('endDate', endDate ? dayjs(endDate) : null);
      setValue('status', { value: status, label: translate(status) });
      setValue('assigneeId', assignee ? { value: assignee.id, label: assignee.fullName } : null);
      setValue('estimate', estimate ? { value: estimate.unit, label: translate(estimate.unit) } : null);
      setValue('parentId', parent ? { value: parent.id, label: parent.name } : null);
      setListUsers(follower.map(member => ({ id: member.id, name: member.fullName, email: member.email })));
      setValueEtmTime(estimate?.value?.toString() || '');
      setValueDescription(dataTask.description || '');
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
    const listUsersIds = listUsers.map(user => user.id);
    const dataTaskFollowersIds = dataTask?.follower.map(user => user.id);
    const isLisUsersChange = JSON.stringify(listUsersIds) !== JSON.stringify(dataTaskFollowersIds);
    const isValueEtmChange = valueEtmTime !== (dataTask?.estimate?.value.toString() || '');
    const isDescriptionChange = valueDescription !== (dataTask?.description || '');

    setIsDisable(isDirty || isDescriptionChange || isLisUsersChange || isValueEtmChange);
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
      label: 'Thời gian',
      data: [
        { label: '3:00-4:00', value: '3:00-4:00' },
        { label: '8:00-9:00', value: '3:00-4:00' },
        { label: '8:00-9:00', value: '3:00-4:00' },
        { label: '8:00-9:00', value: '3:00-4:00' },
        { label: '8:00-9:00', value: '3:00-4:00' },
        { label: '8:00-9:00', value: '3:00-4:00' },
        { label: '8:00-9:00', value: '3:00-4:00' },
        { label: '8:00-9:00', value: '3:00-4:00' },
      ],
      placeholder: 'Thời gian hoàn thành công việc',
      name: '',
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
      type: SELECT,
      label: 'Lặp lại',
      data: [
        { label: 'Thứ 2', value: '2' },
        { label: 'Thứ 3', value: '3' },
        { label: 'Thứ 4', value: '4' },
        { label: 'Thứ 5', value: '5' },
        { label: 'Thứ 6', value: '6' },
        { label: 'Thứ 7', value: '7' },
        { label: 'Chủ nhật', value: 'CN' },
      ],
      placeholder: 'Chọn ngày',
      name: '',
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
      </form>
    </div>
  );
};

export default UpdateTask;
