import { PROJECT_AND_TASK_STATUS } from '@types';

const { ALL, NOT_STARTED, IN_PROGRESS, PAUSE, CANCELLED, COMPLETED } = PROJECT_AND_TASK_STATUS;

const locale = {
  TITLE: 'Status',
  [ALL]: 'All',
  [NOT_STARTED]: 'Not started',
  [IN_PROGRESS]: 'In progress',
  [PAUSE]: 'Pause',
  [COMPLETED]: 'Completed',
  [CANCELLED]: 'Cancelled',
};

export default locale;
