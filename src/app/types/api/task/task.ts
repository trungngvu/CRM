import { ESTIMATE_UNIT } from '../../estimate-unit';
import { PRIORITY } from '../../priority';
import { PROJECT_AND_TASK_STATUS } from '../../project-and-task-status';
import { UserProps } from '../user';

export type EstimateProps = {
  value: number;
  unit: ESTIMATE_UNIT;
};

export type TaskProps = {
  id: string | number;
  assignee: UserProps;
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
  createdBy: UserProps;
};
