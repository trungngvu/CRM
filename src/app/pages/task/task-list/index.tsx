import { useEffect, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { AddIcon, Button, Loading, Status, Table, TextLink, Time } from '@components';
import history from '@history';
import { useI18n, useParams, useSelect, useStatus } from '@hooks';
import { projectActions, useAppDispatch, useGetProjectByIdQuery, useGetTasksQuery } from '@store';
import { PAGES, PRIORITY, PROJECT_AND_TASK_STATUS, TaskProps } from '@types';
import { createValueLabelData } from '@utils';

import languages from './i18n';

const { ALL, NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;
const { HIGH, MEDIUM, LOW } = PRIORITY;
const { setCurrentProject } = projectActions;

const TaskList = (): JSX.Element => {
  const [displayData, setDisplayData] = useState<TaskProps[]>([]);

  const translate = useI18n(languages);
  const projectId = useParams('projectId');
  const { data: { member: projectMembers = [] } = {} } = useGetProjectByIdQuery({ id: projectId });
  const { data: tasksData = [], isLoading: isLoadingTasks } = useGetTasksQuery({ projectId });
  const dispatch = useAppDispatch();
  const { currentStatus, SelectStatus } = useStatus();
  const { selectedItemValue: selectedAssignee = '', Select: SelectAssignee } = useSelect();
  const { selectedItemValue: selectedPriority = '', Select: SelectPriority } = useSelect();

  /**
   * Set current project with projectId param
   */
  useEffect(() => {
    dispatch(setCurrentProject({ id: projectId }));
  }, [projectId]);

  /**
   * Update display data and filter by status param
   */
  useDeepCompareEffect(() => {
    const filteredData = tasksData.filter(item => (currentStatus === ALL ? item : item?.status === currentStatus));

    setDisplayData(filteredData);
  }, [currentStatus, tasksData]);

  const goToAddTask = () => history.push(`${PAGES.ADD_TASK}?projectId=${projectId}`);

  /**
   * Select status data
   */
  const title = translate('STATUS_TITLE');
  const statusList = createValueLabelData([ALL, NOT_STARTED, IN_PROGRESS, PAUSE, COMPLETED, CANCELLED], translate);

  /**
   * Assignee data and priority data
   */
  const assigneeData = projectMembers.map(member => member?.fullName).filter(Boolean);
  const priorityData = createValueLabelData([HIGH, MEDIUM, LOW], translate);

  /**
   * Table data
   */
  const tableColumns = createValueLabelData(
    ['TASK_CODE', 'TASK_NAME', 'START_DATE', 'END_DATE', 'ASSIGNEE', 'STATUS', 'PRIORITY_LEVEL', 'ESTIMATE'],
    translate
  );
  const filteredByAssignee = (fullName: string) =>
    selectedAssignee.toString() ? fullName === selectedAssignee.toString() : true;
  const filteredByPriority = (priority: string) =>
    selectedPriority.toString() ? priority === selectedPriority.toString() : true;
  const filteredData = displayData.filter(
    ({ assignee: { fullName = '' } = {}, priority }) => filteredByAssignee(fullName) && filteredByPriority(priority)
  );
  const tableData = filteredData.map(
    ({
      id = '',
      name = '',
      startDate = '',
      endDate = '',
      assignee: { fullName = '' } = {},
      status = NOT_STARTED,
      priority = '',
      estimate: { value = '', unit = '' } = {},
    }) => ({
      id,
      TASK_CODE: <TextLink to={`${PAGES.TASK_DETAIL}?id=${id}&projectId=${projectId}`}>{id}</TextLink>,
      TASK_NAME: (
        <TextLink to={`${PAGES.TASK_DETAIL}?id=${id}&projectId=${projectId}`} className="w-full text-left">
          {name}
        </TextLink>
      ),
      START_DATE: <Time>{startDate}</Time>,
      END_DATE: <Time>{endDate}</Time>,
      ASSIGNEE: <div className="w-full text-left">{fullName}</div>,
      STATUS: <Status value={status} />,
      PRIORITY_LEVEL: <div>{translate(priority)}</div>,
      ESTIMATE: (
        <div>
          {value} {translate(unit)}
        </div>
      ),
    })
  );

  /**
   * Display loading if is loading task list
   */
  if (isLoadingTasks) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full p-4 gap-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-dark">{translate('TASK_LIST')}</div>

        <Button shape="round" iconOptions={{ icon: AddIcon, size: 20 }} onClick={goToAddTask}>
          {translate('ADD_TASK')}
        </Button>
      </div>

      <SelectStatus title={title} data={statusList} />

      <div className="flex gap-x-3">
        <SelectAssignee
          data={assigneeData}
          labelOptions={{
            text: translate('ASSIGNEE'),
          }}
          className="w-[250px]"
        />

        <SelectPriority
          data={priorityData}
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
          rootData: filteredData,
        }}
      />
    </div>
  );
};

export default TaskList;
