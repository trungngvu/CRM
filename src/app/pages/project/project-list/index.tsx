import { useEffect, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { AddIcon, Button, Loading, Status, Table, TextLink, Time } from '@components';
import history from '@history';
import { useI18n, usePermission, useStatus } from '@hooks';
import { projectActions, useAppDispatch, useGetProjectsQuery } from '@store';
import { PAGES, PAGES_NAME, PROJECT_AND_TASK_STATUS, ProjectProps } from '@types';
import { createValueLabelData } from '@utils';

import languages from './i18n';

const { ALL, NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;
const { resetCurrentProject } = projectActions;

const ProjectList = (): JSX.Element => {
  const [displayData, setDisplayData] = useState<ProjectProps[]>([]);

  const translate = useI18n(languages);
  const { data: projectsData = [], isLoading: isLoadingProjects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isPermissionToAddProject = usePermission(PAGES_NAME.ADD_PROJECT);
  const { currentStatus, SelectStatus } = useStatus();

  /**
   * Reset current project ID when in page list of project
   */
  useEffect(() => {
    dispatch(resetCurrentProject());
  }, []);

  /**
   * Filter data by status
   */
  useDeepCompareEffect(() => {
    const filteredData = projectsData.filter(item => (currentStatus === ALL ? item : item?.status === currentStatus));

    setDisplayData(filteredData);
  }, [currentStatus, projectsData]);

  const goToAddProject = () => history.push(PAGES.ADD_PROJECT);

  /**
   * Select status data
   */
  const title = translate('STATUS_TITLE');
  const statusList = createValueLabelData([ALL, NOT_STARTED, IN_PROGRESS, PAUSE, COMPLETED, CANCELLED], translate);

  /**
   * Table data
   */
  const tableColumns = createValueLabelData(
    [
      'PROJECT_CODE',
      'PROJECT_NAME',
      'COMPANY',
      'START_DATE',
      'END_DATE',
      'PROJECT_MANAGER',
      'STATUS',
      'TOTAL_TASK',
      'TOTAL_MEMBER',
    ],
    translate
  );
  console.log(displayData);
  const tableData = displayData.map(
    ({
      id = 0,
      name = '',
      startDate = '',
      endDate = '',
      manager: { fullName = '' } = {},
      status = NOT_STARTED,
      tasks = [],
      member = [],
    }) => ({
      id,
      PROJECT_CODE: <TextLink to={`${PAGES.PROJECT_DETAIL}?id=${id}`}>{id}</TextLink>,
      COMPANY: (
        <div>{id === 27 || id === 25 ? 'Code Lover Vietnam' : id === 26 || id === 30 ? 'TokioUni' : 'HUST'}</div>
      ),
      PROJECT_NAME: (
        <TextLink to={`${PAGES.PROJECT_DETAIL}?id=${id}`} className="w-full text-left">
          {name}
        </TextLink>
      ),
      START_DATE: <Time>{startDate}</Time>,
      END_DATE: <Time>{endDate}</Time>,
      PROJECT_MANAGER: <span className="w-full text-left">{fullName}</span>,
      STATUS: <Status value={status} />,
      TOTAL_TASK: <div>{tasks.length}</div>,
      TOTAL_MEMBER: <div>{member.length}</div>,
    })
  );

  /**
   * Display loading if is loading project list
   */
  if (isLoadingProjects) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full p-4 gap-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-dark">{translate('PROJECT_LIST')}</div>

        {isPermissionToAddProject && (
          <Button shape="round" iconOptions={{ icon: AddIcon, size: 20 }} onClick={goToAddProject}>
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
          rootData: displayData,
        }}
      />
    </div>
  );
};

export default ProjectList;
