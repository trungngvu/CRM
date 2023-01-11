import { PROJECT_AND_TASK_STATUS } from '../../project-and-task-status';
import { TaskProps } from '../task';
import { UserProps } from '../user';

export type ProjectProps = {
  author: UserProps;
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: PROJECT_AND_TASK_STATUS;
  member: UserProps[];
  tasks: TaskProps[];
  manager: UserProps;
};
