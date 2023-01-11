import { DefaultTFuncReturn } from 'i18next';
import { twMerge } from 'tailwind-merge';

import useI18n from '@hooks/use-i18n';
import { LANGUAGES, PROJECT_AND_TASK_STATUS } from '@types';

import { en, vi } from './i18n';

const { ALL, NOT_STARTED, IN_PROGRESS, CANCELLED, COMPLETED, PAUSE } = PROJECT_AND_TASK_STATUS;

type ProjectManagerStatusProps = {
  status: PROJECT_AND_TASK_STATUS;
  className?: string;
};

const ProjectManagerStatus = ({ status, className }: ProjectManagerStatusProps): JSX.Element => {
  const translate = useI18n({
    name: ProjectManagerStatus.name,
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
  const statusStyle: {
    [key in PROJECT_AND_TASK_STATUS]: {
      color: string;
      text: string | DefaultTFuncReturn;
    };
  } = {
    [NOT_STARTED]: {
      color: '#9F9F9F',
      text: translate('UNFULFILLED'),
    },
    [ALL]: {
      color: '#5DAF50',
      text: translate('ALL'),
    },
    [CANCELLED]: {
      color: '#E74739',
      text: translate('CANCELLED'),
    },
    [IN_PROGRESS]: {
      color: '#0070EA',
      text: translate('PROCESSING'),
    },
    [PAUSE]: {
      color: '#F7C214',
      text: translate('PAUSE'),
    },
    [COMPLETED]: {
      color: '#5DAF50',
      text: translate('ACCOMPLISHED'),
    },
  };
  return (
    <span className={twMerge('mr-5 text-base', className)} style={{ color: statusStyle[status]?.color }}>
      {statusStyle[status]?.text}
    </span>
  );
};

export default ProjectManagerStatus;
