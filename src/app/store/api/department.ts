import { createApi } from '@reduxjs/toolkit/query/react';

import { API_CONFIG } from '@configs';
import {
  API_METHOD,
  CreateDepartmentProps,
  CreateDepartmentResponse,
  DeleteDepartmentProps,
  ErrorResponse,
  GetDepartmentProps,
  GetDepartmentResponse,
  GetDepartmentsResponse,
  UpdateDepartmentProps,
  UpdateDepartmentResponse,
} from '@types';

import { baseQuery } from './base-query';

const { DEPARTMENT } = API_CONFIG;
const { GET, POST, DELETE, PATCH } = API_METHOD;

export const DEPARTMENT_API_REDUCER_KEY = 'departmentApi';

export const departmentApi = createApi({
  reducerPath: DEPARTMENT_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    createDepartment: builder.mutation<CreateDepartmentResponse, CreateDepartmentProps>({
      query: data => ({
        url: DEPARTMENT,
        method: POST,
        data,
      }),
      transformErrorResponse: (response: ErrorResponse) => response.code,
    }),
    getDepartments: builder.query<GetDepartmentsResponse, void>({
      query: () => ({
        url: DEPARTMENT,
        method: GET,
      }),
    }),
    getDepartmentById: builder.query<GetDepartmentResponse, GetDepartmentProps>({
      query: data => ({
        url: `${DEPARTMENT}/${data.id}`,
        method: GET,
      }),
    }),
    updateDepartment: builder.mutation<UpdateDepartmentResponse, UpdateDepartmentProps>({
      query: data => ({
        url: `${DEPARTMENT}/${data.id}`,
        method: PATCH,
        data,
      }),
      transformErrorResponse: (response: ErrorResponse) => response.code,
    }),
    deleteDepartmentById: builder.mutation<void, DeleteDepartmentProps>({
      query: data => ({
        url: `${DEPARTMENT}/${data.id}`,
        method: DELETE,
      }),
    }),
  }),
});

export const departmentApiReducer = departmentApi.reducer;

export const {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentByIdMutation,
} = departmentApi;
