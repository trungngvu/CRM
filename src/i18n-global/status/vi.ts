import { PROJECT_AND_TASK_STATUS } from '@types';

const locale = {
  STATUS_TITLE: 'Trạng thái',
  [PROJECT_AND_TASK_STATUS.ALL]: 'Tất cả',
  [PROJECT_AND_TASK_STATUS.NOT_STARTED]: 'Chưa thực hiện',
  [PROJECT_AND_TASK_STATUS.IN_PROGRESS]: 'Đang thực hiện',
  [PROJECT_AND_TASK_STATUS.PAUSE]: 'Tạm dừng',
  [PROJECT_AND_TASK_STATUS.COMPLETED]: 'Đã hoàn thành',
  [PROJECT_AND_TASK_STATUS.CANCELLED]: 'Đã huỷ',
};

export default locale;
