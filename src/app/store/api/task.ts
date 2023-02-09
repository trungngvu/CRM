import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';

import { API_CONFIG } from '@configs';
import {
  API_METHOD,
  CreateTaskProps,
  CreateTaskResponse,
  DeleteTaskProps,
  GetTaskProps,
  GetTaskResponse,
  GetTasksProps,
  GetTasksResponse,
  GetUsersByTaskProps,
  GetUsersByTaskResponse,
  TaskProps,
  UpdateTaskProps,
  UpdateTaskResponse,
} from '@types';

import { baseQuery } from './base-query';

const { TASKS, TASK_USERS } = API_CONFIG;
const { GET, POST, DELETE, PATCH } = API_METHOD;

export const TASK_API_REDUCER_KEY = 'taskApi';

export const taskApi = createApi({
  reducerPath: TASK_API_REDUCER_KEY,
  baseQuery: baseQuery as BaseQueryFn<unknown, unknown, { status: number; data: unknown }>,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    createTask: builder.mutation<CreateTaskResponse, CreateTaskProps>({
      query: data => ({
        url: TASKS,
        method: POST,
        data,
      }),
    }),
    getTasks: builder.query<TaskProps[], GetTasksProps>({
      query: data => ({
        url: `${TASKS}?projectId=${data.projectId}`,
        method: GET,
      }),
      transformResponse: (response: GetTasksResponse) => response?.data,
    }),
    getTaskById: builder.query<GetTaskResponse, GetTaskProps>({
      query: data => ({
        url: `${TASKS}/${data.id}?projectId=${data.projectId}`,
        method: GET,
      }),
    }),
    getUsersByTask: builder.query<GetUsersByTaskResponse, GetUsersByTaskProps>({
      query: data => ({
        url: `${TASK_USERS}/?projectId=${data.projectId}`,
        method: GET,
      }),
    }),
    updateTask: builder.mutation<UpdateTaskResponse, UpdateTaskProps>({
      query: data => ({
        url: `${TASKS}/${data.id}`,
        method: PATCH,
        data,
      }),
    }),
    deleteTaskById: builder.mutation<void, DeleteTaskProps>({
      query: data => ({
        url: `${TASKS}/${data.id}`,
        method: DELETE,
      }),
    }),
  }),
});

export const taskApiReducer = taskApi.reducer;

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useGetUsersByTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskByIdMutation,
} = taskApi;
