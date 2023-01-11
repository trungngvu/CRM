import { PRIORITY } from '../../priority';
import { PROJECT_AND_TASK_STATUS } from '../../project-and-task-status';
import { UserProps } from '../user';
import { EstimateProps, TaskProps } from './task';

export type GetTaskProps = {
  id: string | number | null;
  projectId: string | number | null;
};

export type GetTaskResponse = {
  author: UserProps;
  children: TaskProps[];
  id: string | number;
  assignee: UserProps;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  parent: GetTaskResponse;
  priority: PRIORITY;
  status: PROJECT_AND_TASK_STATUS;
  estimate: EstimateProps;
  projectId: number;
  follower: UserProps[];
  createdBy: UserProps;
};
