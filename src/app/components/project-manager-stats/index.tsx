import { Link } from 'react-router-dom';

import useI18n from '@hooks/use-i18n';
import { LANGUAGES, PROJECT_AND_TASK_STATUS } from '@types';

import { en, vi } from './i18n';

type ProjectManagerStatsProps = {
  total?: number;
  url?: string;
  status: PROJECT_AND_TASK_STATUS;
};

const ProjectManagerStats = ({ total, url = '', status }: ProjectManagerStatsProps) => {
  const translate = useI18n({
    name: ProjectManagerStats.name,
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
  const stats = {
    ALL: {
      title: translate('ALL'),
      color: '#F27024',
      iconSrc: '/assets/icons/all-tasks.svg',
    },
    IN_PROGRESS: {
      title: translate('PROCESSING'),
      color: '#0070EA',
      iconSrc: '/assets/icons/task-in-process.svg',
    },
    NOT_STARTED: {
      title: translate('UNFULFILLED'),
      color: '#9F9F9F',
      iconSrc: '/assets/icons/task-not-start-yet.svg',
    },
    PAUSE: {
      title: translate('PAUSE'),
      color: '#F7C214',
      iconSrc: '/assets/icons/task-pause.svg',
    },
    COMPLETED: {
      title: translate('ACCOMPLISHED'),
      color: '#5DAF50',
      iconSrc: '/assets/icons/task-done.svg',
    },
    CANCELLED: {
      title: translate('CANCELLED'),
      color: '#E74739',
      iconSrc: '/assets/icons/task-cancelled.svg',
    },
  };
  return (
    <div
      className="border pl-4 pt-3 pr-2.5 pb-4 rounded-sm text-center bg-white flex flex-col"
      style={{
        color: stats[status].color,
        borderColor: stats[status].color,
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-xl">{stats[status].title}</h4>
        <img src={stats[status].iconSrc} alt={status} />
      </div>

      <h1 className="mt-auto mb-6 text-6xl font-bold">{total}</h1>

      {total && total > 0 ? (
        <Link className="text-base text-primary" to={url}>
          {translate('SEE_DETAILS')}
        </Link>
      ) : (
        <span className="text-gray-500 cursor-default">{translate('SEE_DETAILS')}</span>
      )}
    </div>
  );
};

export default ProjectManagerStats;
