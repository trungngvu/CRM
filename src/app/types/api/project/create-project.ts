import { PROJECT_AND_TASK_STATUS } from '../../project-and-task-status';
import { ProjectProps } from './project';

export type CreateProjectProps = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  managerId: number;
  status: PROJECT_AND_TASK_STATUS;
  users: number[];
};

export type CreateProjectResponse = ProjectProps;
