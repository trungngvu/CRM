import { PRIORITY } from '../../priority';
import { PROJECT_AND_TASK_STATUS } from '../../project-and-task-status';
import { UserProps } from '../user';
import { EstimateProps, TaskProps } from './task';

export type CreateTaskProps = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: PRIORITY;
  status: PROJECT_AND_TASK_STATUS;
  estimate: EstimateProps;
  assigneeId: number;
  parentId: number;
  projectId: number;
  follower: UserProps[];
};

export type CreateTaskResponse = TaskProps;
