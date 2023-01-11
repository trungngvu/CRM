import useI18n from '@hooks/use-i18n';
import { LANGUAGES, PROJECT_AND_TASK_STATUS } from '@types';

import { en, vi } from './i18n';

export type StatusProps = {
  value: PROJECT_AND_TASK_STATUS;
};

const { NOT_STARTED, IN_PROGRESS, PAUSE, CANCELLED, COMPLETED } = PROJECT_AND_TASK_STATUS;

const Status = ({ value }: StatusProps): JSX.Element => {
  const translate = useI18n({
    name: Status.name,
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

  return (
    <div className="flex items-center w-full gap-x-2">
      <div>
        {value === NOT_STARTED && (
          <img src="/assets/icons/not-started.svg" alt="not-started" className="min-w-[14px] w-[14px] h-[14px]" />
        )}
        {value === IN_PROGRESS && (
          <img src="/assets/icons/in-progress.svg" alt="in-progress" className="min-w-[14px] w-[14px] h-[14px]" />
        )}
        {value === PAUSE && (
          <img src="/assets/icons/pause.svg" alt="pause" className="min-w-[14px] w-[14px] h-[14px]" />
        )}
        {value === COMPLETED && (
          <img src="/assets/icons/completed.svg" alt="completed" className="min-w-[14px] w-[14px] h-[14px]" />
        )}
        {value === CANCELLED && (
          <img src="/assets/icons/cancelled.svg" alt="completed" className="min-w-[14px] w-[14px] h-[14px]" />
        )}
      </div>

      <div className="whitespace-nowrap">
        {value === NOT_STARTED && translate('NOT_STARTED')}
        {value === IN_PROGRESS && translate('IN_PROGRESS')}
        {value === PAUSE && translate('PAUSE')}
        {value === COMPLETED && translate('COMPLETED')}
        {value === CANCELLED && translate('CANCELLED')}
      </div>
    </div>
  );
};

export default Status;
