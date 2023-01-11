import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Button,
  Options,
  PopupDelete,
  ProjectManagerChart,
  ProjectManagerNav,
  ProjectManagerStats,
  ProjectManagerStatus,
  ProjectManagerTitle,
  Status,
  Table,
  TextLink,
  Time,
} from '@components';
import { EditIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';
import useRoles from '@hooks/use-roles';
import { DATE_FORMAT } from '@src/app/configs';
import useModal from '@src/app/hooks/use-modal';
import {
  projectActions,
  useAppDispatch,
  useDeleteProjectByIdMutation,
  useGetProjectByIdQuery,
  useGetTasksQuery,
} from '@store';
import { LANGUAGES, PAGES, PROJECT_AND_TASK_STATUS } from '@types';

import { en, vi } from './i18n';

const { ALL, NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;

const ProjectDetail = (): JSX.Element => {
  const { open, close, Popup } = useModal();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { isAdmin, isUser } = useRoles();

  const id = searchParams.get('id');

  const tasksData = useGetTasksQuery({ projectId: id }, { refetchOnMountOrArgChange: true })?.data?.data || [];

  const { data } = useGetProjectByIdQuery(
    { id },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allTasks = useMemo(() => tasksData.length, [tasksData]);
  const tasksInProgress = useMemo(() => tasksData.filter(task => task.status === IN_PROGRESS)?.length, [tasksData]);
  const tasksNotStarted = useMemo(() => tasksData.filter(task => task.status === NOT_STARTED)?.length, [tasksData]);
  const tasksPause = useMemo(() => tasksData.filter(task => task.status === PAUSE)?.length, [tasksData]);
  const tasksCompleted = useMemo(() => tasksData.filter(task => task.status === COMPLETED)?.length, [tasksData]);
  const tasksCancelled = useMemo(() => tasksData.filter(task => task.status === CANCELLED)?.length, [tasksData]);

  const [deleteProject, { isLoading }] = useDeleteProjectByIdMutation();

  const translate = useI18n({
    name: ProjectDetail.name,
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

  const chartData = {
    labels: [
      'Bùi Tân Thân',
      'Võ Anh Tuấn',
      'Lê Xuân Trường',
      'Tạ Thị Ánh Nguyệt',
      'Lê Hồng Quân',
      'Phan Tuấn Anh',
      'Phan Đình Khánh',
    ],
    datasets: [
      {
        label: translate('COMPLETE'),
        data: [3, null, null, 1, 3],
        backgroundColor: '#5DAF50',
      },
      {
        label: translate('INCOMPLETE'),
        data: [6, 6, null, 3, null],
        backgroundColor: '#777777',
      },
    ],
  };

  const handleCopyUrl = () => {
    copy(window.location.href);
    toast.success(translate('COPY_URL_TOASTIFY'), {
      autoClose: 4000,
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
    });
  };

  const handleDeleteProject = async () => {
    await deleteProject({ id });
    close();
    navigate(PAGES.PROJECT_LIST);
    toast.success(translate('DELETE_PROJECT_TOASTIFY'), {
      autoClose: 4000,
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
    });
  };

  const columns = [
    { value: 'code', label: translate('ID') },
    { value: 'task_name', label: translate('TASK_NAME') },
    { value: 'start_date', label: translate('START_DATE') },
    { value: 'end_date', label: translate('END_DATE') },
    { value: 'performer', label: translate('PERFORMER') },
    { value: 'status', label: translate('STATUS') },
    { value: 'priority_level', label: translate('PRIORITY_LEVEL') },
  ];

  let optionItems = null;

  if (isAdmin) {
    optionItems = [
      {
        label: translate('COPY_URL'),
        onClick: () => handleCopyUrl(),
        disabled: false,
      },
      {
        label: translate('DELETE_PROJECT'),
        onClick: () => open(),
        className: 'text-red-500',
      },
    ];
  } else {
    optionItems = [
      {
        label: translate('COPY_URL'),
        onClick: () => handleCopyUrl(),
        disabled: false,
      },
    ];
  }

  useEffect(() => {
    dispatch(projectActions.setCurrentProject({ id }));
  }, [id]);

  const optionNav = (
    <div className="flex items-center justify-center">
      {data?.endDate && (
        <span className="mr-5 text-sm">
          {translate('END_DATE')}: <Time>{data?.endDate}</Time>
        </span>
      )}
      <ProjectManagerStatus className="mr-5 text-base" status={data?.status || ALL} />
      {isAdmin && (
        <Link to={`${PAGES.UPDATE_PROJECT}?id=${id}`}>
          <Button
            shape="round"
            iconOptions={{
              icon: EditIcon,
            }}
            className="mr-3.5"
          >
            {translate('EDIT')}
          </Button>
        </Link>
      )}
      <Options optionsPosition="left" items={optionItems} />
    </div>
  );

  const tableSearchData = data?.member
    ? data.member.map(value => ({
        name: value?.fullName,
      }))
    : [];

  const handleClickReturn = () => navigate(PAGES.PROJECT_LIST);

  return (
    <div className="flex flex-col p-4">
      <Popup>
        <PopupDelete
          isLoading={isLoading}
          onSubmit={handleDeleteProject}
          onCancel={close}
          header={translate('DELETE_PROJECT_CONFIRM')}
          content={translate('DELETE_PROJECT_CONFIRM_QUESTION')}
        />
      </Popup>

      <ProjectManagerNav
        className="mb-4"
        title={translate('PROJECT_DETAIL')}
        onClickReturn={handleClickReturn}
        options={optionNav}
      />

      {isAdmin && (
        <>
          <div className="grid grid-cols-6 mb-4 gap-x-5">
            <ProjectManagerStats
              status={ALL}
              total={allTasks}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${ALL}`}
            />
            <ProjectManagerStats
              status={IN_PROGRESS}
              total={tasksInProgress}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${IN_PROGRESS}`}
            />
            <ProjectManagerStats
              status={NOT_STARTED}
              total={tasksNotStarted}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${NOT_STARTED}`}
            />
            <ProjectManagerStats
              status={PAUSE}
              total={tasksPause}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${PAUSE}`}
            />
            <ProjectManagerStats
              status={COMPLETED}
              total={tasksCompleted}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${COMPLETED}`}
            />
            <ProjectManagerStats
              status={CANCELLED}
              total={tasksCancelled}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${CANCELLED}`}
            />
          </div>

          <ProjectManagerChart data={chartData} />
        </>
      )}

      <div className="mb-4">
        <ProjectManagerTitle
          data={{
            startDate: data?.startDate ? dayjs(data?.startDate).format(DATE_FORMAT) : '',
            startTime: data?.startDate ? dayjs(data?.startDate).format('h:mm') : '',
            projectOwner: `${data?.author?.firstName || ''} ${data?.author?.lastName || ''} `,
            projectManager: `${data?.manager?.firstName || ''} ${data?.manager?.lastName || ''}`,
            projectInfo: data?.description || '',
          }}
        />
      </div>

      {isUser && (
        <div className="mb-4">
          <Table
            columns={columns}
            data={tasksData.map(item => ({
              id: item.id,
              code: (
                <TextLink
                  state={{ from: PAGES.PROJECT_DETAIL }}
                  to={`${PAGES.TASK_DETAIL}?projectId=${id}&id=${item.id}`}
                >
                  {item?.id}
                </TextLink>
              ),
              task_name: (
                <TextLink
                  state={{ from: PAGES.PROJECT_DETAIL }}
                  to={`${PAGES.TASK_DETAIL}?projectId=${id}&id=${item.id}`}
                >
                  {item?.name}
                </TextLink>
              ),
              start_date: <Time className="flex items-center justify-center text-secondary">{item?.startDate}</Time>,
              end_date: <Time className="flex items-center justify-center text-secondary">{item?.endDate}</Time>,
              performer: `${item?.assignee?.firstName || ''} ${item?.assignee?.lastName || ''}`,
              status: <Status value={item?.status} />,
              priority_level: <span>{translate(item?.priority)}</span>,
            }))}
            headerOptions={{
              title: (
                <Link to={`${PAGES.TASK_LIST}/?projectId=${id}`}>
                  <span className="cursor-pointer text-primary">{translate('TASKS_LIST')}</span>
                </Link>
              ),
              button: {
                content: translate('ADD_TASK'),
                action: () => navigate(`${PAGES.ADD_TASK}?projectId=${id}`),
              },
            }}
          />
        </div>
      )}

      <Table
        columns={[
          {
            value: 'index',
            label: translate('INDEX'),
          },
          {
            value: 'name',
            label: translate('FULL_NAME'),
          },
          {
            value: 'email',
            label: 'Email',
          },
        ]}
        data={
          data?.member.map((member, i) => {
            return {
              id: member?.id,
              index: i + 1,
              email: <span className="w-full text-left">{member?.email}</span>,
              name: <span className="w-full text-left">{`${member?.firstName} ${member?.lastName}`}</span>,
            };
          }) || []
        }
        headerOptions={{
          title: `${translate('PROJECT_MEMBERS')}`,
        }}
        searchOptions={{
          display: true,
          searchData: tableSearchData,
        }}
      />
    </div>
  );
};

export default ProjectDetail;
