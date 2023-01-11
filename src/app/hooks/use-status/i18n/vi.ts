import { PROJECT_AND_TASK_STATUS } from '@types';

const { ALL, NOT_STARTED, IN_PROGRESS, PAUSE, CANCELLED, COMPLETED } = PROJECT_AND_TASK_STATUS;

const locale = {
  TITLE: 'Trạng thái',
  [ALL]: 'Tất cả',
  [NOT_STARTED]: 'Chưa thực hiện',
  [IN_PROGRESS]: 'Đang thực hiện',
  [PAUSE]: 'Tạm dừng',
  [COMPLETED]: 'Đã hoàn thành',
  [CANCELLED]: 'Đã huỷ',
};

export default locale;
