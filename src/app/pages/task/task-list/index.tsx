import { useEffect, useState } from 'react';

import { Button, Loading, Status, Table, TextLink, Time } from '@components';
import { AddIcon } from '@components/core/icons';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import useParams from '@hooks/use-params';
import useSelect from '@hooks/use-select';
import useStatus from '@hooks/use-status';
import { projectActions, useAppDispatch, useGetProjectByIdQuery, useGetTasksQuery } from '@store';
import { LANGUAGES, PAGES, PRIORITY, PROJECT_AND_TASK_STATUS, TaskProps } from '@types';

import { en, vi } from './i18n';

const { ALL, NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;

const TaskList = (): JSX.Element => {
  const [displayData, setDisplayData] = useState<TaskProps[]>([]);

  const translate = useI18n({
    name: TaskList.name,
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
  const projectId = useParams('projectId');
  const { currentStatus, SelectStatus } = useStatus<PROJECT_AND_TASK_STATUS>({
    defaultValue: PROJECT_AND_TASK_STATUS.ALL,
  });
  const { data: projectData } = useGetProjectByIdQuery(
    { id: projectId },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: tasksData, isLoading: isLoadingTasks } = useGetTasksQuery(
    { projectId },
    { refetchOnMountOrArgChange: true }
  );

  const dispatch = useAppDispatch();
  const { selectedItemValue: selectedAssignee, Select: SelectAssignee } = useSelect({
    defaultValue: undefined,
    data: (projectData?.member || []).map(item => item?.fullName).filter(Boolean),
  });
  const { selectedItemValue: selectedPriority, Select: SelectPriority } = useSelect({
    defaultValue: undefined,
    data: [
      { value: PRIORITY.HIGH, label: translate(PRIORITY.HIGH) },
      { value: PRIORITY.MEDIUM, label: translate(PRIORITY.MEDIUM) },
      { value: PRIORITY.LOW, label: translate(PRIORITY.LOW) },
    ],
  });

  const onClickAddTask = () => history.push(`${PAGES.ADD_TASK}?projectId=${projectId}`);

  /**
   * Set current project with projectId param
   */
  useEffect(() => {
    dispatch(projectActions.setCurrentProject({ id: projectId }));
  }, [projectId]);

  /**
   * Update display data and filter by status param
   */
  useEffect(() => {
    if (tasksData) {
      setDisplayData(
        (tasksData?.data || []).filter(item => {
          if (currentStatus === ALL) {
            return item;
          }

          return item.status === currentStatus;
        })
      );
    }
  }, [currentStatus, tasksData]);

  /**
   * Select status data
   */
  const title = translate('TITLE');
  const statusList = [
    {
      value: ALL,
      label: translate(ALL),
    },
    {
      value: NOT_STARTED,
      label: translate(NOT_STARTED),
    },
    {
      value: IN_PROGRESS,
      label: translate(IN_PROGRESS),
    },
    {
      value: PAUSE,
      label: translate(PAUSE),
    },
    {
      value: COMPLETED,
      label: translate(COMPLETED),
    },
    { value: CANCELLED, label: translate(CANCELLED) },
  ];

  /**
   * Table data
   */
  const tableColumns = [
    { value: 'code', label: translate('TASK_ID') },
    { value: 'name', label: translate('TASK_NAME') },
    { value: 'startDate', label: translate('START_DATE') },
    { value: 'endDate', label: translate('END_DATE') },
    { value: 'assignee', label: translate('ASSIGNEE') },
    { value: 'status', label: translate('STATUS') },
    { value: 'priority', label: translate('PRIORITY_LEVEL') },
    { value: 'estimate', label: translate('ESTIMATE') },
  ];
  const filteredData = displayData.filter(
    item =>
      (item?.assignee?.fullName ?? '').includes(selectedAssignee ? `${selectedAssignee}` : '') &&
      item?.priority?.includes(selectedPriority ? `${selectedPriority}` : '')
  );
  const tableData = filteredData.map(value => ({
    id: value?.id,
    code: <TextLink to={`${PAGES.TASK_DETAIL}?id=${value.id}&projectId=${projectId}`}>{value?.id}</TextLink>,
    name: (
      <div className="w-full text-left">
        <TextLink to={`${PAGES.TASK_DETAIL}?id=${value.id}&projectId=${projectId}`}>{value?.name}</TextLink>
      </div>
    ),
    startDate: <Time>{value?.startDate}</Time>,
    endDate: <Time>{value?.endDate}</Time>,
    assignee: <div className="w-full text-left">{value?.assignee?.fullName}</div>,
    status: <Status value={value?.status} />,
    priority: <div>{translate(value.priority)}</div>,
    estimate: (
      <div>
        {value?.estimate?.value} {translate(value?.estimate?.unit)}
      </div>
    ),
  }));
  const searchData = filteredData.map(value => ({
    name: value.name,
  }));

  /**
   * Display loading if is loading get task list
   */
  if (isLoadingTasks) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full p-4 gap-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-dark">{translate('TASK_LIST')}</div>

        <Button
          shape="round"
          iconOptions={{
            icon: AddIcon,
            size: 20,
          }}
          onClick={onClickAddTask}
        >
          {translate('ADD_TASK')}
        </Button>
      </div>

      <SelectStatus title={title} data={statusList} />

      <div className="flex gap-x-3">
        <SelectAssignee
          labelOptions={{
            text: translate('ASSIGNEE'),
          }}
          className="w-[250px]"
        />

        <SelectPriority
          labelOptions={{
            text: translate('PRIORITY_LEVEL'),
          }}
          className="w-[250px]"
        />
      </div>

      <Table
        columns={tableColumns}
        data={tableData}
        searchOptions={{
          display: true,
          searchData,
        }}
      />
    </div>
  );
};

export default TaskList;
