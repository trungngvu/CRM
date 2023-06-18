import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, CardDetail, Loading, Options, OptionsNav, PopupDelete, StyledStatus, Time } from '@components';
import { EditIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';
import useRoles from '@hooks/use-roles';
import useModal from '@src/app/hooks/use-modal';
import {
  planActions,
  useAppDispatch,
  useDeleteProjectByIdMutation,
  useGetProjectByIdQuery,
  useGetTasksQuery,
} from '@store';
import { PAGES, PROJECT_AND_TASK_STATUS } from '@types';

import languages from './i18n';
import ProjectDetailStats from './project-detail-stats';

const { ALL, NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;

const ProjectDetail = (): JSX.Element => {
  const { open, close, Popup } = useModal();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { isAdmin } = useRoles();

  const id = searchParams.get('id');

  const { data: tasksData = [], isLoading: isLoadingTasks } = useGetTasksQuery(
    { projectId: id },
    { refetchOnMountOrArgChange: true }
  );

  const { data: projectDetail, isLoading: isLoadingProjectDetail } = useGetProjectByIdQuery(
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

  const translate = useI18n(languages);

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
    navigate(PAGES.PLAN_LIST);
    toast.success(translate('DELETE_PROJECT_TOASTIFY'), {
      autoClose: 4000,
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
    });
  };

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
        className: 'text-error',
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
    dispatch(planActions.setCurrentPlan({ id }));
  }, [id]);

  const optionNav = (
    <div className="flex items-center justify-center">
      {projectDetail?.endDate && (
        <span className="mr-5 text-sm">
          {translate('END_DATE')}: <Time>{projectDetail?.endDate}</Time>
        </span>
      )}
      <StyledStatus className="mr-5 text-base" status={projectDetail?.status || ALL} />
      {isAdmin && (
        <Link className="mr-3.5" to={`${PAGES.UPDATE_PLAN}?id=${id}`}>
          <Button
            shape="round"
            iconOptions={{
              icon: EditIcon,
            }}
          >
            {translate('EDIT')}
          </Button>
        </Link>
      )}
      <Options items={optionItems} />
    </div>
  );

  const handleClickReturn = () => navigate(PAGES.PLAN_LIST);

  if (isLoadingProjectDetail && isLoadingTasks) {
    return <Loading />;
  }

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

      <OptionsNav
        className="mb-4"
        title={translate('PROJECT_DETAIL')}
        onClickReturn={handleClickReturn}
        options={optionNav}
      />

      {isAdmin && (
        <>
          <div className="grid grid-cols-6 mb-4 gap-x-5">
            <ProjectDetailStats
              status={ALL}
              total={allTasks}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${ALL}`}
            />
            <ProjectDetailStats
              status={IN_PROGRESS}
              total={tasksInProgress}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${IN_PROGRESS}`}
            />
            <ProjectDetailStats
              status={NOT_STARTED}
              total={tasksNotStarted}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${NOT_STARTED}`}
            />
            <ProjectDetailStats
              status={PAUSE}
              total={tasksPause}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${PAUSE}`}
            />
            <ProjectDetailStats
              status={COMPLETED}
              total={tasksCompleted}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${COMPLETED}`}
            />
            <ProjectDetailStats
              status={CANCELLED}
              total={tasksCancelled}
              url={`${PAGES.TASK_LIST}?projectId=${id}&status=${CANCELLED}`}
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <CardDetail
          data={{
            startDate: <Time>{projectDetail?.startDate || ''}</Time>,
            startTime: projectDetail?.startDate ? dayjs(projectDetail?.startDate).format('h:mm') : '',
            projectOwner: `${projectDetail?.author?.fullName || ''} `,
            projectManager: `${projectDetail?.manager?.fullName || ''}`,
            projectInfo: projectDetail?.description || '',
          }}
        />
      </div>
    </div>
  );
};

export default ProjectDetail;
