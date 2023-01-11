import { useEffect, useState } from 'react';

import Button from '@components/core/button';
import AddIcon from '@components/core/icons/add';
import Loading from '@components/core/loading';
import Table from '@components/core/table';
import TextLink from '@components/core/text-link';
import Time from '@components/core/time';
import Status from '@components/status';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import useRoles from '@hooks/use-roles';
import useStatus from '@hooks/use-status';
import { projectActions, useAppDispatch, useGetProjectsQuery } from '@store';
import { LANGUAGES, PAGES, PROJECT_AND_TASK_STATUS, ProjectProps } from '@types';

import { en, vi } from './i18n';

const { ALL, NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;

const ProjectList = (): JSX.Element => {
  const [displayData, setDisplayData] = useState<ProjectProps[]>([]);

  const translate = useI18n({
    name: ProjectList.name,
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
  const { currentStatus, SelectStatus } = useStatus<PROJECT_AND_TASK_STATUS>({
    defaultValue: PROJECT_AND_TASK_STATUS.ALL,
  });
  const { data: projectData, isLoading } = useGetProjectsQuery(undefined, { refetchOnMountOrArgChange: true });
  const dispatch = useAppDispatch();
  const { isAdmin } = useRoles();

  /**
   * Reset current project ID when in page list of project
   */
  useEffect(() => {
    dispatch(projectActions.resetCurrentProject());
  }, []);

  /**
   * Filter data by status
   */
  useEffect(() => {
    if (projectData) {
      setDisplayData(
        (projectData?.data || []).filter(item => {
          if (currentStatus === ALL) {
            return item;
          }

          return item.status === currentStatus;
        })
      );
    }
  }, [currentStatus, projectData]);

  const onClickAddProject = () => history.push(PAGES.ADD_PROJECT);

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
    { value: 'code', label: translate('PROJECT_ID') },
    { value: 'name', label: translate('PROJECT_NAME') },
    { value: 'startDate', label: translate('START_DATE') },
    { value: 'endDate', label: translate('END_DATE') },
    { value: 'projectManager', label: translate('PROJECT_MANAGER') },
    { value: 'status', label: translate('STATUS') },
    { value: 'totalTask', label: translate('TOTAL_TASK') },
    { value: 'totalMember', label: translate('TOTAL_MEMBER') },
  ];
  const tableData = displayData.map(value => ({
    id: value?.id,
    code: <TextLink to={`${PAGES.PROJECT_DETAIL}?id=${value?.id}`}>{value?.id}</TextLink>,
    name: (
      <div className="w-full text-left">
        <TextLink to={`${PAGES.PROJECT_DETAIL}?id=${value?.id}`}>{value?.name}</TextLink>
      </div>
    ),
    startDate: <Time>{value?.startDate}</Time>,
    endDate: <Time>{value?.endDate}</Time>,
    projectManager: (
      <div className="w-full text-left">{`${value?.manager?.firstName} ${value?.manager?.lastName}`}</div>
    ),
    status: <Status value={value?.status} />,
    totalTask: value?.tasks?.length,
    totalMember: value?.member?.length,
  }));
  const tableSearchData = displayData.map(value => ({
    name: value?.name,
  }));

  /**
   * Display loading if is loading get project list
   */
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full p-4 gap-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-dark">{translate('PROJECT_LIST')}</div>

        {isAdmin && (
          <Button
            shape="round"
            iconOptions={{
              icon: AddIcon,
              size: 20,
            }}
            onClick={onClickAddProject}
          >
            {translate('ADD_PROJECT')}
          </Button>
        )}
      </div>

      <SelectStatus title={title} data={statusList} />

      <Table
        columns={tableColumns}
        data={tableData}
        searchOptions={{
          display: true,
          searchData: tableSearchData,
        }}
      />
    </div>
  );
};

export default ProjectList;
