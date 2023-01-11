import { TaskProps } from './task';

export type GetTasksProps = {
  projectId: string | number | null;
};

export type GetTasksResponse = {
  data: TaskProps[];
  count: number;
};
