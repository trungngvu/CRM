import { createApi } from '@reduxjs/toolkit/query/react';

import { API_CONFIG } from '@configs';
import {
  API_METHOD,
  DeleteResumeProps,
  GetResumeProps,
  GetResumeResponse,
  GetResumesResponse,
  ResumeParserProps,
  ResumeParserResponse,
  UpdateResumeProps,
  UpdateResumeResponse,
} from '@types';

import { baseQuery } from './base-query';

const { RESUME, RESUME_UPLOAD } = API_CONFIG;
const { POST, GET, PATCH, DELETE } = API_METHOD;

export const RESUME_API_REDUCER_KEY = 'resumeApi';

export const resumeApi = createApi({
  reducerPath: RESUME_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    resumeParser: builder.mutation<ResumeParserResponse, ResumeParserProps>({
      query: data => ({
        url: RESUME_UPLOAD,
        method: POST,
        data,
      }),
    }),
    getResumes: builder.query<GetResumesResponse, null>({
      query: data => ({
        url: RESUME,
        method: GET,
        data,
      }),
    }),
    getResumeById: builder.query<GetResumeResponse, GetResumeProps>({
      query: data => ({
        url: `${RESUME}/${data.id}`,
        method: GET,
      }),
    }),
    updateResume: builder.mutation<UpdateResumeResponse, UpdateResumeProps>({
      query: data => ({
        url: `${RESUME}/${data.id}`,
        method: PATCH,
        data,
      }),
    }),
    deleteResumeById: builder.mutation<void, DeleteResumeProps>({
      query: data => ({
        url: `${RESUME}/${data.id}`,
        method: DELETE,
      }),
    }),
  }),
});

export const resumeApiReducer = resumeApi.reducer;

export const {
  useResumeParserMutation,
  useGetResumesQuery,
  useGetResumeByIdQuery,
  useUpdateResumeMutation,
  useDeleteResumeByIdMutation,
} = resumeApi;
