import { createApi } from '@reduxjs/toolkit/query/react';

import { API_CONFIG } from '@configs';
import { UpdateProjectProps, UpdateProjectResponse } from '@src/app/types/api/project/update-project';
import {
  API_METHOD,
  CreateProjectProps,
  CreateProjectResponse,
  DeleteProjectProps,
  ErrorResponse,
  GetProjectProps,
  GetProjectResponse,
  GetProjectsResponse,
} from '@types';

import { baseQuery } from './base-query';

const { PROJECTS } = API_CONFIG;
const { GET, POST, DELETE, PATCH } = API_METHOD;

export const PROJECT_API_REDUCER_KEY = 'projectApi';

export const projectApi = createApi({
  reducerPath: PROJECT_API_REDUCER_KEY,

  baseQuery,

  endpoints: builder => ({
    createProject: builder.mutation<CreateProjectResponse, CreateProjectProps>({
      query: data => ({
        url: PROJECTS,
        method: POST,
        data,
      }),
    }),
    getProjects: builder.query<GetProjectsResponse, void>({
      query: () => ({
        url: PROJECTS,
        method: GET,
      }),
    }),
    getProjectById: builder.query<GetProjectResponse, GetProjectProps>({
      query: data => ({
        url: `${PROJECTS}/${data.id}`,
        method: GET,
      }),
      transformErrorResponse: (response: ErrorResponse) => response.data.errors.message,
    }),
    updateProject: builder.mutation<UpdateProjectResponse, UpdateProjectProps>({
      query: data => ({
        url: `${PROJECTS}/${data.id}`,
        method: PATCH,
        data,
      }),
    }),
    deleteProjectById: builder.mutation<void, DeleteProjectProps>({
      query: data => ({
        url: `${PROJECTS}/${data.id}`,
        method: DELETE,
      }),
    }),
  }),
});

export const projectApiReducer = projectApi.reducer;

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectByIdMutation,
} = projectApi;
